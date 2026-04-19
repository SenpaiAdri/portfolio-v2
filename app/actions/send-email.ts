"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { ContactEmail } from "@/app/emails/contact-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_CHARS = { name: 50, email: 50, message: 250 };
const ASCII_REGEX = /^[\x20-\x7E\r\n]+$/;
const RATE_LIMIT_MS = 60_000;
const MIN_SUBMIT_MS = 1000;

const ipRateLimits = new Map<string, number>();

type SendEmailParams = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string;
  timestamp?: number;
};

function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

function validateInput(input: string, maxLen: number): string | null {
  if (!ASCII_REGEX.test(input)) {
    return null;
  }
  if (input.length > maxLen) {
    return null;
  }
  return input;
}

export async function sendEmail(data: SendEmailParams) {
  const headersList = await headers();
  const origin = headersList.get("origin") || headersList.get("referer");

  if (!origin) {
    return { success: false };
  }

  const forwarded = headersList.get("x-forwarded-for");
  const realIP = headersList.get("x-real-ip");
  const clientIP = forwarded?.split(",")[0].trim() || realIP || "unknown";

  const now = Date.now();

  const lastSubmit = ipRateLimits.get(clientIP);
  if (lastSubmit && now - lastSubmit < RATE_LIMIT_MS) {
    return { success: false, error: "Please wait before sending another message" };
  }

  if (data.timestamp) {
    const elapsed = now - data.timestamp;
    if (elapsed < MIN_SUBMIT_MS) {
      return { success: false };
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_EMAIL ?? "eydriannn@gmail.com";

  if (!apiKey) {
    return { success: false, error: "Server configuration error" };
  }

  const { name = "", email, message, subject = "A visitor sent a message", honeypot } = data;

  if (honeypot && honeypot.length > 0) {
    return { success: false };
  }

  const sanitizedName = sanitize(name);
  const sanitizedMessage = sanitize(message);

  const validatedName = validateInput(sanitizedName, MAX_CHARS.name);
  const validatedEmail = validateInput(email, MAX_CHARS.email);
  const validatedMessage = validateInput(sanitizedMessage, MAX_CHARS.message);

  if (!validatedName || !validatedEmail || !validatedMessage) {
    return { success: false, error: "Invalid input detected" };
  }

  if (!validatedEmail || !validatedMessage) {
    return { success: false, error: "Email and message are required" };
  }

  ipRateLimits.set(clientIP, now);

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [toAddress],
      subject: `[Portfolio] ${subject}`,
      replyTo: validatedEmail,
      react: ContactEmail({ name: validatedName, email: validatedEmail, message: validatedMessage }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Failed to send message" };
    }

    return { success: true, data: emailData };
  } catch (err) {
    console.error("Email send error:", err);
    return { success: false, error: "Failed to send message" };
  }
}
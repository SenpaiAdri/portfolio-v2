"use server";

import { Resend } from "resend";
import { ContactEmail } from "@/app/emails/contact-template";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailParams = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export async function sendEmail(data: SendEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_EMAIL ?? "eydriannn@gmail.com";

  if (!apiKey) {
    return { success: false, error: "RESEND_API_KEY is not set" };
  }

  const { name = "", email, message, subject = "A visitor sent a message" } = data;

  if (!email || !message) {
    return { success: false, error: "Email and message are required" };
  }

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [toAddress],
      subject: `[Portfolio] ${subject}`,
      replyTo: email,
      react: ContactEmail({ name, email, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: emailData };
  } catch (err) {
    console.error("Email send error:", err);
    return { success: false, error: "Failed to send email" };
  }
}
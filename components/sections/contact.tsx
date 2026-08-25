"use client";

import { useState, useRef, type FormEvent, type ReactNode } from "react";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Send,
  Loader2,
} from "lucide-react";
import { sendEmail } from "@/app/actions/send-email";
import { BackdropGrid } from "@/components/backdrop-grid";

export const SOCIALS = [
  {
    href: "https://github.com/SenpaiAdri",
    label: "GitHub",
    Icon: Github,
  },
  {
    href: "https://www.facebook.com/eydriannnnnn",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://www.instagram.com/_eydriannn/",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://www.linkedin.com/in/eydriannn/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
] as const;

const MAX_CHARS = { name: 50, email: 50, message: 250 };

const INPUT_CLASS = `w-full bg-transparent text-gray-400 text-[10px] md:text-base tracking-[0.2em] uppercase
              border-0 border-b-2 border-dashed border-red-500
              focus:outline-none focus:border-red-500 focus:text-red-400
              placeholder:text-gray-800 py-2 px-0`;

const ASCII_REGEX = /^[\x20-\x7E\r\n]+$/;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const honeypot = form.elements.namedItem("website_url") as HTMLInputElement;
    const timestamp = Date.now();

    if (
      !ASCII_REGEX.test(name) ||
      !ASCII_REGEX.test(email) ||
      !ASCII_REGEX.test(message)
    ) {
      setStatus("error");
      setErrorMessage("Invalid characters detected");
      return;
    }

    const result = await sendEmail({
      name,
      email,
      message,
      honeypot: honeypot?.value,
      timestamp,
    });

    if (result.success) {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("error");
      setErrorMessage(result.error ?? "Failed to send message");
    }
  }

  return (
    <section
      id="CONTACT"
      role="region"
      aria-label="Contact"
      className="bg-surface pt-15 h-dvh w-screen overflow-hidden text-gray-400"
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative h-full w-full grid grid-cols-1 md:grid-cols-[13fr_8fr]
          md:grid-rows-[5fr_3fr_5fr]"
      >
        {/* Mobile top title strip */}
        <div className="px-6 py-10 border-b-2 sm:border-b-4 border-b-gray-600 border-dashed md:hidden">
          <h2 className="text-lg tracking-[0.35em] text-center text-red-500 uppercase">
            [<span className="text-gray-500">Contact</span>]
          </h2>
        </div>

        {/* Row 1: Name (left) | empty right with vertical divider */}
        <div className="flex flex-col justify-center sm:justify-between px-6 py-6 border-b-2 sm:border-b-4 border-b-gray-600 border-dashed md:border-r-4 md:border-r-red-500 md:py-20 md:px-18 md:row-start-1 md:col-start-1">
          <h2 className="hidden md:block text-2xl tracking-[0.35em] text-red-500 uppercase sm:text-3xl md:text-5xl text-center md:text-left">
            [<span className="text-gray-500">Contact</span>]
          </h2>
          <div className="flex flex-col justify-between">
            <FieldLabel htmlFor="contact-name">Name:</FieldLabel>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              required
              maxLength={MAX_CHARS.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className={INPUT_CLASS}
            />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="hidden md:block border-b-2 sm:border-b-4 border-b-gray-600 border-dashed md:row-start-1 md:col-start-2"
        />

        {/* Row 2: Sender email (left) | Socials (right on desktop) */}
        <div className="flex flex-col justify-center px-6 md:px-18 py-6 md:py-20 border-b-2 sm:border-b-4 border-b-gray-600 border-dashed md:border-r-4 md:border-r-red-500 md:row-start-2 md:col-start-1">
          <FieldLabel htmlFor="contact-email">Sender Email:</FieldLabel>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={MAX_CHARS.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              className={INPUT_CLASS}
            />
        </div>
        <div className="relative hidden md:flex md:row-start-1 md:col-start-2">
          <BackdropGrid />
        </div>
        <div className="relative hidden md:flex px-6 md:px-10 py-6 md:py-8 border-b-2 sm:border-b-4 border-b-gray-600 border-dashed items-center justify-center md:row-start-2 md:col-start-2">
          <BackdropGrid />
          <SocialIconList variant="desktop" />
        </div>

        {/* Row 3: Payload content (left) | empty right with vertical divider */}
        <div className="flex flex-col justify-between px-6 md:px-18 py-6 md:py-15 border-b-2 sm:border-b-4 border-b-gray-600 border-dashed md:border-r-4 md:border-r-red-500 md:row-start-3 md:col-start-1">
          <FieldLabel htmlFor="contact-message">Payload Content:</FieldLabel>
          <textarea
            id="contact-message"
            name="message"
            required
            maxLength={MAX_CHARS.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your portfolio looks great! I’d like to share business with you"
            className="flex-1 min-h-[90px] w-full resize-none bg-transparent
              text-gray-400 text-[10px] md:text-base tracking-[0.15em] uppercase leading-relaxed
              border-2 border-dashed border-red-500
              focus:outline-none focus:border-red-500 focus:text-red-400
              placeholder:text-gray-800 p-4"
          />
          <input
            type="text"
            name="website_url"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />
          <div className="mt-4 flex justify-center md:justify-end">
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="group w-full sm:w-1/3 justify-center inline-flex items-center gap-3
                border-2 border-dashed border-gray-600 py-2 md:py-3
                text-gray-400 hover:text-red-500 hover:border-red-500
                text-[10px] md:text-sm tracking-[0.3em] uppercase
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  Sending…
                  <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                </>
              ) : status === "success" ? (
                <>
                  Sent!
                  <Send className="h-4 w-4 md:h-5 md:w-5" />
                </>
              ) : (
                <>
                  Launch Payload
                  <Send
                    className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
          </div>
          <div aria-live="polite">
            {status === "error" && (
              <p className="mt-2 text-center text-red-500 text-xs tracking-[0.2em] uppercase">
                {errorMessage}
              </p>
            )}
            {status === "success" && (
              <p className="mt-2 text-center text-gray-400 text-xs tracking-[0.2em] uppercase">
                Message sent successfully — I’ll get back to you soon.
              </p>
            )}
          </div>
        </div>

        {/* Desktop-only resume row: placed below socials (row 3, col 2) */}
        <div className="relative hidden md:flex px-6 md:px-10 py-6 md:py-8 border-b-2 sm:border-b-4 border-b-gray-600 border-dashed items-center justify-center md:row-start-3 md:col-start-2">
          <BackdropGrid />
          <div className="w-full max-w-xs flex flex-col items-center gap-4">
            <a
              href="/RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full inline-flex items-center justify-center border-2 border-dashed border-gray-600 py-3 text-gray-400 hover:text-red-500 hover:border-red-500 text-xs font-bold tracking-[0.3em] uppercase transition-colors"
            >
              [ View Resume ]
            </a>
          </div>
        </div>

        {/* Mobile-only socials row */}
        <div className="relative px-6 py-7 border-b-2 sm:border-b-4 border-b-gray-600 border-dashed flex items-center justify-center md:hidden">
          <BackdropGrid />
          <SocialIconList variant="mobile" />
        </div>
      </form>
    </section>
  );
}

function FieldLabel({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-3 md:mb-4 text-red-500 text-xs md:text-sm tracking-[0.35em] uppercase"
    >
      {children}
    </label>
  );
}

function SocialIconList({
  variant,
}: {
  variant: "desktop" | "mobile";
}) {
  const box =
    variant === "desktop"
      ? "h-15 w-15 md:h-22 md:w-22 border-4 border-gray-600"
      : "h-12 w-12 border-2 border-gray-600";

  return (
    <ul className="flex items-center">
      {SOCIALS.map(({ href, label, Icon }) => (
        <li key={label} className={variant === "desktop" ? "-mx-[2px]" : "-mx-px"}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`group relative inline-flex items-center justify-center border-dashed text-red-500 hover:border-red-500 transition-colors z-10 hover:z-50 focus-visible:border-red-500 focus-visible:z-50 focus:outline-none ${box}`}
          >
            <Icon
              className={`transition-transform group-hover:scale-110 ${
                variant === "desktop" ? "h-7 w-7 md:h-10 md:w-10" : "h-7 w-7"
              }`}
              aria-hidden="true"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

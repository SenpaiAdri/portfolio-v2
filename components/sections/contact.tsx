"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Facebook, Github, Instagram, Linkedin, Send, Loader2 } from "lucide-react";
import { sendEmail } from "@/app/actions/send-email";

const SOCIALS = [
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
    href: "https://www.instagram.com/_eydriannnnn/",
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

const ASCII_REGEX = /^[\x20-\x7E\r\n]+$/;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const honeypot = form.elements.namedItem("website_url") as HTMLInputElement;

    if (!ASCII_REGEX.test(name) || !ASCII_REGEX.test(email) || !ASCII_REGEX.test(message)) {
      setStatus("error");
      setErrorMessage("Invalid characters detected");
      return;
    }

    const result = await sendEmail({ name, email, message, honeypot: honeypot?.value });

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
      className="bg-[#0a0a0a] h-dvh w-screen overflow-hidden text-gray-400"
    >
      <form
        onSubmit={handleSubmit}
        className="relative h-dvh w-full grid grid-cols-1 md:grid-cols-[5fr_2.5fr]
          md:grid-rows-[5fr_3fr_5fr]"
      >
        {/* Mobile top title strip */}
        <div className="px-6 py-10 border-b-3 sm:border-b-4 border-b-gray-600 border-dashed md:hidden">
          <h2 className="text-lg tracking-[0.35em] text-center text-red-500 uppercase">
            [<span className="text-gray-500">Contact</span>]
          </h2>
        </div>

        {/* Row 1: Name (left) | empty right with vertical divider */}
        <div className="flex flex-col justify-center sm:justify-between px-6 py-6 border-b-3 sm:border-b-4 border-b-gray-600 border-dashed md:border-r-4 md:border-r-red-500 md:py-20 md:px-18 md:row-start-1 md:col-start-1">
          <h2 className="hidden md:block text-2xl tracking-[0.35em] text-red-500 uppercase sm:text-3xl md:text-5xl text-center md:text-left">
            [<span className="text-gray-500">Contact</span>]
          </h2>
          <div className="flex flex-col justify-between">
            <FieldLabel>Name:</FieldLabel>
            <input
              type="text"
              required
              maxLength={MAX_CHARS.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-transparent text-gray-300 text-[10px] md:text-base tracking-[0.2em] uppercase
              border-0 border-b-2 border-dashed border-red-500
              focus:outline-none focus:border-red-500 focus:text-red-400
              placeholder:text-gray-600 py-2 px-0"
            />
          </div>

        </div>
        <div
          aria-hidden="true"
          className="hidden md:block border-b-3 sm:border-b-4 border-b-gray-600 border-dashed md:row-start-1 md:col-start-2"
        />

        {/* Row 2: Sender email (left) | Socials (right on desktop) */}
        <div className="flex flex-col justify-center px-6 md:px-18 py-6 md:py-20 border-b-3 sm:border-b-4 border-b-gray-600 border-dashed md:border-r-4 md:border-r-red-500 md:row-start-2 md:col-start-1">
          <FieldLabel>Sender Email:</FieldLabel>
          <input
            type="email"
            required
            maxLength={MAX_CHARS.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
            className="w-full bg-transparent text-gray-300 text-[10px] md:text-base tracking-[0.2em] uppercase
              border-0 border-b-2 border-dashed border-red-500
              focus:outline-none focus:border-red-500 focus:text-red-400
              placeholder:text-gray-500 py-2 px-0"
          />
        </div>
        <div className="hidden md:flex px-6 md:px-10 py-6 md:py-8 border-b-3 sm:border-b-4 border-b-gray-600 border-dashed items-center justify-center md:row-start-2 md:col-start-2">
          <ul className="flex items-center">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label} className="-mx-[2px]">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative inline-flex items-center justify-center
                    h-15 w-15 md:h-22  md:w-22
                    border-4 border-dashed border-gray-600
                    text-red-500 hover:border-red-500 transition-colors z-10 hover:z-50"
                >
                  <Icon
                    className="h-7 w-7 md:h-10 md:w-10 transition-transform group-hover:scale-110"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Row 3: Payload content (left) | empty right with vertical divider */}
        <div className="flex flex-col justify-between px-6 md:px-18 py-6 md:py-15 border-b-3 sm:border-b-4 border-b-gray-600 border-dashed md:border-r-4 md:border-r-red-500 md:row-start-3 md:col-start-1">
          <FieldLabel>Payload Content:</FieldLabel>
          <textarea
            required
            maxLength={MAX_CHARS.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your portfolio looks great! I'd like to share business with you"
            className="flex-1 min-h-[90px] w-full resize-none bg-transparent
              text-gray-300 text-[10px] md:text-base tracking-[0.15em] uppercase leading-relaxed
              border-2 border-dashed border-red-500
              focus:outline-none focus:border-red-500 focus:text-red-400
              placeholder:text-gray-500 p-4"
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
                border-2 border-dashed border-gray-500
                px-5 md:px-6 py-2 md:py-3
                text-gray-400 hover:text-red-500 hover:border-red-500
                text-[10px] md:text-sm tracking-[0.3em] uppercase
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  Sending...
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
          {status === "error" && (
            <p className="mt-2 text-center text-red-500 text-xs tracking-[0.2em] uppercase">
              {errorMessage}
            </p>
          )}
        </div>

        {/* Mobile-only socials row */}
        <div className="px-6 py-7 border-b-4 border-b-gray-600 border-dashed flex items-center justify-center md:hidden">
          <ul className="flex items-center">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label} className="-mx-px">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative inline-flex items-center justify-center h-12 w-12 border-3 border-dashed border-gray-600 text-red-500 hover:border-red-500 transition-colors z-10 hover:z-50"
                >
                  <Icon
                    className="h-7 w-7 transition-transform group-hover:scale-110"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </section>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="block mb-3 md:mb-4 text-red-500 text-xs md:text-sm tracking-[0.35em] uppercase">
      {children}
    </label>
  );
}

"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Facebook, Github, Instagram, Linkedin, Send } from "lucide-react";

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

export default function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const to = "eydriannn@gmail.com";
    const body = `From: ${email}\n\n${message}`;
    const href = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
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

        {/* Row 1: Sender email (left) | empty right with vertical divider */}
        <div className="flex flex-col justify-center sm:justify-between px-6 py-6 border-b-3 sm:border-b-4 border-b-gray-600 border-dashed md:border-r-4 md:border-r-red-500 md:py-20 md:px-18 md:row-start-1 md:col-start-1">
          <h2 className="hidden md:block text-2xl tracking-[0.35em] text-red-500 uppercase sm:text-3xl md:text-5xl text-center md:text-left">
            [<span className="text-gray-500">Contact</span>]
          </h2>
          <div className="flex flex-col justify-between">
            <FieldLabel>Sender Email:</FieldLabel>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              className="w-full bg-transparent text-gray-300 text-[10px] md:text-base tracking-[0.2em] uppercase
              border-0 border-b-2 border-dashed border-red-500
              focus:outline-none focus:border-red-500 focus:text-red-400
              placeholder:text-gray-600 py-2 px-0
               md:text-base"
            />
          </div>

        </div>
        <div
          aria-hidden="true"
          className="hidden md:block border-b-3 sm:border-b-4 border-b-gray-600 border-dashed md:row-start-1 md:col-start-2"
        />

        {/* Row 2: Payload header (left) | Socials (right on desktop) */}
        <div className="flex flex-col justify-center px-6 md:px-18 py-6 md:py-20 border-b-3 sm:border-b-4 border-b-gray-600 border-dashed md:border-r-4 md:border-r-red-500 md:row-start-2 md:col-start-1">
          <FieldLabel>Payload Header:</FieldLabel>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="I'd like to share business with you"
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your portfolio looks great! I'd like to share business with you"
            className="flex-1 min-h-[90px] w-full resize-none bg-transparent
              text-gray-300 text-[10px] md:text-base tracking-[0.15em] uppercase leading-relaxed
              border-2 border-dashed border-red-500
              focus:outline-none focus:border-red-500 focus:text-red-400
              placeholder:text-gray-500 p-4"
          />
          <div className="mt-4 flex justify-center md:justify-end">
            <button
              type="submit"
              className="group w-full justify-center inline-flex items-center gap-3
                border-2 border-dashed border-gray-500
                px-5 md:px-6 py-2 md:py-3
                text-gray-400 hover:text-red-500 hover:border-red-500
                text-[10px] md:text-sm tracking-[0.3em] uppercase
                transition-colors"
            >
              Launch Payload
              <Send
                className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
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

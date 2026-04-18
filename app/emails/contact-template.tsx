import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmail = ({ name, email, message }: ContactEmailProps) => {
  const subject = "A visitor sent a message";

  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brand}>PORTFOLIO</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>{subject}</Heading>

            <Text style={label}>from:</Text>
            <Text style={fromValue}>{name} &lt;{email}&gt;</Text>

            <div style={dashedBorder} />

            <Text style={label}>payload content:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>Sent from your portfolio contact form</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmail;

const main = {
  backgroundColor: "#0a0a0a",
  fontFamily: "'Courier New', Courier, monospace",
};

const container = {
  margin: "0 auto",
  width: "100%",
  maxWidth: "520px",
  backgroundColor: "#0a0a0a",
};

const header = {
  padding: "24px 0",
  textAlign: "center" as const,
  borderBottom: "2px dashed #dc2626",
};

const brand = {
  color: "#dc2626",
  fontSize: "14px",
  fontWeight: "600" as const,
  letterSpacing: "0.35em",
  margin: "0",
};

const content = {
  padding: "32px 24px",
};

const heading = {
  color: "#dc2626",
  fontSize: "18px",
  fontWeight: "normal" as const,
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const label = {
  color: "#6b7280",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  margin: "0 0 4px",
};

const fromValue = {
  color: "#d1d5db",
  fontSize: "14px",
  margin: "0 0 24px",
};

const divider = {
  color: "#dc2626",
  fontSize: "12px",
  margin: "0 0 24px",
};

const dashedBorder = {
  borderBottom: "2px dashed #dc2626",
  margin: "0 0 24px",
};

const messageText = {
  color: "#d1d5db",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  padding: "24px",
  borderTop: "2px dashed #dc2626",
  textAlign: "center" as const,
};

const footerText = {
  color: "#6b7280",
  fontSize: "11px",
  margin: "0",
};
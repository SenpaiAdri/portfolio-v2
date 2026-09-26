export interface Experience {
  company: string;
  role: string;
  date: string;
  description: string;
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    company: "Freelance",
    role: "Full Stack Developer",
    date: "2026 - Present",
    description: "Developed web applications for clients using React, Next.js, and Tailwind CSS",
    technologies: ["React", "Vite", "Shadcn UI", "Tailwind CSS", "MongoDB", "Node.js", "RESTful APIs", "Cloudflare"],
  },
  {
    company: "SOCIA I.T. SOLUTIONS",
    role: "Intern Full Stack Developer",
    date: "February 2026 - April 2026",
    description: "Collaborated and maintained web applications for projects using React and Tailwind CSS",
    technologies: ["React", "Shadcn UI", "Tailwind CSS", "Node.js"],
  },
];

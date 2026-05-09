export interface Skill {
  name: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "Tailwind CSS" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Shadcn UI" },
      { name: "Flutter" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Java" },
      { name: "Node.js" },
      { name: "Python" },
      { name: "PostgreSQL" },
      { name: "Supabase" },
    ],
  },
  {
    category: "Cloud and DevOps",
    skills: [
      { name: "GCP" },
      { name: "Firebase" },
      { name: "Cloudflare" },
      { name: "GitHub Actions" },
      { name: "Docker" },
    ],
    
  },
  {
    category: "Tools",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Figma" },
      { name: "Cursor" },
    ],
  },
];

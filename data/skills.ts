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
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Python" },
      { name: "PostgreSQL" },
      { name: "Supabase" },
    ],
  },
  {
    category: "Mobile",
    skills: [
      { name: "Android Studio" },
      { name: "Flutter" },
    ],
  },
  {
    category: "Frameworks",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Shadcn UI" },
      { name: "Tailwind CSS" },
    ],
  },
];

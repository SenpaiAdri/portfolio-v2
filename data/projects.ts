export interface Project {
  name: string;
  description: string;
  image: string;
  images: string[];
  date: string;
  role: string;
  color: string;
  website: string;
  github: string;
}

export const projects: Project[] = [
  {
    name: "Pasada [Driver Side]",
    description: "Ride hailing and fleet management platform for modernized jeepney services",
    image: "/pasada_driver_logo.svg",
    images: [
      "/pasada_driver/pasada_driver_home_view.webp",
      "/pasada_driver/pasada_driver_main_screen.webp",
      "/pasada_driver/pasada_driver_activity_page_view.webp",
      "/pasada_driver/pasada_driver_activity_page_view2.webp",
      "/pasada_driver/pasada_driver_dropoff_view.webp",
      "/pasada_driver/pasada_driver_dropoff_view2.webp",
      "/pasada_driver/pasada_driver_export_view.webp",
      "/pasada_driver/pasada_driver_export_view2.webp",
      "/pasada_driver/pasada_driver_home_driving_view.webp",
      "/pasada_driver/pasada_driver_manual_booking_view.webp",
      "/pasada_driver/pasada_driver_profile_view.webp",
      "/pasada_driver/pasada_driver_select_route_view.webp",
      "/pasada_driver/pasada_driver_start_driving_view.webp",
      "/pasada_driver/pasada_driver_undo_view.webp",
    ],
    date: "September 2024 - November 2025",
    role: "Mobile Developer",
    color: "#00CC58",
    website: "https://www.pasadaapp.com/",
    github: "https://github.com/ultraelectronica/Pasada_Driver",
  },
  {
    name: "AI Blog Post",
    description: "An AI-Powered Blogging Channel for Latest Tech News and Updates",
    image: "/ai-blogpost-logo.svg",
    images: [
      "/ai_blogpost/ai_blogpost_home_page.webp",
      "/ai_blogpost/ai_blogpost_full_blog.webp",
      "/ai_blogpost/ai_blogpost_blog.webp",
      "/ai_blogpost/ai_blogpost_about.webp",
      "/ai_blogpost/ai_blogpost_about_2.webp",
      "/ai_blogpost/ai_blogpost_about_3.webp",
      "/ai_blogpost/ai_blogpost_mobile_home.webp",
      "/ai_blogpost/ai_blogpost_mobile_full_blog.webp",
    ],
    date: "January 2026 - Present",
    role: "Full Stack Developer",
    color: "#ff0000",
    website: "https://ai-blogpost.vercel.app/",
    github: "https://github.com/SenpaiAdri/AI-Blogpost",
  },
  {
    name: "Lootbx",
    description: "A Live Streaming Platform",
    image: "/lootbx-logo.svg",
    images: [
      "/lootbx/lootbx_landing_1.webp",
      "/lootbx/lootbx_landing_2.webp",
      "/lootbx/lootbx_landing_3.webp",
      "/lootbx/lootbx_home_1.webp",
      "/lootbx/lootbx_home_2.webp",
    ],
    date: "February 2026 - Present",
    role: "Full Stack Developer",
    color: "#FFD149",
    website: "https://lootbx.com/",
    github: "",
  }
];
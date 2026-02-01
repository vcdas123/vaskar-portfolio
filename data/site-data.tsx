/**
 * Centralized data store for the portfolio.
 * Icons, colors, and helpers are defined here.
 */

import React from "react";
import {
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandTailwind,
  IconBrandBootstrap,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandTypescript,
  IconBrandMongodb,
  IconBrandJavascript,
  IconDatabase,
  IconApi,
  IconTools,
  IconBrush,
  IconTemplate,
  IconLayout2,
  IconCode,
  IconRobot,
  IconSparkles,
  IconArticle,
  IconBook,
  IconBulb,
  IconRocket,
  IconNotebook,
  IconFileCode,
  IconSchool,
} from "@tabler/icons-react";
import { SiCypress, SiWebpack } from "react-icons/si";

// ─── Skill type & helpers ───────────────────────────────────────────────────
export interface SkillItem {
  label: string;
  Icon: React.ComponentType<Record<string, unknown>>;
  color: string;
  needsLightIcon: boolean;
  order: number;
}

export const SKILLS: SkillItem[] = [
  {
    label: "HTML5",
    Icon: IconBrandHtml5,
    color: "#E34F26",
    needsLightIcon: false,
    order: 0,
  },
  {
    label: "CSS3",
    Icon: IconBrandCss3,
    color: "#1572B6",
    needsLightIcon: false,
    order: 1,
  },
  {
    label: "Tailwind Css",
    Icon: IconBrandTailwind,
    color: "#06B6D4",
    needsLightIcon: false,
    order: 2,
  },
  {
    label: "Bootstrap",
    Icon: IconBrandBootstrap,
    color: "#7952B3",
    needsLightIcon: false,
    order: 3,
  },
  {
    label: "Mantine UI",
    Icon: IconTools,
    color: "#339AF0",
    needsLightIcon: false,
    order: 4,
  },
  {
    label: "Javascript",
    Icon: IconBrandJavascript,
    color: "#F7DF1E",
    needsLightIcon: false,
    order: 5,
  },
  {
    label: "Typescript",
    Icon: IconBrandTypescript,
    color: "#3178C6",
    needsLightIcon: false,
    order: 6,
  },
  {
    label: "React.js",
    Icon: IconBrandReact,
    color: "#61DAFB",
    needsLightIcon: false,
    order: 7,
  },
  {
    label: "Next.js",
    Icon: IconBrandNextjs,
    color: "#ffffff",
    needsLightIcon: true,
    order: 8,
  },
  {
    label: "Node.js",
    Icon: IconBrandNodejs,
    color: "#339933",
    needsLightIcon: false,
    order: 9,
  },
  {
    label: "Express.js",
    Icon: IconApi,
    color: "#000000",
    needsLightIcon: true,
    order: 10,
  },
  {
    label: "MongoDB",
    Icon: IconBrandMongodb,
    color: "#47A248",
    needsLightIcon: false,
    order: 11,
  },
  {
    label: "MySQL",
    Icon: IconDatabase,
    color: "#4479A1",
    needsLightIcon: false,
    order: 12,
  },
  {
    label: "Cursor AI",
    Icon: IconRobot,
    color: "#7C3AED",
    needsLightIcon: false,
    order: 13,
  },
  {
    label: "GitHub Copilot",
    Icon: IconSparkles,
    color: "#6E5494",
    needsLightIcon: false,
    order: 14,
  },
  {
    label: "ChatGPT",
    Icon: IconSparkles,
    color: "#10A37F",
    needsLightIcon: false,
    order: 15,
  },
  {
    label: "Claude",
    Icon: IconSparkles,
    color: "#D97706",
    needsLightIcon: false,
    order: 16,
  },
  {
    label: "Cypress",
    Icon: SiCypress,
    color: "#17202C",
    needsLightIcon: true,
    order: 17,
  },
  {
    label: "Module Federation",
    Icon: SiWebpack,
    color: "#8DD6F9",
    needsLightIcon: false,
    order: 18,
  },
];

const labelToSkillKey: Record<string, string> = {
  "tailwind css": "tailwind",
  "mantine ui": "mantine",
  "react.js": "react",
  "next.js": "nextjs",
  "node.js": "nodejs",
  "express.js": "express",
  "cursor ai": "cursorai",
  "github copilot": "copilot",
  "module federation": "modulefederation",
};

function normalizeKey(label: string): string {
  return label.toLowerCase().replace(/[.\s]/g, "");
}

export function getSkillByLabel(label: string): SkillItem | null {
  if (!label) return null;
  const key = normalizeKey(label);
  const resolvedKey = labelToSkillKey[key] ?? key;
  return SKILLS.find(s => normalizeKey(s.label) === resolvedKey) ?? null;
}

export function getSkillIcon(
  label?: string
): React.ComponentType<Record<string, unknown>> {
  const skill = label ? getSkillByLabel(label) : null;
  return skill?.Icon ?? IconTools;
}

export function getSkillCardStyle(skill: {
  color: string;
  needsLightIcon: boolean;
}): React.CSSProperties {
  return skill.needsLightIcon
    ? {
        backgroundColor: "rgba(255,255,255,0.08)",
        borderColor: "rgba(255,255,255,0.25)",
        borderWidth: "1px",
      }
    : {
        backgroundColor: `${skill.color}18`,
        borderColor: `${skill.color}35`,
        borderWidth: "1px",
      };
}

export function getSkillIconColor(skill: {
  color: string;
  needsLightIcon: boolean;
}): string {
  return skill.needsLightIcon ? "#ffffff" : skill.color;
}

// ─── Profile ───────────────────────────────────────────────────────────────
export const PROFILE = {
  name: "Vaskar Chandra Das",
  title: "Software Developer",
  description:
    "I enjoy delivering engaging digital solutions and am skilled in using multiple programming languages and technologies.",
  profileImage: "/profile/bg-profile.png",
  contact: {
    email: "vcdas123@gmail.com",
    phone: "+91 8910517164",
    address: "Kalyani W.B India",
  },
  socialLinks: {
    github: "https://github.com/vcdas123",
    linkedin: "https://www.linkedin.com/in/vcdas/",
  },
};

// ─── Social ────────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/vcdas123" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vcdas/" },
];

// ─── Works (Projects) ──────────────────────────────────────────────────────
export const WORKS: Array<{
  id: string;
  title: string;
  date: string;
  year: string;
  category: string;
  description: string;
  thumbnail: string;
  stack: { name: string }[];
  links: { live?: string; github?: string };
  featured: boolean;
  content?: { type: string; value?: string }[];
  images?: string[];
}> = [
  {
    id: "01",
    title: "MoviePedia",
    date: "2024-03-15",
    year: "2024",
    category: "Frontend Project",
    description:
      "Explore MoviePedia, your go-to app for comprehensive, up-to-date movie information! From favorites to new releases, we've got everything for casual viewers and film enthusiasts alike.",
    thumbnail: "/projects/moviePedia.png",
    stack: [{ name: "Saas" }, { name: "React.js" }],
    links: {
      live: "https://moviepedia-51f22.web.app/",
      github: "https://github.com/vcdas123/MoviePedia",
    },
    featured: true,
  },
  {
    id: "02",
    title: "Foodify",
    date: "2023-02-20",
    year: "2024",
    category: "Frontend Project",
    description:
      "ReactJS-powered food ordering app with Firebase integration. Features real-time menu updates and simulated ordering system. Demonstrates modern web development skills.",
    thumbnail: "/projects/reactMeals.png",
    stack: [{ name: "React.js" }],
    links: {
      live: "https://foodify-55a28.web.app/",
      github: "https://github.com/vcdas123/Food-App",
    },
    featured: true,
  },
  {
    id: "03",
    title: "Expense Tracker",
    date: "2023-02-10",
    year: "2024",
    category: "Frontend Project",
    description:
      "It is a dynamic React app featuring full CRUD functionality, along with year-wise filtering to efficiently manage and track monthly expenses.",
    thumbnail: "/projects/expense.png",
    stack: [{ name: "React.js" }],
    links: {
      live: "https://expense-tracker-67b69.web.app/",
      github: "https://github.com/vcdas123/expense-tracker",
    },
    featured: true,
  },
  {
    id: "04",
    title: "Travel Application",
    date: "2023-04-01",
    year: "2024",
    category: "Fullstack Project",
    description:
      "Developed a travel app using Pug, Node.js, and mongoDB with JWT authentication, Stripe payments, role-based access, tour filtering, bookings, real-time notifications via WebSockets, and advanced user features.",
    thumbnail: "/projects/natours.png",
    stack: [
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "Express.js" },
      { name: "Javascript" },
    ],
    links: {
      live: "https://vcdas-natours-app.onrender.com/",
      github: "https://github.com/vcdas123/natours",
    },
    featured: false,
  },
  {
    id: "05",
    title: "Grid Layout",
    date: "2024-01-10",
    year: "2024",
    category: "Frontend Project",
    description:
      "Developed a flexible Grid component in React/TypeScript using Flexbox, CSS Grid and Compound Component Pattern, enabling responsive layouts with customizable spans and gutters.",
    thumbnail: "/projects/p5.png",
    stack: [{ name: "NextJs" }, { name: "Javascript" }],
    links: {
      github:
        "https://github.com/vcdas123/library/blob/main/src/components/grid/Grid.Component.tsx",
    },
    featured: false,
  },
  {
    id: "06",
    title: "ComponentForge",
    date: "2024-01-15",
    year: "2024",
    category: "Frontend Project",
    description:
      "Developed a reusable component library (Select, Input, Checkbox, Loaders, Table, Badges, etc.) and a custom table hook with advanced features like filtering, global search, sorting, pagination, fuzzy search, and text highlighting for a modular, scalable UI experience.",
    thumbnail: "/projects/p6.png",
    stack: [{ name: "NextJs" }, { name: "Javascript" }],
    links: {
      live: "https://componentforge.vercel.app/",
      github: "https://github.com/vcdas123/componentForge",
    },
    featured: false,
  },
  {
    id: "07",
    title: "Project Management",
    date: "2024-05-01",
    year: "2024",
    category: "Backend Project",
    description:
      "A comprehensive Node.js backend API for project management with TypeORM and MySQL, featuring authentication, authorization, and CRUD operations for projects and tasks.",
    thumbnail: "/projects/p7.png",
    stack: [
      { name: "Node.js" },
      { name: "TypeORM" },
      { name: "Express.js" },
      { name: "MySQL" },
      { name: "Javascript" },
    ],
    links: {
      github: "https://github.com/vcdas123/project-management",
    },
    featured: false,
  },
];

// ─── Blog icons (one per card) ─────────────────────────────────────────────
const BLOG_ICONS = [
  IconArticle,
  IconCode,
  IconBook,
  IconBulb,
  IconRocket,
  IconNotebook,
  IconFileCode,
  IconSchool,
] as const;

export function getBlogIcon(
  index: number,
  blogId?: string
): React.ComponentType<Record<string, unknown>> {
  if (blogId === "05") return SiCypress; // Learn Testing - Cypress icon
  return BLOG_ICONS[index % BLOG_ICONS.length];
}

// ─── Blogs ─────────────────────────────────────────────────────────────────
export const BLOGS: Array<{
  id: string;
  title: string;
  date: string;
  categories: string[];
  excerpt: string;
  content: { type: string; value: string; label?: string }[];
  thumbnail?: string;
}> = [
  {
    id: "01",
    title: "Custom React Table Hook",
    date: "2024-01-15",
    categories: ["Design", "Pattern"],
    excerpt:
      "Designed and implemented a highly customizable, reusable React hook to enhance table components with advanced features, including dynamic filtering, global search functionality, column sorting, and pagination.",
    content: [
      {
        type: "paragraph",
        value:
          "Designed and implemented a highly customizable, reusable React hook to enhance table components with advanced features, including dynamic filtering, global search functionality, column sorting, and pagination. The hook leverages fuzzy search algorithms to provide accurate and flexible search results, incorporating matched text highlighting to improve user interaction and readability.",
      },
      {
        type: "paragraph",
        value:
          "Built with a focus on scalability and modularity, this solution seamlessly integrates with any table component, enabling developers to implement powerful table functionalities without significant overhead. The hook is optimized for performance and includes robust error handling and type safety using TypeScript, ensuring reliability and ease of use in diverse application scenarios.",
      },
      {
        type: "heading",
        value: "Source Code",
      },
      {
        type: "paragraph",
        value: "View the full implementation on GitHub:",
      },
      {
        type: "link",
        value:
          "https://github.com/vcdas123/componentForge/blob/master/hooks/useTableActions.tsx",
      },
      {
        type: "heading",
        value: "Implementation",
      },
      {
        type: "code",
        value: `"use client";
import { useEffect, useState } from "react";

export type Filters = {
  [key: string]: string;
};

const useSearchAndFilter = <T extends Record<string, any>>(
  data: T[],
  searchKeys: (keyof T)[],
  rowsPerPageDefault: number = 5
) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPageState, setRowsPerPageState] =
    useState<number>(rowsPerPageDefault);

  const filteredData = data.filter(row => {
    const searchMatch = searchKeys.some(key =>
      row[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filterMatch = Object.keys(filters).every(
      key => !filters[key] || row[key] === filters[key]
    );

    return searchMatch && filterMatch;
  });

  const totalFilteredDataCount = filteredData.length;
  const totalPages = Math.ceil(totalFilteredDataCount / rowsPerPageState);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPageState,
    currentPage * rowsPerPageState
  );

  const startRange = (currentPage - 1) * rowsPerPageState + 1;
  const endRange = Math.min(
    currentPage * rowsPerPageState,
    totalFilteredDataCount
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () =>
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage(prev => Math.max(prev - 1, 1));

  const setFilter = (key: string, value: any) => {
    setFilters((prevFilters: Filters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const setRowsPerPage = (value: number) => {
    setRowsPerPageState(value);
    setCurrentPage(1);
  };

  const clearFiltersAndSearch = () => {
    setSearchQuery("");
    setFilters({});
    setCurrentPage(1);
  };

  const getHighlightedText = (text: string) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(\`(\${searchQuery})\`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilter,
    clearFiltersAndSearch,
    paginatedData,
    currentPage,
    totalPages,
    rowsPerPageState,
    setRowsPerPage,
    goToPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    getHighlightedText,
    startRange,
    endRange,
    totalFilteredDataCount,
  };
};

export default useSearchAndFilter;`,
      },
      {
        type: "heading",
        value: "Key Features Explained",
      },
      {
        type: "paragraph",
        value:
          "Generic typing: The hook uses TypeScript generics <T extends Record<string, any>> so it works with any data shape. You pass searchKeys to specify which columns are searchable.",
      },
      {
        type: "paragraph",
        value:
          "Search & filter: filteredData combines a global search (across searchKeys) with per-column filters. Search is case-insensitive and matches substrings.",
      },
      {
        type: "paragraph",
        value:
          "Pagination: paginatedData, totalPages, and navigation helpers (goToPage, goToNextPage, etc.) give you full control. Rows per page is configurable and resets the current page when changed.",
      },
      {
        type: "paragraph",
        value:
          "Text highlighting: getHighlightedText wraps matched search terms in a span (e.g. yellow background) for better UX. Reset on search/filter change via useEffect.",
      },
    ],
  },
  {
    id: "02",
    title: "Grid Layout",
    date: "2024-01-10",
    categories: ["React", "TypeScript", "Components"],
    excerpt:
      "Developed a flexible Grid component in React/TypeScript using Flexbox, CSS Grid and Compound Component Pattern, enabling responsive layouts with customizable spans and gutters.",
    content: [
      {
        type: "paragraph",
        value:
          "Developed a flexible Grid component in React/TypeScript using Flexbox, CSS Grid and Compound Component Pattern, enabling responsive layouts with customizable spans and gutters.",
      },
      {
        type: "paragraph",
        value:
          "By leveraging the Compound Component Pattern, the Grid component ensures clear separation of concerns and improves component reusability.",
      },
    ],
  },
  {
    id: "04",
    title: "Enterprise Micro-Frontend Demo",
    date: "2025-12-15",
    categories: ["Architecture", "Module Federation", "React"],
    excerpt:
      "Complete working demo of enterprise-grade micro-frontend architecture using Webpack Module Federation with React, Redux, MUI, Tailwind CSS, and Framer Motion.",
    content: [
      {
        type: "paragraph",
        value:
          "A production-ready micro-frontend demo with one React root and one BrowserRouter in the host, remotes as pure React components, natural context flow, Redux shared across host and remotes, Zustand for module-specific state, and full MUI, Tailwind, and Framer Motion support.",
      },
      {
        type: "heading",
        value: "Architecture",
      },
      {
        type: "paragraph",
        value:
          "ONE React root (host only), ONE BrowserRouter (host only), remotes as pure React components with no mount functions. React Router context flows automatically. Host Redux store is shared with all remotes. Remotes can use Zustand for module-specific state.",
      },
      {
        type: "heading",
        value: "Source",
      },
      {
        type: "paragraph",
        value: "View the full project on GitHub:",
      },
      {
        type: "link",
        value: "https://github.com/vcdas123/learn-mf",
      },
      {
        type: "heading",
        value: "Key Features",
      },
      {
        type: "paragraph",
        value:
          "State Management: Redux (shared in host), Zustand (module-specific), Local state (React hooks). Styling: Tailwind CSS, MUI Components, CSS Modules, Framer Motion animations. Remotes: Student Grades, Activity Log, Image Analyzer—each can run standalone or inside the host.",
      },
    ],
  },
  {
    id: "05",
    title: "Learn Testing - Full Stack with Cypress",
    date: "2025-12-20",
    categories: ["Testing", "Cypress", "Full-Stack"],
    excerpt:
      "A full-stack application with React frontend and Node.js backend, featuring JWT authentication, posts management, comments, and Cypress E2E testing.",
    content: [
      {
        type: "paragraph",
        value:
          "A learning project demonstrating full-stack development with React, Redux, TypeScript on the frontend and Node.js, Express, TypeScript on the backend. Features JWT authentication, posts CRUD, comments system, and Cypress for end-to-end testing.",
      },
      {
        type: "heading",
        value: "Features",
      },
      {
        type: "paragraph",
        value:
          "Authentication: signup, signin, JWT tokens, bcrypt, protected routes. Posts: create, read, update, delete with ownership. Comments: view, create, delete. UI: responsive design, loading states, error handling. Testing: Cypress E2E tests.",
      },
      {
        type: "heading",
        value: "Tech Stack",
      },
      {
        type: "paragraph",
        value:
          "Backend: Node.js, Express, TypeScript, JWT, bcryptjs, @faker-js/faker. Frontend: React, Redux Toolkit, TypeScript, Axios, SCSS, Webpack. Testing: Cypress.",
      },
      {
        type: "heading",
        value: "Source",
      },
      {
        type: "paragraph",
        value: "View the full project on GitHub:",
      },
      {
        type: "link",
        value: "https://github.com/vcdas123/learn-testing",
      },
    ],
  },
  {
    id: "06",
    title: "JavaScript Life Cycle Journey",
    date: "2025-12-01",
    categories: ["JavaScript", "Education", "React"],
    excerpt:
      "A comprehensive, interactive educational website that explains the complete journey of JavaScript code execution—from writing code to final execution, covering parsing, execution context, call stack, event loop, task queues, promises, web APIs, and memory management.",
    content: [
      {
        type: "paragraph",
        value:
          "A comprehensive, interactive educational website that explains the complete journey of JavaScript code execution—from writing code to final execution. This project provides detailed explanations of JavaScript's internal mechanisms including parsing, execution context, call stack, event loop, task queues, promises, web APIs, and memory management.",
      },
      {
        type: "heading",
        value: "Features",
      },
      {
        type: "paragraph",
        value:
          "10 detailed routes covering all aspects of JavaScript execution. Fully responsive design with sidebar navigation for desktop and hamburger menu for mobile. Smooth page transitions with Framer Motion. Enhanced code blocks with copy-to-clipboard. Visual diagrams to illustrate complex concepts. Step-by-step explanations from basic to advanced.",
      },
      {
        type: "heading",
        value: "Tech Stack",
      },
      {
        type: "paragraph",
        value:
          "React 18, TypeScript, Vite, React Router DOM, Framer Motion, Tailwind CSS, ESLint.",
      },
      {
        type: "heading",
        value: "Topics Covered",
      },
      {
        type: "paragraph",
        value:
          "Parsing phase, Execution context, Call stack, Event loop, Task queues (microtasks vs macrotasks), Promises and async/await, Web APIs, Memory management and garbage collection.",
      },
      {
        type: "heading",
        value: "Source",
      },
      {
        type: "paragraph",
        value: "View the full project on GitHub:",
      },
      {
        type: "link",
        value: "https://github.com/vcdas123/js-life-cycle",
      },
      {
        type: "paragraph",
        value: "Live demo:",
      },
      {
        type: "link",
        value: "https://js-life-cycle.vercel.app/",
        label: "View live site →",
      },
    ],
  },
  {
    id: "03",
    title: "Select Component",
    date: "2024-01-05",
    categories: ["React", "TypeScript", "UI"],
    excerpt:
      "Built a reusable Select component in React with TypeScript for type safety, free from the limitations of the native HTML select tag.",
    content: [
      {
        type: "paragraph",
        value:
          "Built a reusable Select component in React with TypeScript for type safety, free from the limitations of the native HTML select tag. It supports customizable options, labels, values, and icons for both the selected value and dropdown options. The component features dynamic positioning, a clear selection button, and is styled with TailwindCSS.",
      },
      {
        type: "paragraph",
        value:
          "It also offers flexible configuration for width, placeholder, and border visibility, ensuring seamless integration into various web applications.",
      },
    ],
  },
];

// Add category icons for blog/stack items not in SKILLS
const CATEGORY_ICON_MAP: Record<
  string,
  React.ComponentType<Record<string, unknown>>
> = {
  design: IconBrush,
  pattern: IconTemplate,
  components: IconCode,
  ui: IconLayout2,
  saas: IconCode,
  sass: IconCode,
  typeorm: IconDatabase,
};

export function getIconForLabel(
  label: string
): React.ComponentType<Record<string, unknown>> {
  const skill = getSkillByLabel(label);
  if (skill) return skill.Icon;
  const key = normalizeKey(label);
  return CATEGORY_ICON_MAP[key] ?? IconTools;
}

// ─── Education ─────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    id: "1",
    institute: "University of Kalyani",
    degree: "Bachelor of Science in Chemistry",
    duration: "2016 - 2019",
    order: 0,
  },
  {
    id: "2",
    institute: "Swami Vivekananda University",
    degree: "Master of Computer Applications",
    duration: "2022 - 2024",
    order: 1,
  },
];

// ─── Experience ────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    id: "1",
    company: "iRM Cloud",
    position: "SDE",
    duration: "Sep 2023 - Nov 2025",
    location: "Kolkata, West Bengal",
    points: [
      "Built a secure Internal Audit, SOD, and ERM platform with RBAC using TypeScript, Next.js 14, and Node.js.",
      "Developed shareable components in a micro-frontend architecture for scalable audit applications.",
      "Implemented secure authentication using NextAuth.js with Google 2FA.",
      "Created a reusable design system with React.js and Storybook.js for consistent audit UIs.",
      "Enabled real-time dashboards using WebSockets and long polling, improving response time by 50%.",
      "Designed core ITGC workflows supporting Internal Audit, SOD, and ERM compliance.",
      "Built responsive UI components using Mantine UI, shadcn/ui, and Bootstrap.",
      "Developed a drag-and-drop form builder with dynamic validations for audit processes.",
      "Implemented a document management system with a tree-based structure for audit evidence management.",
    ],
    order: 0,
  },
  {
    id: "2",
    company: "Biz Hero India Private Limited",
    position: "SDE I",
    duration: "Dec 2025 – Present",
    location: "Kolkata, West Bengal",
    points: [
      "Designed and built a micro-frontend architecture from scratch using Webpack 5 Module Federation, enabling independent deployment and scalable frontend development.",
      "Managed application-wide routing and state management across multiple micro-frontends to ensure seamless navigation and consistent data flow.",
      "Developed a visually rich dashboard with real-time data updates, delivering responsive and intuitive user experiences.",
    ],
    order: 1,
  },
];

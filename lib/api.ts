/**
 * Data access layer - reads from centralized site data.
 * No backend/API calls.
 */

import {
  PROFILE,
  WORKS,
  BLOGS,
  SKILLS,
  EDUCATION,
  EXPERIENCE,
} from "@/data/site-data";

function withIds<T extends { id: string }>(items: T[]) {
  return items.map(item => ({ ...item, _id: item.id }));
}

export function getProfile() {
  return PROFILE;
}

export function getWorks() {
  const sorted = [...WORKS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return withIds(sorted);
}

export function getFeaturedWorks() {
  return withIds(WORKS.filter(w => w.featured)).slice(0, 3);
}

export function getWork(id: string) {
  const work = WORKS.find(w => w.id === id);
  if (!work) return null;
  return { ...work, _id: work.id };
}

export function getBlogs(limit?: number) {
  const sorted = [...BLOGS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const items = limit ? sorted.slice(0, limit) : sorted;
  return withIds(items);
}

export function getBlog(id: string) {
  const blog = BLOGS.find(b => b.id === id);
  if (!blog) return null;
  return {
    ...blog,
    _id: blog.id,
    date: blog.date,
  };
}

export function getExperience() {
  return withIds(EXPERIENCE);
}

export function getEducation() {
  return withIds(EDUCATION);
}

export function getSkills() {
  return SKILLS.map((s, i) => ({ ...s, _id: String(i + 1) })).sort(
    (a, b) => a.order - b.order
  );
}

export function getResumeUrl() {
  return "/cv/resume.pdf";
}

export function getImageUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return path;
}

/**
 * Journey summary – one-paragraph career, study progression, and future plans.
 */
export function getJourneySummary(): string {
  return `From Chemistry (B.Sc.) to MCA, I transitioned into software development—starting with frontend (React, Next.js), then backend (Node.js, Express, MongoDB, MySQL) and full-stack projects. I expanded into TypeScript, Mantine, Storybook, and design systems, and now work on enterprise GRC (Internal Audit, SOD, ERM) and micro-frontends, while using AI tools for faster development. I plan to keep learning and exploring new paths in tech.`;
}

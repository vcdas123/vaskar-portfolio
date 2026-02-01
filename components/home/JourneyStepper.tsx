"use client";

import {
  IconSchool,
  IconBriefcase,
  IconChevronRight,
} from "@tabler/icons-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

interface Education {
  _id: string;
  institute: string;
  degree: string;
  duration?: string;
}

interface Experience {
  _id: string;
  company: string;
  position: string;
  duration?: string;
  description?: string;
  points?: string[];
  location?: string;
}

interface JourneyStepperProps {
  education: Education[];
  experience: Experience[];
}

function parseYear(duration?: string): number {
  if (!duration) return 0;
  const match = duration.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
}

const SHORT_LABELS: Record<string, string> = {
  "University of Kalyani": "Kalyani",
  "Swami Vivekananda University": "SVU",
  "iRM Cloud": "iRM Cloud",
  "Biz Hero India Private Limited": "Biz Hero IN Pvt Ltd",
};

function getShortLabel(label: string): string {
  return SHORT_LABELS[label] ?? label;
}

export function JourneyStepper({
  education = [],
  experience = [],
}: JourneyStepperProps) {
  const eduSorted = [...education].sort(
    (a, b) => parseYear(a.duration) - parseYear(b.duration)
  );

  const steps: Array<{
    id: string;
    type: "education" | "experience";
    label: string;
    description: string;
    duration?: string;
    location?: string;
    isCurrent?: boolean;
    detail: string;
    points?: string[];
  }> = [
    ...eduSorted.map(e => ({
      id: e._id,
      type: "education" as const,
      label: e.institute,
      description: e.degree,
      duration: e.duration,
      isCurrent: false,
      detail: "",
    })),
    ...experience.map(e => ({
      id: e._id,
      type: "experience" as const,
      label: e.company,
      description: e.position,
      duration: e.duration,
      location: (e as { location?: string }).location,
      isCurrent: e.duration?.toLowerCase().includes("present"),
      detail: e.description || "",
      points: e.points || [],
    })),
  ];

  if (!steps.length) return null;

  return (
    <div className="flex flex-wrap items-stretch gap-3">
      {steps.map((step, i) => (
        <div
          key={`${step.type}-${step.id}-${i}`}
          className="flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <AnimatedCard delay={i * 0.05}>
            <div
              className={`w-[220px] flex flex-col gap-2 text-left bg-white/0 rounded-xl border border-white/5 p-4 transition-all duration-300 overflow-hidden card-hover ${
                step.isCurrent ? "ring-1 ring-accent/50" : ""
              }`}
            >
              <div className="flex items-center  gap-2 mb-2">
                <span className="w-7 h-7 rounded-lg bg-accent/20 text-accent text-sm font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                {step.duration && (
                  <span className="text-xs font-medium text-white/70 truncate">
                    {step.duration}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                {step.type === "experience" ? (
                  <IconBriefcase
                    size={14}
                    className="text-accent shrink-0"
                    stroke={2}
                  />
                ) : (
                  <IconSchool
                    size={14}
                    className="text-accent shrink-0"
                    stroke={2}
                  />
                )}
                <span className="text-sm font-semibold text-white truncate">
                  {getShortLabel(step.label)}
                </span>
              </div>
              <p className="text-xs text-white/70 truncate">
                {step.description}
              </p>
              <div className="h-5 mt-1 flex items-center">
                {step.isCurrent && (
                  <span className="px-2 py-0.5 rounded bg-accent/30 text-accent text-[10px] font-medium">
                    Current
                  </span>
                )}
              </div>
            </div>
          </AnimatedCard>
          {i < steps.length - 1 && (
            <IconChevronRight
              size={20}
              className="text-white/30 shrink-0 hidden sm:block"
              stroke={2}
            />
          )}
        </div>
      ))}
    </div>
  );
}

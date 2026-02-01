"use client";

import { Tooltip } from "@/components/ui/tooltip";
import { getIconForLabel } from "@/data/site-data";

interface StackIconsProps {
  items: { name?: string }[] | string[];
  size?: number;
  className?: string;
}

export function StackIcons({
  items,
  size = 18,
  className = "",
}: StackIconsProps) {
  if (!items?.length) return null;

  const names = items
    .map(item => (typeof item === "string" ? item : item.name || ""))
    .filter(Boolean);

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {names.map((name, i) => {
        const SkillIcon = getIconForLabel(name);
        return (
          <Tooltip key={`${name}-${i}`} label={name} withArrow>
            <span
              className="inline-flex w-7 h-7 rounded-lg bg-white/10 items-center justify-center shrink-0 text-accent hover:bg-accent/20 transition-colors cursor-default"
              title={name}
            >
              <SkillIcon size={size} stroke={1.5} />
            </span>
          </Tooltip>
        );
      })}
    </div>
  );
}

"use client";

import { Tooltip } from "@mantine/core";
import { getIconForLabel } from "@/data/site-data";

interface SkillToolboxCardProps {
  label: string;
  iconColor: string;
  size?: number;
}

export function SkillToolboxCard({
  label,
  iconColor,
  size = 32,
}: SkillToolboxCardProps) {
  const SkillIcon = getIconForLabel(label);

  return (
    <Tooltip
      label={label}
      position="top"
      withArrow
      arrowSize={8}
      styles={{
        tooltip: {
          backgroundColor: "#ffffff",
          color: "#1c1c22",
          fontWeight: 500,
          fontSize: "0.875rem",
          padding: "6px 12px",
          borderRadius: "8px",
        },
        arrow: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      <div className="w-40 h-40 rounded-xl flex flex-col items-center justify-center gap-2 p-2 bg-white/0 border border-white/5 transition-all duration-300 card-hover cursor-default">
        <SkillIcon size={size} style={{ color: iconColor }} stroke={1.5} />
        <span className="text-sm font-medium text-white/80 text-center leading-tight truncate w-full">
          {label}
        </span>
      </div>
    </Tooltip>
  );
}

"use client";

import { Badge } from "@mantine/core";
import {
  getIconForLabel,
  getSkillCardStyle,
  getSkillIconColor,
} from "@/data/site-data";

interface AboutSkillBadgeProps {
  label: string;
  color: string;
  needsLightIcon: boolean;
}

export function AboutSkillBadge({
  label,
  color,
  needsLightIcon,
}: AboutSkillBadgeProps) {
  const SkillIcon = getIconForLabel(label);
  const iconColor = getSkillIconColor({ color, needsLightIcon });
  const cardStyle = getSkillCardStyle({ color, needsLightIcon });

  return (
    <span className="inline-block transition-all duration-300 hover:shadow-lg hover:shadow-black/25">
      <Badge
        size="xl"
        leftSection={
          <SkillIcon size={18} style={{ color: iconColor }} stroke={1.5} />
        }
        styles={{
          root: {
            ...cardStyle,
            color: iconColor,
            // paddingLeft: 12,
            // paddingRight: 14,
            borderRadius: "1rem",
            fontWeight: 500,
            fontSize: "0.875rem",
            textTransform: "capitalize",
          },
        }}
      >
        {label}
      </Badge>
    </span>
  );
}

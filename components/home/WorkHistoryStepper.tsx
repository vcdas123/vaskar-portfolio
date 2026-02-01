"use client";

import { useState } from "react";
import { Stepper } from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";

interface Experience {
  _id: string;
  company: string;
  position: string;
  duration?: string;
  description?: string;
  points?: string[];
  location?: string;
}

export function WorkHistoryStepper({
  experience,
}: {
  experience: Experience[];
}) {
  const [active, setActive] = useState(0);

  if (!experience?.length) return null;

  return (
    <Stepper
      active={active}
      onStepClick={setActive}
      orientation="vertical"
      allowNextStepsSelect
      size="sm"
      color="orange"
      className="[&_.mantine-Stepper-stepIcon]:bg-accent/20 [&_.mantine-Stepper-stepIcon]:border-accent [&_.mantine-Stepper-stepIcon]:text-accent [&_.mantine-Stepper-separator]:bg-white/20"
    >
      {experience.map(exp => (
        <Stepper.Step
          key={exp._id}
          label={exp.company}
          description={exp.position}
        >
          <div className="py-4 pl-2">
            <p className="text-sm text-white/70 mb-2">
              {exp.duration}
              {exp.location && ` · ${exp.location}`}
            </p>
            {exp.description && (
              <p className="text-base text-white/90 leading-relaxed">
                {exp.description}
              </p>
            )}
            {exp.points?.length ? (
              <ul className="mt-2 space-y-1 text-sm text-white/90 list-disc list-inside">
                {exp.points.map((p, i) => (
                  <li key={i} className="leading-relaxed">
                    {p}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Stepper.Step>
      ))}
    </Stepper>
  );
}

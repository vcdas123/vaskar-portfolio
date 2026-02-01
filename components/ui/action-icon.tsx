"use client";

import {
  ActionIcon as MantineActionIcon,
  type ActionIconProps,
} from "@mantine/core";

export type ActionIconWrapperProps = ActionIconProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ActionIcon({ children, ...props }: ActionIconWrapperProps) {
  return (
    <MantineActionIcon {...(props as ActionIconProps)}>
      {children}
    </MantineActionIcon>
  );
}

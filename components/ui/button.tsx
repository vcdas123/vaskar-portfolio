"use client";

import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
} from "@mantine/core";

export type ButtonProps = MantineButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "filled",
  size = "md",
  color = "red",
  ...props
}: ButtonProps) {
  return (
    <MantineButton
      variant={variant}
      size={size}
      color={color}
      {...(props as MantineButtonProps)}
    />
  );
}

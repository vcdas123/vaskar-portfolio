"use client";

import { Tooltip as MantineTooltip, type TooltipProps } from "@mantine/core";

export interface TooltipWrapperProps extends Omit<TooltipProps, "children"> {
  children: React.ReactNode;
}

export function Tooltip({ children, ...props }: TooltipWrapperProps) {
  return <MantineTooltip {...props}>{children}</MantineTooltip>;
}

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

"use client";

import {
  ScrollArea as MantineScrollArea,
  type ScrollAreaProps,
} from "@mantine/core";

export interface ScrollAreaWrapperProps extends ScrollAreaProps {
  children: React.ReactNode;
}

export function ScrollArea({ children, ...props }: ScrollAreaWrapperProps) {
  return <MantineScrollArea {...props}>{children}</MantineScrollArea>;
}

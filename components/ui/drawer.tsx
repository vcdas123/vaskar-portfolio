"use client";

import { Drawer as MantineDrawer, type DrawerProps } from "@mantine/core";

export interface DrawerWrapperProps
  extends Omit<DrawerProps, "opened" | "onClose"> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const themeStyles = {
  content: { backgroundColor: "#1c1c22" },
  header: { backgroundColor: "#1c1c22", borderColor: "rgba(255,255,255,0.1)" },
  body: { backgroundColor: "#1c1c22", color: "#fff" },
  title: { color: "#fff", fontWeight: 600 },
  close: { color: "rgba(255,255,255,0.8)" },
};

export function Drawer({
  open,
  onOpenChange,
  children,
  position = "right",
  withCloseButton = true,
  styles,
  overlayProps,
  ...props
}: DrawerWrapperProps) {
  return (
    <MantineDrawer
      opened={open}
      onClose={() => onOpenChange(false)}
      position={position}
      withCloseButton={withCloseButton}
      styles={{ ...themeStyles, ...styles }}
      overlayProps={{
        backgroundOpacity: 0.6,
        blur: 4,
        ...overlayProps,
      }}
      {...props}
    >
      {children}
    </MantineDrawer>
  );
}

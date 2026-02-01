"use client";

import { createTheme, MantineThemeOverride } from "@mantine/core";

const orangeShades = [
  "#fff4e6",
  "#ffe8cc",
  "#ffd8a8",
  "#ffc078",
  "#ffa94d",
  "#ff922b",
  "#fd7e14",
  "#f76707",
  "#e8590c",
  "#d9480f",
] as const;

export const mantineTheme: MantineThemeOverride = createTheme({
  primaryColor: "orange",
  colors: {
    orange: orangeShades,
    dark: [
      "#f8f9fa",
      "#f1f3f5",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#868e96",
      "#495057",
      "#343a40",
      "#1c1c22",
    ],
  },
  fontFamily: "var(--font-jetbrainsMono), JetBrains Mono, monospace",
  defaultRadius: "md",
  radius: { md: "0.5rem", lg: "1rem", xl: "1.25rem" },
  components: {
    Button: {
      defaultProps: {
        color: "orange",
        radius: "xl",
        style: { borderRadius: "0.25rem" },
      },
    },
    Tabs: { defaultProps: { color: "orange" } },
    ActionIcon: { defaultProps: { color: "orange" } },
  },
});


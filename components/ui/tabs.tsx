"use client";

import {
  Tabs as MantineTabs,
  TabsList as MantineTabsList,
  TabsPanel as MantineTabsPanel,
  TabsTab as MantineTabsTab,
  type TabsProps,
  type TabsListProps,
  type TabsPanelProps,
  type TabsTabProps,
} from "@mantine/core";

export interface TabsWrapperProps extends TabsProps {
  children: React.ReactNode;
}

export function Tabs({
  children,
  color = "orange",
  ...props
}: TabsWrapperProps) {
  return (
    <MantineTabs color={color} {...props}>
      {children}
    </MantineTabs>
  );
}

export interface TabsListWrapperProps extends TabsListProps {
  children: React.ReactNode;
}

export function TabsList({ children, ...props }: TabsListWrapperProps) {
  return <MantineTabsList {...props}>{children}</MantineTabsList>;
}

export interface TabsPanelWrapperProps extends TabsPanelProps {
  children: React.ReactNode;
}

export function TabsPanel({ children, ...props }: TabsPanelWrapperProps) {
  return <MantineTabsPanel {...props}>{children}</MantineTabsPanel>;
}

export interface TabsTabWrapperProps extends TabsTabProps {
  children: React.ReactNode;
}

export function TabsTab({ children, ...props }: TabsTabWrapperProps) {
  return <MantineTabsTab {...props}>{children}</MantineTabsTab>;
}

export const TabsContent = TabsPanel;
export const TabsTrigger = TabsTab;

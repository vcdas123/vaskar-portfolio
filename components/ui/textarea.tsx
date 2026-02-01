"use client";

import React from "react";
import {
  Textarea as MantineTextarea,
  type TextareaProps as MantineTextareaProps,
} from "@mantine/core";

export interface TextareaProps extends Omit<MantineTextareaProps, "error"> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, ...props }, ref) => {
    return (
      <MantineTextarea
        ref={ref}
        error={error}
        variant="filled"
        color={error ? "red" : undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

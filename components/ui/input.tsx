"use client";

import React from "react";
import {
  TextInput as MantineTextInput,
  type TextInputProps as MantineTextInputProps,
} from "@mantine/core";

export interface InputProps extends Omit<MantineTextInputProps, "error"> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }, ref) => {
    return (
      <MantineTextInput
        ref={ref}
        error={error}
        variant="filled"
        color={error ? "red" : undefined}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

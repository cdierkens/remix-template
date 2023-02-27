import { clsx } from "clsx";
import type { InputHTMLAttributes } from "react";
import React from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }: InputProps, ref) => {
    return (
      <input
        ref={ref}
        className={clsx("input input-bordered", className, {
          "input-error": Boolean(props["aria-invalid"]),
        })}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

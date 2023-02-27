import { useObjectRef } from "@react-aria/utils";
import { clsx } from "clsx";
import type { ComponentProps } from "react";
import React from "react";
import type { AriaButtonProps } from "react-aria";
import { useButton } from "react-aria";

export type ButtonProps = AriaButtonProps<"button"> & ComponentProps<"button">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, forwardedRef) => {
    const ref = useObjectRef(forwardedRef);
    const { buttonProps } = useButton(props, ref);
    const { children } = props;

    return (
      <button className={clsx("btn", className)} {...buttonProps} ref={ref}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

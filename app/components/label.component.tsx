import { clsx } from "clsx";
import type { LabelHTMLAttributes, PropsWithChildren } from "react";

export function Label({
  children,
  className,
  ...props
}: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) {
  return (
    <label className={clsx("label", className)} {...props}>
      <span className="label-text">{children}</span>
    </label>
  );
}

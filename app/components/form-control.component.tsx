import { clsx } from "clsx";
import type { ComponentProps, PropsWithChildren } from "react";

export function FormControl({
  children,
  className,
}: PropsWithChildren<ComponentProps<"div">>) {
  return <div className={clsx("form-control mb-3", className)}>{children}</div>;
}

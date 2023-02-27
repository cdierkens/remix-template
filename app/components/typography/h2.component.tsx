import clsx from "clsx";
import type { HTMLAttributes, PropsWithChildren } from "react";

export function H2({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h2
      className={clsx(
        className,
        "text-5xl font-normal leading-normal mt-0 mb-2"
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

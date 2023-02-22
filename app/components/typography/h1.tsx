import clsx from "clsx";
import type { HTMLAttributes, PropsWithChildren } from "react";

export function H1({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h1
      className={clsx(
        className,
        "text-6xl font-normal leading-normal mt-0 mb-2"
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

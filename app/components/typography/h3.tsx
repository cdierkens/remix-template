import clsx from "clsx";
import type { HTMLAttributes, PropsWithChildren } from "react";

export function H3({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h3
      className={clsx(
        className,
        "text-4xl font-normal leading-normal mt-0 mb-2"
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

import clsx from "clsx";
import type { HTMLAttributes, PropsWithChildren } from "react";

export function H4({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h4
      className={clsx(
        className,
        "text-3xl font-normal leading-normal mt-0 mb-2"
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

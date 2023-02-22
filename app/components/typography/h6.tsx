import clsx from "clsx";
import type { HTMLAttributes, PropsWithChildren } from "react";

export function H6({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h6
      className={clsx(
        className,
        "text-xl font-normal leading-normal mt-0 mb-2"
      )}
      {...props}
    >
      {children}
    </h6>
  );
}

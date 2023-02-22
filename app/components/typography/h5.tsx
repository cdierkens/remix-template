import clsx from "clsx";
import type { HTMLAttributes, PropsWithChildren } from "react";

export function H5({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h5
      className={clsx(
        className,
        "text-2xl font-normal leading-normal mt-0 mb-2"
      )}
      {...props}
    >
      {children}
    </h5>
  );
}

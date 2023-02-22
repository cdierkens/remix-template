import clsx from "clsx";
import type { HTMLAttributes, PropsWithChildren } from "react";

export function P({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p
      className={clsx(
        className,
        "text-base font-light leading-relaxed mt-0 mb-4"
      )}
      {...props}
    >
      {children}
    </p>
  );
}

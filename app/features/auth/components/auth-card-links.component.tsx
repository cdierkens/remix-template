import type { PropsWithChildren } from "react";

export function AuthCardLinks({ children }: PropsWithChildren) {
  return <div className="flex gap-1">{children}</div>;
}

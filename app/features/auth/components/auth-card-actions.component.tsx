import type { PropsWithChildren } from "react";

export function AuthCardActions({ children }: PropsWithChildren) {
  return <div className="card-actions mb-3 justify-between">{children}</div>;
}

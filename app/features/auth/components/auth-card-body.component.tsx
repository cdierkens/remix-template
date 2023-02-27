import type { PropsWithChildren } from "react";

export function AuthCardBody({ children }: PropsWithChildren) {
  return <div className="card-body">{children}</div>;
}

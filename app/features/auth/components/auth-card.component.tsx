import type { PropsWithChildren } from "react";

export function AuthCard({ children }: PropsWithChildren) {
  return (
    <div className="card w-full max-w-lg m-auto bg-base-100 shadow-xl">
      {children}
    </div>
  );
}

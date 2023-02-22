import type { PropsWithChildren } from "react";
import { H1 } from "~/components/typography/h1";

export function AuthCardTitle({ children }: PropsWithChildren) {
  return <H1 className="card-title mb-3">{children}</H1>;
}

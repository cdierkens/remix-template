import type { ActionArgs } from "@remix-run/node";
import { authenticator } from "~/features/auth";

export async function loader({ request }: ActionArgs) {
  await authenticator.logout(request, { redirectTo: "/sign-in" });
}

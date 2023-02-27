import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import clsx from "clsx";
import { SSRProvider } from "react-aria";
import { authenticator } from "./features/auth/lib/authenticator.lib.server";
import { Header } from "./features/layout";
import styles from "./styles/app.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Template",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);

  return json({ user });
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();
  const transition = useTransition();

  return (
    <SSRProvider>
      <html lang="en" className="bg-base-200">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <Header user={user}>
            <progress
              className={clsx("progress progress-primary block flex-shrink-0", {
                invisible: transition.state === "idle",
              })}
            ></progress>

            <main className="container mx-auto px-3 mt-3 flex-auto">
              <Outlet />
            </main>
          </Header>

          {/* <Footer /> */}

          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </SSRProvider>
  );
}

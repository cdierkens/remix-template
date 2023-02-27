import { createCookieSessionStorage } from "@remix-run/node";
import { invariant } from "~/utils/invariant.util";

invariant(
  process.env.SESSION_STORAGE_SECRET,
  new Error("SESSION_STORAGE_SECRET should be set")
);

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_STORAGE_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

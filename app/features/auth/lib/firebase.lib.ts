import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { invariant } from "~/utils/invariant.util";

invariant(process.env.FIREBASE_API_KEY, "SESSION_STORAGE_SECRET should be set");

invariant(
  process.env.FIREBASE_AUTH_DOMAIN,
  "SESSION_STORAGE_SECRET should be set"
);

const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
});

const auth = getAuth(app);

export { auth };

import type { User } from "@prisma/client";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { auth, getErrorMessage } from "~/features/auth";
import { invariant } from "~/utils/invariant.util";
import { sessionStorage } from "../utils/session.util.server";
import { prisma } from "./prisma.lib.server";

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    invariant(
      typeof email === "string" && email.length,
      "Please provide your email address."
    );
    invariant(
      typeof password === "string" && password.length,
      "Please provide your password."
    );

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      invariant(
        typeof userCredential.user.email === "string",
        "Email not found on user credential."
      );

      const user = await prisma.user.upsert({
        where: { email: userCredential.user.email },
        update: {},
        create: { email: userCredential.user.email },
      });

      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(getErrorMessage(error.code));
      }

      throw error;
    }
  }),
  "user-pass"
);

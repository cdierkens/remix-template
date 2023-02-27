import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { FirebaseError } from "firebase/app";
import { confirmPasswordReset } from "firebase/auth";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { SubmitButton } from "~/components/submit-button.component";
import { TextField } from "~/components/text-field.component";
import { P } from "~/components/typography/p.component";
import {
  auth,
  AuthCard,
  AuthCardActions,
  AuthCardBody,
  AuthCardTitle,
  getErrorMessage,
  getRedirectURL,
} from "~/features/auth";

const validator = withZod(
  z.object({
    code: z.string().min(1, { message: "Reset code is required." }),
    password: z.string().min(1, "Password is required."),
  })
);

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const result = await validator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  const { code, password } = result.data;

  try {
    await confirmPasswordReset(auth, code, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      return json(
        {
          errorMessage: getErrorMessage(error.code),
        },
        {
          status: 400,
          statusText: "Bad Request",
        }
      );
    }
  }

  return redirect(getRedirectURL({ request }));
}

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("oobCode");

  if (!code) {
    return json(
      { errorMessage: "Reset code is required." },
      { status: 400, statusText: "Bad Request" }
    );
  }

  return json({ code });
}

export default function PasswordUpdate() {
  const data = useActionData<typeof action>();
  const loaderData = useLoaderData<typeof loader>();
  const { submission } = useTransition();

  return (
    <AuthCard>
      <AuthCardBody>
        <ValidatedForm validator={validator} method="post">
          <AuthCardTitle>Update Password</AuthCardTitle>

          <TextField name="password" type="password" label="New Password" />

          {loaderData && "errorMessage" in loaderData ? (
            <P className="alert alert-error shadow-lg mb-3">
              {loaderData.errorMessage}
            </P>
          ) : (
            <input type="hidden" name="code" value={loaderData.code} />
          )}

          {data && "errorMessage" in data ? (
            <P className="alert alert-error shadow-lg mb-3">
              {data.errorMessage}
            </P>
          ) : null}

          <AuthCardActions>
            <SubmitButton
              isLoading={Boolean(submission)}
              disabled={Boolean(submission)}
            >
              {submission ? "Updating Password..." : "Update Password"}
            </SubmitButton>
          </AuthCardActions>
        </ValidatedForm>
      </AuthCardBody>
    </AuthCard>
  );
}

import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  useActionData,
  useLocation,
  useTransition,
} from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { sendPasswordResetEmail } from "firebase/auth";
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
  AuthCardLinks,
  AuthCardTitle,
  getRedirectURL,
} from "~/features/auth";

const validator = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email("Must be a valid email."),
  })
);

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const result = await validator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  const { email } = result.data;

  await sendPasswordResetEmail(auth, email);

  return json({
    successMessage: "Please check your email for a reset password link.",
  });
}

export default function PasswordReset() {
  const { submission } = useTransition();
  const data = useActionData<typeof action>();
  const location = useLocation();

  if (data && "successMessage" in data) {
    return (
      <AuthCard>
        <AuthCardBody>
          <P className="alert alert-info shadow-lg mb-3">
            {data.successMessage}
          </P>

          <div className="flex justify-end gap-1">
            <Link
              className="link hover:link-primary"
              to={getRedirectURL({ location })}
            >
              Sign In
            </Link>
            or
            <Link
              className="link hover:link-primary"
              to={getRedirectURL({ location })}
            >
              Sign Up
            </Link>
          </div>
        </AuthCardBody>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthCardBody>
        <ValidatedForm validator={validator} method="post">
          <AuthCardTitle>Reset Password</AuthCardTitle>

          <TextField name="email" type="email" label="Email" />

          <AuthCardActions>
            <SubmitButton
              isLoading={Boolean(submission)}
              disabled={Boolean(submission)}
            >
              {submission ? "Sending Reset Email..." : "Reset Password"}
            </SubmitButton>

            <AuthCardLinks>
              <Link className="link hover:link-primary" to="/sign-in">
                Sign In
              </Link>
              or
              <Link className="link hover:link-primary" to="/sign-up">
                Sign Up
              </Link>
            </AuthCardLinks>
          </AuthCardActions>
        </ValidatedForm>
      </AuthCardBody>
    </AuthCard>
  );
}

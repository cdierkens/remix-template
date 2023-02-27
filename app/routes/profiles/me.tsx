import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { H1 } from "~/components/typography/h1.component";
import { authenticator, getRedirectURL } from "~/features/auth";

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: getRedirectURL({ request }),
  });

  return { user };
}

export default function ProfilesMe() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <>
      <H1>Profile</H1>
      <table className="table table-zebra w-full">
        <tbody>
          {Object.entries(user).map(([key, value]) => {
            return (
              <tr key={key}>
                <th>{key}</th>
                <td>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

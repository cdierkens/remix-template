import type { Location } from "@remix-run/react";

type GetRedirectURLOptions =
  | {
      request: Request;
    }
  | {
      location: Location;
    };

export function getRedirectURL({ request }: { request: Request }): string;
export function getRedirectURL({ location }: { location: Location }): string;
export function getRedirectURL(options: GetRedirectURLOptions) {
  const { hash, pathname, search } =
    "request" in options ? new URL(options.request.url) : options.location;

  const urlSearchParams = new URLSearchParams({
    redirectTo: `${pathname}${search}${hash}`,
  });

  return `/sign-in?${urlSearchParams.toString()}`;
}

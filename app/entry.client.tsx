import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrate } from "react-dom";
import { hydrateRoot } from "react-dom/client";

function startHydration() {
  startTransition(() => {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);

    if (process.env.NODE_ENV === "test") {
      hydrate(<RemixBrowser />, document);
    } else {
      hydrateRoot(
        document,
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      );
    }
  });
}

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(startHydration);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(startHydration, 1);
}

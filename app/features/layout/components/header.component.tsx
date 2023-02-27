import type { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { PropsWithChildren } from "react";
import { useId, useState } from "react";

interface HeaderProps {
  user: User | null;
}

export function Header({ user, children }: PropsWithChildren<HeaderProps>) {
  const id = useId();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <header className="drawer">
      <input
        id={id}
        type="checkbox"
        checked={isDrawerOpen}
        onChange={(event) => {
          setIsDrawerOpen(event.currentTarget.checked);
        }}
        className="drawer-toggle"
      />

      <div className="drawer-content bg-base-200 flex flex-col">
        <nav className="navbar w-full bg-base-100 border-b-base-200 shadow-md">
          <div className="flex-none lg:hidden">
            <label htmlFor={id} className="btn btn-square btn-ghost">
              <span className="sr-only">Toggle side drawer</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <div className="flex-1">
            <a href="/" className="btn btn-link">
              Remix Template
            </a>
          </div>

          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {user && (
                <>
                  <li>
                    <Link to="/profiles/me">{user.email}</Link>
                  </li>
                  <li>
                    <Link to="/sign-out">Sign Out</Link>
                  </li>
                </>
              )}
              {!user && (
                <li>
                  <Link to="/sign-in">Sign In</Link>
                </li>
              )}
            </ul>
          </div>
        </nav>

        {children}
      </div>

      <div className="drawer-side">
        <label htmlFor={id} className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100">
          {user && (
            <>
              <li>
                <Link onClick={closeDrawer} to="/profile">
                  {user.email}
                </Link>
              </li>
              <li>
                <Link onClick={closeDrawer} to="/sign-out">
                  Sign Out
                </Link>
              </li>
            </>
          )}
          {!user && (
            <li>
              <Link onClick={closeDrawer} to="/sign-in">
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

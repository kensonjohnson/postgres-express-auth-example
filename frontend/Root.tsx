import {
  Link,
  Outlet,
  useLoaderData,
  Form,
  LoaderFunctionArgs,
  redirect,
} from "react-router-dom";
import { authProvider } from "./providers/auth-provider";

export async function loader({ request }: LoaderFunctionArgs) {
  // Check if redirect is sent from the server
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("r");
  if (redirectTo) {
    // Include query string in the redirect, if present
    const query = url.searchParams.get("q");
    const path = decodeURIComponent(redirectTo);
    return redirect(path + (query ? `?q=${query}` : ""));
  }

  await authProvider.authenticate();
  return { user: authProvider.user };
}

export function Root() {
  const { user } = useLoaderData() as { user?: User };

  return (
    <main>
      <header
        style={{
          marginBottom: "2rem",
        }}
      >
        <nav style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
          {!user && (
            <Link to={"/"} className="button">
              Home
            </Link>
          )}
          {user && (
            <Link to={"/dashboard"} className="button">
              Dashboard
            </Link>
          )}
          {user && (
            <Link to={"/account"} className="button">
              Account
            </Link>
          )}
          {/* logout */}
          {user && (
            <Form action="/logout" method="post">
              <button type="submit" style={{ cursor: "pointer" }}>
                Logout
              </button>
            </Form>
          )}
        </nav>
      </header>
      <Outlet />
    </main>
  );
}

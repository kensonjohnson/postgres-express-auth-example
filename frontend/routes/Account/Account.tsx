import {
  Form,
  RouteObject,
  redirect,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import { authProvider } from "../../providers/auth-provider";
import styles from "./Account.module.css";

export const accountRoutes: RouteObject[] = [
  {
    path: "account",
    element: <Account />,
    loader,
    action,
  },
];

async function action() {
  const response = await fetch("/billing/credit", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("There was an error adding credits to your account.");
  }

  await authProvider.refreshUser();
  return redirect("/account");
}

// We need a loader to revalidate the user data after adding credits
async function loader() {
  await authProvider.ready;
  if (!authProvider.isAuthenticated) {
    return redirect("/");
  }
  return authProvider.user;
}

export function Account() {
  const user = useLoaderData() as User | null;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <ul className={styles.listContainer}>
          <li>ID: {user.id}</li>
          {user.first_name && (
            <li>
              Name:{" "}
              {`${user.first_name} ${user.last_name ? user.last_name : ""}`}
            </li>
          )}
          <li>Email: {user.email}</li>
          <li>Email Verified: {user.email_verified ? "Yes" : "No"}</li>
          <li>Credit Balance: {user.credit_balance ?? 0}</li>
        </ul>
      </aside>
      <main className={styles.main}>
        {user.first_name && <h2>Welcome {user.first_name}!</h2>}
        <p>This is your account page. You can see your account details here.</p>
        <div className={styles.buttonContainer}>
          <Form method="post">
            <button type="submit">Add Credits</button>
          </Form>
        </div>
        <p>Credits last for 10 minutes</p>
      </main>
    </div>
  );
}

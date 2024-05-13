import { redirect, Outlet } from "react-router-dom";
import { authProvider } from "../../providers/auth-provider";
import styles from "./Dashboard.module.css";

export async function loader() {
  await authProvider.ready;
  if (!authProvider.isAuthenticated) {
    return redirect("/");
  }

  return null;
}

export function Dashboard() {
  const user = authProvider.user;

  return (
    <section className={styles.container}>
      <div className={styles["dashboard-bar"]}>
        <h2>Welcome {user?.email}!</h2>
      </div>
      <Outlet />
    </section>
  );
}

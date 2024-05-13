import {
  useLoaderData,
  redirect,
  Outlet,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import { authProvider } from "../../providers/auth-provider";
import { Lists } from "../Lists/Lists";
import styles from "./Dashboard.module.css";
import { useEffect } from "react";

export async function loader() {
  await authProvider.ready;
  if (!authProvider.isAuthenticated) {
    return redirect("/");
  }
  const response = await fetch("/list");
  if (!response.ok) return { list: [] };

  const lists = await response.json();

  return { lists };
}

export function Dashboard() {
  const { lists } = useLoaderData() as { lists: List[] };
  const user = authProvider.user;
  const navigate = useNavigate();

  useEffect(() => {
    if (lists && lists.length > 0) {
      navigate(`/dashboard/${lists[0].id}`);
    } else {
      navigate("/dashboard/0");
    }
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles["dashboard-bar"]}>
        <h2>Welcome {user?.email}!</h2>
      </div>
      <Lists lists={lists} />
      <Outlet context={{ lists } satisfies { lists: List[] }} />
    </section>
  );
}

export function useLists() {
  return useOutletContext<{ lists: List[] }>();
}

import {
  useLoaderData,
  redirect,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import { authProvider } from "../../providers/auth-provider";
import { Lists } from "../../components/Lists/Lists";
import styles from "./Dashboard.module.css";

export async function loader() {
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
  const user = authProvider.user!;

  return (
    <section className={styles.container}>
      <div className={styles["dashboard-bar"]}>
        <h2>Welcome {user.email}!</h2>
      </div>
      <Lists lists={lists} />
      <Outlet context={lists satisfies List[]} />
    </section>
  );
}

export function useLists() {
  return useOutletContext<List[]>();
}
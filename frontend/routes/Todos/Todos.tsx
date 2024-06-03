import {
  Outlet,
  RouteObject,
  redirect,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { authProvider } from "../../providers/auth-provider";
import { useEffect } from "react";
import { Lists } from "./Lists/Lists";
import styles from "./Todos.module.css";
import { Tasks } from "./Tasks/Tasks";
import { action as addListAction } from "./Lists/AddList";
import { action as addTaskAction } from "./Tasks/AddTask";
import { action as completeAction } from "./Tasks/Completed";
import { action as deleteListAction } from "./Lists/DeleteList";
import { action as deleteTaskAction } from "./Tasks/DeleteTask";
import { action as editTitleAction } from "./Lists/EditTitle";
import ErrorPage from "../../error-page";

export const todosRoutes: RouteObject[] = [
  {
    path: "todos",
    element: <Todos />,
    loader: loader,
    errorElement: <ErrorPage />,
    children: [
      { path: ":listId", element: <Tasks /> },
      { path: "add/list", action: addListAction },
      { path: "add/task", action: addTaskAction },
      { path: "update/task/completed", action: completeAction },
      { path: "edit-title", action: editTitleAction },
      {
        path: "delete",
        children: [
          { path: "list/:id", action: deleteListAction },
          { path: "task", action: deleteTaskAction },
        ],
      },
    ],
  },
];

async function loader() {
  await authProvider.ready;
  if (!authProvider.isAuthenticated) {
    return redirect("/");
  }
  const response = await fetch("/list");
  if (!response.ok) return [];

  return await response.json();
}

function Todos() {
  const lists = useLoaderData() as List[];
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const { listId } = params as { listId: string };
    if (listId) {
      return;
    }
    if (lists && lists.length > 0) {
      navigate(`/todos/${lists[0].id}`);
    } else {
      navigate("/todos/0");
    }
  }, []);

  return (
    <div className={styles.container}>
      <Lists lists={lists} />
      <Outlet context={{ lists } satisfies { lists: List[] }} />
    </div>
  );
}

export function useLists() {
  return useOutletContext<{ lists: List[] }>();
}

import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import styles from "./DeleteTask.module.css";
import { Xmark } from "iconoir-react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const listId = formData.get("listId") as string;

  if (!id) {
    return new Response("Missing task id", { status: 400 });
  }

  const response = await fetch(`/task/delete/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    return new Response("Failed to delete task", { status: 500 });
  }

  return redirect(`/dashboard/${listId}`);
}

export function DeleteTask({ task }: { task: Task }) {
  return (
    <Form action="/delete/task" method="post" className={styles.form}>
      <input type="hidden" name="id" value={task.id} />
      <input type="hidden" name="listId" value={task.list_id} />
      <button className={styles["delete-button"]} type="submit">
        <Xmark />
      </button>
    </Form>
  );
}

import { Xmark } from "iconoir-react";
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import styles from "./DeleteList.module.css";

export async function action({ params }: ActionFunctionArgs) {
  const id = params.id;

  if (!id) {
    return new Response("Missing list id", { status: 400 });
  }

  const response = await fetch(`/list/delete/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    return new Response("Failed to delete list", { status: 500 });
  }
  return redirect("/todos");
}

export function DeleteList({ list }: { list: List }) {
  return (
    <Form
      action={`/todos/delete/list/${list.id}`}
      method="post"
      className={styles.form}
    >
      <button className={styles["delete-button"]} type="submit">
        <Xmark />
      </button>
    </Form>
  );
}

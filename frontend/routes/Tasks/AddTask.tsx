import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import styles from "./AddTask.module.css";
import { useState, useEffect } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const listId = formData.get("listId") as string;
  const title = formData.get("title") as string;

  if (!listId || !title) {
    return new Response("Missing listId or title", { status: 400 });
  }

  const response = await fetch("/task/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      listId,
      title,
    }),
  });
  if (!response.ok) {
    return new Response("Failed to create task", { status: 500 });
  }

  return redirect(`/dashboard/${listId}`);
}

export function AddTask({ list }: { list: List }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
  }, [list]);

  return (
    <Form action="/add/task" method="post" className={styles.form}>
      <input type="hidden" name="listId" value={list.id} />
      <input
        type="text"
        name="title"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Add</button>
    </Form>
  );
}

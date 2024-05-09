import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import styles from "./AddList.module.css";
import { useEffect, useState } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const response = await fetch("/list/create", {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return new Response("Failed to create list.", {
      status: response.status,
      statusText: response.statusText,
    });
  }
  const { id } = await response.json();

  return redirect("/dashboard/" + id);
}

export function AddList({ lists }: { lists: List[] }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
  }, [lists]);
  return (
    <Form action="/add/list" method="post" className={styles.form}>
      <input
        type="text"
        name="title"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="New list name"
      />
      <button type="submit">Add</button>
    </Form>
  );
}

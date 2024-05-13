import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";
import styles from "./AddTask.module.css";
import { useState, useEffect } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const listId = formData.get("listId") as string;
  const title = formData.get("title") as string;

  if (!listId || !title) return redirect("/dashboard");

  try {
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

    if (!response.ok) throw new Error(response.statusText);

    return redirect(`/dashboard/${listId}`);
  } catch (error) {
    if (error instanceof Error) {
      return new Response("Failed to create task", {
        status: 500,
        statusText: error.message,
      });
    }
    return new Response("Failed to create task", { status: 500 });
  }
}

export function AddTask({ list }: { list: List }) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "submitting") {
      setName("");
      setSubmitting(true);
    } else {
      setSubmitting(false);
    }
  }, [navigation]);

  return (
    <Form action="/add/task" method="post" className={styles.form}>
      <input type="hidden" name="listId" value={list.id} />
      <input
        type="text"
        name="title"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit" disabled={submitting}>
        Add
      </button>
    </Form>
  );
}

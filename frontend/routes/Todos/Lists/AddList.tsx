import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";
import styles from "./AddList.module.css";
import { useEffect, useState } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;

  if (!title) return redirect("/todos");
  try {
    const response = await fetch("/list/create", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    const { id } = await response.json();

    return redirect("/todos/" + id);
  } catch (error) {
    if (error instanceof Error) {
      return new Response("Failed to create list.", {
        status: 500,
        statusText: error.message,
      });
    }
    return new Response("Failed to create list.", { status: 500 });
  }
}

export function AddList() {
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
    <Form action="/todos/add/list" method="post" className={styles.form}>
      <input
        type="text"
        name="title"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="New list name"
      />
      <button type="submit" disabled={submitting}>
        Add
      </button>
    </Form>
  );
}

import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import styles from "./Login.module.css";

export async function action({ request }: ActionFunctionArgs) {
  const email = (await request.formData()).get("email") as string;

  const response = await fetch("/auth/email", {
    method: "post",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return redirect("/login/check-email");
  }
  throw new Error("There was an error logging in.");
}

export function Login() {
  return (
    <Form action="/login/email" method="post" className={styles.form}>
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" />
      <button type="submit" className="button">
        Login
      </button>
    </Form>
  );
}

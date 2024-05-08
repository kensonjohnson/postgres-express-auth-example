import { Form, redirect } from "react-router-dom";
import { authProvider } from "../providers/auth-provider";

export async function action() {
  await authProvider.logout();
  return redirect("/");
}

export function Logout() {
  return (
    <Form
      className="button"
      style={{ marginLeft: "auto" }}
      action="/logout"
      method="post"
    >
      <button
        style={{ background: "none", border: 0, fontSize: "inherit" }}
        type="submit"
      >
        Logout
      </button>
    </Form>
  );
}

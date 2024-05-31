import { Form, redirect } from "react-router-dom";

export async function action() {
  const response = await fetch("/conversation/new", {
    method: "POST",
  });
  if (!response.ok) {
    return redirect("/chat");
  }
  const data = await response.json();
  return redirect(`/chat/${data.id}`);
}

export function NewChat() {
  return (
    <Form method="post">
      <button className="button" type="submit">
        New Chat
      </button>
    </Form>
  );
}

import { Xmark } from "iconoir-react";
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import styles from "./DeleteChat.module.css";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const chatId = formData.get("chatId") as string;

  if (!chatId) {
    return new Response("Missing chat id", { status: 400 });
  }

  const response = await fetch(`/conversation/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: chatId }),
  });

  if (!response.ok) {
    return new Response("Failed to delete chat", { status: 500 });
  }

  return redirect(`/chat/0`);
}

type DeleteChatProps = {
  chatId: number;
};

export function DeleteChat({ chatId }: DeleteChatProps) {
  return (
    <Form action="/chat/delete" method="delete" className={styles.form}>
      <input type="hidden" name="chatId" value={chatId} />
      <button className={styles["delete-button"]} type="submit">
        <Xmark />
      </button>
    </Form>
  );
}

import { useState } from "react";
import { DynamicHeightTextArea } from "./DynamicHeightTextArea";
import styles from "./ResponseForm.module.css";
import { useParams } from "react-router-dom";
import { authProvider } from "../../providers/auth-provider";

type ResponseFormProps = {
  chat: ChatObject[];
  setPartialResponse: React.Dispatch<React.SetStateAction<string>>;
};

export function ResponseForm({ chat, setPartialResponse }: ResponseFormProps) {
  const [value, setValue] = useState("");
  const { chatId } = useParams() as { chatId: string };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (value.trim() === "") {
      return;
    }

    try {
      const eventSource = await fetch("/conversation/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: value, conversationId: chatId ?? "" }),
      });

      if (!eventSource.ok) {
        throw new Error("Failed to send message");
      }

      const reader = eventSource.body
        ?.pipeThrough(new TextDecoderStream())
        .getReader();

      if (!reader) {
        throw new Error("Failed to create reader");
      }

      chat.push({ role: "user", content: value });

      let content = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        content += value;
        setPartialResponse(content);
      }

      chat.push({ role: "system", content });
      setPartialResponse("");
      setValue("");
      authProvider.user!.credit_balance--;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <DynamicHeightTextArea
        value={value}
        setValue={setValue}
        className={styles.textarea}
      />
      <button className={styles.button} type="submit">
        Send
      </button>
    </form>
  );
}

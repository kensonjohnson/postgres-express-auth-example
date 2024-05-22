import { useState } from "react";
import { DynamicHeightTextArea } from "./DynamicHeightTextArea";
import styles from "./ResponseForm.module.css";
import type { ChatObject } from "./ChatWindow";

type ResponseFormProps = {
  chat: ChatObject[];
  setChat: React.Dispatch<React.SetStateAction<ChatObject[]>>;
  setPartialResponse: React.Dispatch<React.SetStateAction<string>>;
};

export function ResponseForm({
  chat,
  setChat,
  setPartialResponse,
}: ResponseFormProps) {
  const [value, setValue] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (value.trim() === "") {
      return;
    }

    try {
      // const response = await fetch("/conversation", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ message: value }),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to send message");
      // }

      // const newChat: ChatObject[] = [...chat];
      // newChat.push({ role: "user", message: value });

      // setChat(newChat);

      // // TODO: convert to event source
      // const { message } = await response.json();

      // setChat([...newChat, { role: "bot", message }]);

      // setValue("");

      const eventSource = await fetch("/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: value }),
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

      const newChat: ChatObject[] = [...chat, { role: "user", message: value }];
      setChat(newChat);

      let message = "";

      while (true) {
        const { value: part, done } = await reader.read();

        if (done) {
          break;
        }

        message += part ?? "";
        setPartialResponse(message);
      }

      setChat([...newChat, { role: "bot", message }]);
      setPartialResponse("");
      setValue("");
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

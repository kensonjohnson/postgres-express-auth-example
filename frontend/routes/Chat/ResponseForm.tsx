import { useState } from "react";
import { DynamicHeightTextArea } from "./DynamicHeightTextArea";
import styles from "./ResponseForm.module.css";
import type { ChatObject } from "./ChatWindow";

type ResponseFormProps = {
  chat: ChatObject[];
  setChat: React.Dispatch<React.SetStateAction<ChatObject[]>>;
};

export function ResponseForm({ chat, setChat }: ResponseFormProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (value.trim() === "") {
      return;
    }

    setChat([
      ...chat,
      { role: "user", message: value },
      { role: "bot", message: "I'm a bot" },
    ]);
    setValue("");
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

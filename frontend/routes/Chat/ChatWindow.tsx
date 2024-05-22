import { useState } from "react";
import styles from "./ChatWindow.module.css";
import { ResponseForm } from "./ResponseForm";
import { v4 as uuidv4 } from "uuid";
import { ChatItem } from "./ChatItem";

export type ChatObject = {
  role: "user" | "bot";
  message: string;
};

export function ChatWindow() {
  const [chat, setChat] = useState<ChatObject[]>([]);
  const [partialResponse, setPartialResponse] = useState<string>("");
  return (
    <div className={styles.container}>
      {chat.map((item) => (
        <ChatItem key={uuidv4()} role={item.role} message={item.message} />
      ))}
      {partialResponse && (
        <ChatItem key={uuidv4()} role="bot" message={partialResponse} />
      )}
      {!partialResponse && (
        <ResponseForm
          chat={chat}
          setChat={setChat}
          setPartialResponse={setPartialResponse}
        />
      )}
    </div>
  );
}

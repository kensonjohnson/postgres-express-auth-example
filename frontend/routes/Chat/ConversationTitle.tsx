import { useState } from "react";
import { Link } from "react-router-dom";
import { EditTitle } from "./EditTitle";
import { DeleteChat } from "./DeleteChat";
import styles from "./ConversationTitle.module.css";

type ConversationTitleProps = {
  conversation: Conversation;
};

export function ConversationTitle({ conversation }: ConversationTitleProps) {
  const [editing, setEditing] = useState(false);

  return (
    <li
      onDoubleClick={() => {
        setEditing(true);
      }}
      onBlur={() => {
        setEditing(false);
      }}
      className={styles.li}
    >
      {!editing && (
        <Link to={`/chat/${conversation.id}`}>{conversation.title}</Link>
      )}
      {editing && (
        <EditTitle conversation={conversation} setEditing={setEditing} />
      )}
      <DeleteChat chatId={conversation.id} />
    </li>
  );
}

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EditTitle } from "./EditTitle";
import { DeleteChat } from "./DeleteChat";
import styles from "./ConversationTitle.module.css";

type ConversationTitleProps = {
  conversation: Conversation;
};

export function ConversationTitle({ conversation }: ConversationTitleProps) {
  const [editing, setEditing] = useState(false);
  const location = useLocation();
  const selected = location.pathname.endsWith(conversation.id.toString());

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
        <Link
          to={`/chat/${conversation.id}`}
          className={`${styles.link} ${selected ? styles.selected : ""}`}
        >
          {conversation.title}
        </Link>
      )}
      {editing && (
        <EditTitle conversation={conversation} setEditing={setEditing} />
      )}
      <DeleteChat chatId={conversation.id} />
    </li>
  );
}

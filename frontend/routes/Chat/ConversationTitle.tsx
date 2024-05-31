import { useState } from "react";
import { Link } from "react-router-dom";
import { EditTitle } from "./EditTitle";

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
    >
      {!editing && (
        <Link to={`/chat/${conversation.id}`}>{conversation.title}</Link>
      )}
      {editing && (
        <EditTitle conversation={conversation} setEditing={setEditing} />
      )}
    </li>
  );
}

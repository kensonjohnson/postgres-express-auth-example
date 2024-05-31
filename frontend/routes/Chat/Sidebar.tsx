import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { NewChat } from "./NewChat";

type SidebarProps = {
  conversations: Conversation[];
};

export function Sidebar({ conversations }: SidebarProps) {
  return (
    <aside className={styles.aside}>
      <div className={styles.title}>
        <h2 className={styles.h2}>History</h2>
        <NewChat />
      </div>
      <ul className={styles.ul}>
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <Link to={`/chat/${conversation.id}`}>{conversation.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

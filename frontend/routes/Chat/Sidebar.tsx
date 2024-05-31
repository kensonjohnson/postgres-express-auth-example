import styles from "./Sidebar.module.css";
import { NewChat } from "./NewChat";
import { ConversationTitle } from "./ConversationTitle";

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
          <ConversationTitle
            key={conversation.id}
            conversation={conversation}
          />
        ))}
      </ul>
    </aside>
  );
}

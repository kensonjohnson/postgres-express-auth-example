import styles from "./Lists.module.css";
import { v4 as uuidv4 } from "uuid";
import { AddList } from "./AddList";
import { List } from "./List";

export function Lists({ lists }: { lists: List[] }) {
  return (
    <aside className={styles.sidebar}>
      <h2>Lists</h2>
      <AddList />
      <ul className={styles.listContainer}>
        {lists
          .sort((a, b) => a.id - b.id)
          .map((list) => {
            return <List key={uuidv4()} list={list} />;
          })}
      </ul>
    </aside>
  );
}

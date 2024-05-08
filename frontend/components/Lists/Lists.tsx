import { Link, useLocation } from "react-router-dom";
import styles from "./Lists.module.css";
import { v4 as uuidv4 } from "uuid";
import { AddList } from "../../routes/AddList/AddList";

export function Lists({ lists }: { lists: List[] }) {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <h2>Lists</h2>
      <AddList />
      <ul className={styles.listContainer}>
        {lists.map((list) => {
          const selected = location.pathname.endsWith(list.id.toString());
          return (
            <Link
              key={uuidv4()}
              to={`/dashboard/${list.id}`}
              className={`${styles.link} ${selected ? styles.selected : ""}`}
            >
              {list.title}
            </Link>
          );
        })}
      </ul>
    </aside>
  );
}

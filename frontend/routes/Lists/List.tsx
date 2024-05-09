import { Link, useLocation } from "react-router-dom";
import styles from "./List.module.css";
import { DeleteList } from "./DeleteList";

export function List({ list }: { list: List }) {
  const location = useLocation();
  const selected = location.pathname.endsWith(list.id.toString());

  return (
    <li className={styles.li}>
      <Link
        to={`/dashboard/${list.id}`}
        className={`${styles.link} ${selected ? styles.selected : ""}`}
      >
        {list.title}
      </Link>
      <DeleteList list={list} />
    </li>
  );
}

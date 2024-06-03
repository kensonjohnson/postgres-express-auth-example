import { Link, useLocation } from "react-router-dom";
import styles from "./List.module.css";
import { DeleteList } from "./DeleteList";
import { useState } from "react";
import { EditTitle } from "./EditTitle";

type ListProps = {
  list: List;
};

export function List({ list }: ListProps) {
  const [editing, setEditing] = useState(false);
  const location = useLocation();
  const selected = location.pathname.endsWith(list.id.toString());

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
          to={`/todos/${list.id}`}
          className={`${styles.link} ${selected ? styles.selected : ""}`}
        >
          {list.title}
        </Link>
      )}
      {editing && <EditTitle list={list} setEditing={setEditing} />}
      <DeleteList list={list} />
    </li>
  );
}

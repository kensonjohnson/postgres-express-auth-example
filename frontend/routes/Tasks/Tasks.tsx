import { useParams } from "react-router-dom";
import { useLists } from "../Dashboard/Dashboard";
import { v4 as uuidv4 } from "uuid";
import styles from "./Tasks.module.css";

export function Tasks() {
  const lists = useLists();
  const { listId } = useParams() as { listId: string };

  const list = lists.find((list) => list.id === parseInt(listId));

  return (
    <div>
      <h2>Tasks</h2>
      <ul className={styles["tasks-container"]}>
        {list?.tasks.map((task) => (
          <li key={uuidv4()}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

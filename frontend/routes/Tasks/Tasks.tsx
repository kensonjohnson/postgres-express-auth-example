import { useParams } from "react-router-dom";
import { useLists } from "../Dashboard/Dashboard";
import styles from "./Tasks.module.css";
import { AddTask } from "./AddTask";
import { v4 as uuidV4 } from "uuid";
import { Task } from "./Task";

export function Tasks() {
  const { lists } = useLists();
  console.log("Lists in Tasks: ", lists?.length, lists);
  const { listId } = useParams() as { listId: string };
  console.log("List ID: ", listId);
  const list = lists.find((list) => {
    console.log(
      "In find: ",
      typeof list.id,
      list.id,
      typeof listId,
      parseInt(listId)
    );
    return list.id == parseInt(listId);
  }) as List;
  console.log("List: ", list);
  if (!list?.tasks || list.tasks.length === 0) {
    return (
      <div className={styles.container}>
        <h2>Tasks</h2>
        <AddTask list={list} />
        <p>No tasks yet!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Tasks</h2>
      <AddTask list={list} />
      <ul className={styles.tasks}>
        {list.tasks
          .sort((a, b) => a.id - b.id)
          .map((task) => {
            return <Task key={uuidV4()} task={task} />;
          })}
      </ul>
    </div>
  );
}

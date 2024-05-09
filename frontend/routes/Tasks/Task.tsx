import styles from "./Task.module.css";
import { Completed } from "./Completed";
import { DeleteTask } from "./DeleteTask";

type TaskProps = {
  task: Task;
};

export function Task({ task }: TaskProps) {
  return (
    <li className={styles.task}>
      <Completed task={task} />
      <div>{task.title}</div>
      <DeleteTask task={task} />
    </li>
  );
}

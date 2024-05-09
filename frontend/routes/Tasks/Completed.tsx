import {
  ActionFunctionArgs,
  Form,
  redirect,
  useSubmit,
} from "react-router-dom";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const id = formData.get("id");
    const completed = formData.get("completed") === "on";
    const response = await fetch("/task/update/completed", {
      method: "POST",
      body: JSON.stringify({ id, completed }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    const task = (await response.json()) as Task;
    return redirect(`/dashboard/${task.list_id}`);
  } catch (error) {
    console.error(error);
    return redirect(`/dashboard`);
  }
}

export function Completed({ task }: { task: Task }) {
  let completed = task.completed;
  const submit = useSubmit();

  return (
    <Form
      action="/update/task/completed"
      method="post"
      onChange={(event) => {
        submit(event.currentTarget, { method: "post" });
      }}
    >
      <input type="hidden" name="id" value={task.id} />
      <input
        type="checkbox"
        defaultChecked={completed}
        name="completed"
        aria-label={completed ? "Mark completed" : "Remove mark completed"}
      />
    </Form>
  );
}

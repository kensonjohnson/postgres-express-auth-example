import { useRef } from "react";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useSubmit,
} from "react-router-dom";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");
  const title = formData.get("title");
  const description = formData.get("description");
  if (id === null || title === null) {
    return new Response("Missing id or title", { status: 400 });
  }
  const response = await fetch(`/list/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title, description }),
  });
  if (!response.ok) {
    return new Response("Failed to edit title", { status: 500 });
  }
  return redirect(`/todos/${id}`);
}

type EditTitleProps = {
  list: List;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditTitle({ list, setEditing }: EditTitleProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();
  function handleSubmit(event: React.FocusEvent<HTMLInputElement, Element>) {
    // get title input
    const titleInput = event.target.value;
    if (titleInput === list.title) {
      setEditing(false);
      return;
    }
    submit(formRef.current!);
  }
  return (
    <Form method="put" action={`/todos/edit-title`} ref={formRef}>
      <input type="hidden" name="id" value={list.id} />
      <input type="hidden" name="description" value={list.description ?? ""} />
      <input
        autoFocus
        type="text"
        name="title"
        defaultValue={list.title}
        onBlur={handleSubmit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
      />
    </Form>
  );
}

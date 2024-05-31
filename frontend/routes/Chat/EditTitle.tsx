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
  if (id === null || title === null) {
    return new Response("Missing id or title", { status: 400 });
  }
  const response = await fetch(`/conversation/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title }),
  });
  if (!response.ok) {
    return new Response("Failed to edit title", { status: 500 });
  }
  return redirect(`/chat/${id}`);
}

type EditTitleProps = {
  conversation: Conversation;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditTitle({ conversation, setEditing }: EditTitleProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();
  function handleSubmit(event: React.FocusEvent<HTMLInputElement, Element>) {
    // get title input
    const titleInput = event.target.value;
    if (titleInput === conversation.title) {
      setEditing(false);
      return;
    }
    submit(formRef.current!);
  }
  return (
    <Form method="put" action="/chat/edit-title" ref={formRef}>
      <input type="hidden" name="id" value={conversation.id} />
      <input
        autoFocus
        type="text"
        name="title"
        defaultValue={conversation.title}
        onBlur={handleSubmit}
      />
    </Form>
  );
}

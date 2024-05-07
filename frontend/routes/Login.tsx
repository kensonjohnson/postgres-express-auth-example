import { ActionFunctionArgs, redirect } from "react-router-dom";

export async function action({ request }: ActionFunctionArgs) {
  const email = (await request.formData()).get("email") as string;

  const response = await fetch("/auth/email", {
    method: "post",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response", response);
  if (response.ok) {
    return redirect("/login/check-email");
  }
  throw new Error("There was an error logging in.");
}

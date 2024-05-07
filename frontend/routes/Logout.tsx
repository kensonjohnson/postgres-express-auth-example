import { redirect } from "react-router-dom";
import { authProvider } from "../providers/auth-provider";

export async function action() {
  await authProvider.logout();
  return redirect("/");
}

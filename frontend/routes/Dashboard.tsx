import { useRouteLoaderData, useLoaderData, redirect } from "react-router-dom";
import { authProvider } from "../providers/auth-provider";

export async function loader() {
  if (!authProvider.isAuthenticated) {
    return redirect("/");
  }
  const response = await fetch("/list");
  if (!response.ok) {
    console.log("Response not ok", response);
    return { list: [] };
  }
  const list = await response.json();
  console.log("Response ok", list);
  return { list };
}

export function Dashboard() {
  const { user } = useRouteLoaderData("root") as { user: User };
  const { list } = useLoaderData() as { list: List[] };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome{user.email}!</p>
      <ul>
        {list &&
          list.map((item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

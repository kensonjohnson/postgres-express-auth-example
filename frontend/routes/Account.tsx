import { useRouteLoaderData } from "react-router-dom";

export function Account() {
  const { user } = useRouteLoaderData("root") as { user: User };
  return (
    <div>
      <ul>
        <li>ID: {user.id}</li>
        <li>Email: {user.email}</li>
      </ul>
    </div>
  );
}

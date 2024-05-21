import { RouteObject } from "react-router-dom";
import ErrorPage from "../../error-page";

export const chatRoutes: RouteObject[] = [
  {
    path: "chat",
    element: <Chat />,
    errorElement: <ErrorPage />,
  },
];

export function Chat() {
  return <div>Chat</div>;
}

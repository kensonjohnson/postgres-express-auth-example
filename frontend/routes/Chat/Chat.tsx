import { RouteObject } from "react-router-dom";
import ErrorPage from "../../error-page";

import styles from "./Chat.module.css";
import { Sidebar } from "./Sidebar";
import { ChatWindow } from "./ChatWindow";

export const chatRoutes: RouteObject[] = [
  {
    path: "chat",
    element: <Chat />,
    errorElement: <ErrorPage />,
  },
];

export function Chat() {
  return (
    <main className={styles.main}>
      <Sidebar />
      <ChatWindow />
    </main>
  );
}

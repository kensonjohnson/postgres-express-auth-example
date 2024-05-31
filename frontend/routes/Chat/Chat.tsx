import {
  Outlet,
  RouteObject,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import ErrorPage from "../../error-page";

import styles from "./Chat.module.css";
import { Sidebar } from "./Sidebar";
import { ChatWindow, loader as chatWindowLoader } from "./ChatWindow";
import { action as newChatAction } from "./NewChat";
import { authProvider } from "../../providers/auth-provider";
import { useEffect } from "react";

async function loader() {
  await authProvider.ready;
  if (!authProvider.isAuthenticated) {
    return redirect("/");
  }

  const response = await fetch("/conversation/list");
  if (response.ok) {
    return await response.json();
  }
  return [];
}

export const chatRoutes: RouteObject[] = [
  {
    path: "chat",
    element: <Chat />,
    errorElement: <ErrorPage />,
    loader,
    action: newChatAction,
    children: [
      { path: ":chatId", element: <ChatWindow />, loader: chatWindowLoader },
    ],
  },
];

function Chat() {
  const conversations = useLoaderData() as Conversation[];
  const navigate = useNavigate();

  useEffect(() => {
    if (conversations && conversations.length > 0) {
      navigate(`/chat/${conversations[0].id}`);
    } else {
      navigate(`/chat/0`);
    }
  }, []);

  return (
    <main className={styles.main}>
      <Sidebar conversations={conversations} />
      <Outlet />
    </main>
  );
}

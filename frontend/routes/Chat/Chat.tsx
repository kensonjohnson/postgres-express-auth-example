import {
  Outlet,
  RouteObject,
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import ErrorPage from "../../error-page";

import styles from "./Chat.module.css";
import { Sidebar } from "./Sidebar";
import { ChatWindow, loader as chatWindowLoader } from "./ChatWindow";
import { action as newChatAction } from "./NewChat";
import { action as editTitleAction } from "./EditTitle";
import { action as deleteAction } from "./DeleteChat";
import { authProvider } from "../../providers/auth-provider";
import { useEffect } from "react";

export const chatRoutes: RouteObject[] = [
  {
    path: "chat",
    element: <Chat />,
    errorElement: <ErrorPage />,
    loader,
    action: newChatAction,
    children: [
      { path: ":chatId", element: <ChatWindow />, loader: chatWindowLoader },
      { path: "edit-title", action: editTitleAction },
      { path: "delete", action: deleteAction },
    ],
  },
];

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

function Chat() {
  const conversations = useLoaderData() as Conversation[];
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const { chatId } = params as { chatId: string };
    if (chatId) {
      return;
    }
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

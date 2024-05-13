import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./error-page.tsx";
import { Root, loader as rootLoader } from "./Root.tsx";
import { Index, loader as indexLoader } from "./routes/Index.tsx";
import {
  Dashboard,
  loader as dashboardLoader,
} from "./routes/Dashboard/Dashboard.tsx";
import { CheckEmail } from "./routes/CheckEmail.tsx";
import { Account } from "./routes/Account.tsx";
import { action as loginAction } from "./routes/Login.tsx";
import { action as logoutAction } from "./routes/Logout.tsx";
import { Tasks } from "./routes/Tasks/Tasks.tsx";
import { action as addListAction } from "./routes/Lists/AddList.tsx";
import { action as addTaskAction } from "./routes/Tasks/AddTask.tsx";
import { action as completeAction } from "./routes/Tasks/Completed.tsx";
import { action as deleteListAction } from "./routes/Lists/DeleteList.tsx";
import { action as deleteTaskAction } from "./routes/Tasks/DeleteTask.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    id: "root",
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index />, loader: indexLoader },
          {
            path: "dashboard",
            element: <Dashboard />,
            loader: dashboardLoader,
            children: [{ path: ":listId", element: <Tasks /> }],
          },
          { path: "login/check-email", element: <CheckEmail /> },
          { path: "account", element: <Account /> },
          { path: "login/email", action: loginAction },
          { path: "logout", action: logoutAction },
          { path: "add/list", action: addListAction },
          { path: "add/task", action: addTaskAction },
          { path: "update/task/completed", action: completeAction },
          {
            path: "delete",
            children: [
              { path: "list/:id", action: deleteListAction },
              { path: "task", action: deleteTaskAction },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

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
import { Account } from "./routes/Account.tsx";
import { todosRoutes } from "./routes/Todos/Todos.tsx";
import { authRoutes } from "./routes/Auth/Auth.tsx";

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
          },

          { path: "account", element: <Account /> },
          ...todosRoutes,
          ...authRoutes,
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

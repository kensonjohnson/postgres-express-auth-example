import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./error-page.tsx";
import { Root, loader as rootLoader } from "./Root.tsx";
import { Index } from "./routes/Index.tsx";
import { Dashboard, loader as dashboardLoader } from "./routes/Dashboard.tsx";
import { CheckEmail } from "./routes/CheckEmail.tsx";
import { Account } from "./routes/Account.tsx";
import { action as loginAction } from "./routes/Login.tsx";
import { action as logoutAction } from "./routes/Logout.tsx";

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
          { index: true, element: <Index /> },
          {
            path: "dashboard",
            element: <Dashboard />,
            loader: dashboardLoader,
          },
          { path: "login/check-email", element: <CheckEmail /> },
          { path: "account", element: <Account /> },
          { path: "login/email", action: loginAction },
          { path: "logout", action: logoutAction },
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

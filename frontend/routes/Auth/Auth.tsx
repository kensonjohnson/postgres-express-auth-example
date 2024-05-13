import { RouteObject } from "react-router-dom";
import { CheckEmail } from "./CheckEmail";
import { action as loginAction } from "./Login";
import { action as logoutAction } from "./Logout";

export const authRoutes: RouteObject[] = [
  { path: "login/check-email", element: <CheckEmail /> },
  { path: "login/email", action: loginAction },
  { path: "logout", action: logoutAction },
];

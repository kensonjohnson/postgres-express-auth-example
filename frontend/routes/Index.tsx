import { useEffect } from "react";
import { Form, useNavigate, useRouteLoaderData } from "react-router-dom";

export function Index() {
  const { user } = useRouteLoaderData("root") as { user?: User };
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <Form action="/login/email" method="post">
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <button type="submit">Login</button>
    </Form>
  );
}

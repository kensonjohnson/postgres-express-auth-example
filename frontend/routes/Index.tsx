import { useEffect } from "react";
import { Form, useNavigate, useRouteLoaderData } from "react-router-dom";
import styles from "./Index.module.css";

export function Index() {
  const { user } = useRouteLoaderData("root") as { user?: User };
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <main>
      <p className={styles.content}>
        Thank you for visiting my website! This app is a simple Todo app, that
        uses React, React Router v6, ExpressJS, PostrgreSQL, and PassportJS. Log
        in using the form below! If you don't have an account, one will be made
        for you when you click the link sent to your email address.
      </p>
      <Form action="/login/email" method="post" className={styles.form}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" />
        <button type="submit" className="button">
          Login
        </button>
      </Form>
    </main>
  );
}

import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { Logout } from "../../routes/Logout";

type HeaderProps = {
  loggedIn: boolean;
};

export function Header({ loggedIn }: HeaderProps) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${loggedIn ? styles["logged-in"] : ""}`}>
        {!loggedIn && (
          <Link
            to={"/"}
            className={`${styles.link} ${path === "/" ? styles.selected : ""}`}
          >
            Home
          </Link>
        )}
        {loggedIn && (
          <>
            <Link
              to={"/dashboard"}
              className={`${styles.link} ${
                path.includes("dashboard") ? styles.selected : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to={"/account"}
              className={`${styles.link} ${
                path.includes("account") ? styles.selected : ""
              }`}
            >
              Account
            </Link>
            <Logout />
          </>
        )}
      </nav>
    </header>
  );
}

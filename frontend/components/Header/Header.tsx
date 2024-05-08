import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { Logout } from "../../routes/Logout";

type HeaderProps = {
  loggedIn: boolean;
};

export function Header({ loggedIn }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${loggedIn ? styles["logged-in"] : ""}`}>
        {!loggedIn && <Link to={"/"}>Home</Link>}
        {loggedIn && (
          <>
            <Link to={"/dashboard"} className={styles.link}>
              Dashboard
            </Link>
            <Link to={"/account"} className={styles.link}>
              Account
            </Link>
            <Logout />
          </>
        )}
      </nav>
    </header>
  );
}

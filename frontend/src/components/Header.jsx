import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store/userSlice";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    dispatch(setCurrentUser(null));
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>Magnus</div>
      <div className={styles.logout}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Header;

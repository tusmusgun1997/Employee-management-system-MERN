import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

const Breadcrumb = () => {
  const location = useLocation();

  const paths = location.pathname.split("/").filter((path) => path !== "");
  if (paths.includes("Edit")) {
    paths.pop();
  }

  return (
    <section className={styles.contentHeader}>
      <h1>
        Employee <span>{paths[paths.length - 1]}</span>
      </h1>
      <ol className={styles.breadcrumb}>
        <li>
          <Link to="/Home/Index">
            <i className="fa fa-dashboard"></i> Home
          </Link>
        </li>
        {paths.map((path, index) => (
          <li
            key={index}
            className={index === paths.length - 1 ? "active" : ""}
          >
            {path}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Breadcrumb;

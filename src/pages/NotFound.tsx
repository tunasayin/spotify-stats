import React from "react";
import { Link } from "react-router-dom";

import styles from "../styles/NotFound.page.module.scss";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>The page you are looking for are not found.</p>
      <Link className="btn" to="/">
        Head to main page
      </Link>
    </div>
  );
};

export default NotFound;

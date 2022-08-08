import React, { FC, useContext } from "react";
import { UserContext } from "../context/User";
import { Link } from "react-router-dom";

import styles from "../styles/User.module.scss";

const User: FC = () => {
  const user = useContext(UserContext);

  if (user?.id) {
    return (
      <div className={styles.container}>
        {user?.images[0]?.url ? (
          <img
            className={styles.avatar}
            src={user?.images[0].url}
            alt="Profile"
          />
        ) : (
          <div className={styles.placeholder}>
            {user?.display_name?.slice(0, 1)}
          </div>
        )}
        <p>{user?.display_name}</p>
      </div>
    );
  } else {
    return (
      <Link to="/login" className="btn gradient">
        Login
      </Link>
    );
  }
};

export default User;

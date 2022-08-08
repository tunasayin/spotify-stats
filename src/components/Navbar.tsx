import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TbMenu2 } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";

import User from "./User";
import Logo from "../images/logo_white.png";

import styles from "../styles/Navbar.module.scss";

const Navbar: FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    if (expanded) setExpanded(false);
    else setExpanded(true);
  };

  useEffect(() => {
    if (expanded) {
      const htmlTag = document.getElementsByTagName("html").item(0);
      if (htmlTag) htmlTag.className = "scrollDisabled";
    } else {
      const htmlTag = document.getElementsByTagName("html").item(0);
      if (htmlTag) htmlTag.className = "";
    }
  }, [expanded]);

  return (
    <div
      className={`${styles.container}${expanded ? " " + styles.expanded : ""}`}
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.brand}>
            <img src={Logo} alt="Logo" />
            {expanded ? (
              <IoCloseOutline
                onClick={toggleExpand}
                className={styles.toggleIcon}
              />
            ) : (
              <TbMenu2
                onClick={toggleExpand}
                color="white"
                className={styles.toggleIcon}
              />
            )}
          </div>
          <div className={styles.links}>
            <Link to="/">Home</Link>
            <Link to="/top/tracks">Top Tracks</Link>
            <Link to="/top/artists">Top Artists</Link>
            <Link to="/top/genres">Top Genres</Link>
            <Link to="/recently-played">Recently Played</Link>
          </div>
        </div>
        <div className={styles.right}>
          <User />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

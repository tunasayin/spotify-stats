import React from "react";

import Logo from "../images/logo_white.png";

import styles from "../styles/Footer.module.scss";

interface FooterOptions {
  visible?: boolean;
}

const Footer = ({ visible = true }: FooterOptions) => {
  return (
    <div
      className={`${styles.container} ${
        visible ? styles.visible : styles.hidden
      }`}
    >
      <img className={styles.brand} src={Logo} alt="Spotify Stats" />
      <p className={styles.notice}>
        Spotify Stats, are not related with Spotify or any of it´s partners in
        any way
      </p>
    </div>
  );
};

export default Footer;

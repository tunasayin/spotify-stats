import React from "react";

import styles from "../styles/Artist.module.scss";

interface ArtistOptions {
  name: string;
  url: string;
  imageUrl: string;
}

const Artist = ({ name, url, imageUrl }: ArtistOptions) => {
  return (
    <a
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      className={styles.container}
    >
      <div className={styles.bg}>
        <img src={imageUrl} alt="Background" />
      </div>
      <div className={styles.content}>
        <img src={imageUrl} alt={name || "Artist"} />
        <p>{name}</p>
      </div>
    </a>
  );
};

export default Artist;

import React from "react";

import styles from "../styles/Genre.module.scss";

interface GenreInput {
  score: number;
  name: string;
}

const Genre = ({ score, name }: GenreInput) => {
  return (
    <div className={styles.container}>
      <div id={`${score}_genre`} className={styles.name}>
        {name}
      </div>
      <div style={{ width: `${score}0%` }} className={styles.bar}></div>
    </div>
  );
};

export default Genre;

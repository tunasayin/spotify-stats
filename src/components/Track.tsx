import React from "react";

import styles from "../styles/Track.module.scss";

interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface TrackOptions {
  name: string;
  artists: Artist[];
  imageUrl: string;
  url: string;
}

const Track = ({ name, artists, imageUrl, url }: TrackOptions) => {
  return (
    <div className={styles.container}>
      <div className={styles.bg}>
        <img src={imageUrl} alt={name || "Background"} />
      </div>
      <div className={styles.content}>
        <img src={imageUrl} alt={name || "Song"} />
        <div className={styles.songDetails}>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={url}
            className={styles.name}
          >
            {name}
          </a>
          <div className={styles.artists}>
            {artists?.map((artist, index) => {
              return (
                <a
                  key={index}
                  rel="noopener noreferrer"
                  target="_blank"
                  href={artist?.external_urls?.spotify}
                  className={styles.artist}
                >
                  {artist?.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;

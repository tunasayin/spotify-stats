import Cookies from "js-cookie";
import React, { FC, useEffect, useState } from "react";

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Track from "../components/Track";
import Footer from "../components/Footer";

import styles from "../styles/RecentlyPlayed.page.module.scss";

const TopArtists: FC = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);

  useEffect(() => {
    if (!Cookies.get("token") && process.env.NODE_ENV === "production")
      return window.location.replace("/login");

    fetchRecentlyPlayed();
  }, []);

  const fetchRecentlyPlayed = async () => {
    await setRecentlyPlayed(null);

    const data = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => null);

    if (data && data?.items) {
      setTimeout(() => {
        setRecentlyPlayed(data.items);
      }, 300);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.hero}>
        <h1>Recently Played</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.recents}>
            {recentlyPlayed === null ? (
              <Loader />
            ) : (
              (recentlyPlayed as any)?.map((recent: any, index: number) => {
                return (
                  <Track
                    name={recent.track?.name}
                    artists={recent.track?.artists}
                    imageUrl={recent.track?.album?.images[0]?.url}
                    url={recent.track?.external_urls?.spotify}
                    key={index}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      <Footer visible={recentlyPlayed === null ? false : true} />
    </div>
  );
};

export default TopArtists;

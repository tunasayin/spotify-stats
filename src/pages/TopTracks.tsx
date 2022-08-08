import React, { FC, useEffect, useState } from "react";

import Cookies from "js-cookie";

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Track from "../components/Track";
import Footer from "../components/Footer";

import styles from "../styles/TopTracks.page.module.scss";
import { useNavigate } from "react-router-dom";

const TopTracks: FC = () => {
  const [tracks, setTracks] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token") && process.env.NODE_ENV === "production")
      return navigate("/login");

    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    await setTracks(null);
    const sortSelection = document.getElementById("sortSelection");
    const value = (sortSelection as any).options[
      (sortSelection as any).selectedIndex
    ].value;

    const data = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range=${value}`,
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
        setTracks(data.items);
      }, 300);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.hero}>
        <h1>Your Top Tracks</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.sortSelector}>
            Time range:&nbsp;
            <select onChange={fetchTracks} id="sortSelection">
              <option value={"short_term"}>4 weeks</option>
              <option value={"medium_term"}>6 months</option>
              <option selected value={"long_term"}>
                all time
              </option>
            </select>
          </div>
          <div className={styles.tracks}>
            {tracks === null ? (
              <Loader />
            ) : (
              (tracks as any)?.map((track: any, index: number) => {
                return (
                  <Track
                    name={track?.name}
                    artists={track?.artists}
                    imageUrl={track?.album?.images[0]?.url}
                    url={track?.external_urls?.spotify}
                    key={index}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      <Footer visible={tracks === null ? false : true} />
    </div>
  );
};

export default TopTracks;

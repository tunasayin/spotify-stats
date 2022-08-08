import React, { FC, useEffect, useState } from "react";

import Cookies from "js-cookie";

import Artist from "../components/Artist";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import styles from "../styles/TopArtists.page.module.scss";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const TopArtists: FC = () => {
  const [artists, setArtists] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token") && process.env.NODE_ENV === "production")
      return navigate("/login");

    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    await setArtists(null);
    const sortSelection = document.getElementById("sortSelection");
    const value = (sortSelection as any).options[
      (sortSelection as any).selectedIndex
    ].value;

    const data = await fetch(
      `https://api.spotify.com/v1/me/top/artists?limit=50&offset=0&time_range=${value}`,
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
        setArtists(data.items);
      }, 300);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.hero}>
        <h1>Your Top Artists</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.sortSelector}>
            Time range:&nbsp;
            <select onChange={fetchArtists} id="sortSelection">
              <option value={"short_term"}>4 weeks</option>
              <option value={"medium_term"}>6 months</option>
              <option selected value={"long_term"}>
                all time
              </option>
            </select>
          </div>
          <div className={styles.artists}>
            {artists === null ? (
              <Loader />
            ) : (
              (artists as any)?.map((artist: any, index: number) => {
                return (
                  <Artist
                    key={index}
                    name={artist.name}
                    imageUrl={artist.images[0].url}
                    url={artist.external_urls.spotify}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      <Footer visible={artists === null ? false : true} />
    </div>
  );
};

export default TopArtists;

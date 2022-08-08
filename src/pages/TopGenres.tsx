import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Genre from "../components/Genre";
import Footer from "../components/Footer";

import styles from "../styles/TopGenres.page.module.scss";
import { useNavigate } from "react-router-dom";

const TopGenres = () => {
  const [genres, setGenres] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token") && process.env.NODE_ENV === "production")
      return navigate("/login");

    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    await setGenres(null);
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
        let genres: any[] = [];

        data.items.forEach((item) => {
          item.genres.forEach((genre) => {
            const genreFound =
              genres.filter((x) => x.id === genre).length === 0 ? false : true;

            if (genreFound) {
              for (let i = 0; i < genres.length; i++) {
                if (genres[i].id === genre) {
                  genres[i].score = genres[i].score + 1;
                }
              }
            } else {
              genres.push({
                id: genre,
                score: 1,
              });
            }
          });
        });

        let sortedGenres: any[] = [];

        for (let i = 0; i < genres.length; i++) {
          if (i === 0) {
            sortedGenres.push(genres[i]);
          } else {
            let itemPushed = false;
            for (let y = 0; y < sortedGenres.length; y++) {
              if (sortedGenres[y].score <= genres[i].score) {
                sortedGenres.splice(y, 0, genres[i]);
                itemPushed = true;
                break;
              }
            }

            if (!itemPushed) {
              sortedGenres.push(genres[i]);
            }
          }
        }

        setGenres(sortedGenres.slice(0, 10) as any);
      }, 300);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.hero}>
        <h1>Your Top Genres</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.sortSelector}>
            Time range:&nbsp;
            <select onChange={fetchGenres} id="sortSelection">
              <option value={"short_term"}>4 weeks</option>
              <option value={"medium_term"}>6 months</option>
              <option selected value={"long_term"}>
                all time
              </option>
            </select>
          </div>
          <div className={styles.genres}>
            {genres === null ? (
              <Loader />
            ) : (
              (genres as any)?.map((genre: any, index: number) => {
                return <Genre key={index} name={genre.id} score={index + 1} />;
              })
            )}
          </div>
        </div>
      </div>
      <Footer visible={genres === null ? false : true} />
    </div>
  );
};

export default TopGenres;

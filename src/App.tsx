import React, { FC, useContext, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { UserContext } from "./context/User";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import TopTracks from "./pages/TopTracks";
import TopArtists from "./pages/TopArtists";
import TopGenres from "./pages/TopGenres";
import RecentlyPlayed from "./pages/RecentlyPlayed";
import Redirect from "./pages/Redirect";
import Cookies from "js-cookie";

const App: FC = () => {
  const user = useContext(UserContext);
  const clientId = "f685a0b84ce54f2a8ef306a9a2746a70";
  const redirectUri = "https://spotifystats.tech/callback/";

  useEffect(() => {
    if (!user?.id) user?.GetUser();
    //eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top/tracks" element={<TopTracks />} />
        <Route path="/top/artists" element={<TopArtists />} />
        <Route path="/top/genres" element={<TopGenres />} />
        <Route path="/recently-played" element={<RecentlyPlayed />} />
        <Route
          path="/login"
          element={
            <Redirect
              target={`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=user-read-recently-played user-read-playback-position user-top-read`}
              wait={300}
              text="Redirecting you to Spotify"
              agressive
            />
          }
        />
        <Route
          path="/callback"
          element={
            <Redirect
              target="/"
              wait={300}
              text="Logining"
              perform={async (query, setText) => {
                const token = window.location.hash.substring(
                  window.location.hash.indexOf("=") + 1,
                  window.location.hash.indexOf("&")
                );

                if (!token) {
                  setText("An error occured, token not found");
                  return;
                } else {
                  const expiresIn = query.get("expires_in") || "";

                  Cookies.set("token", token, {
                    expires: parseInt(expiresIn) || 60 * 60 * 3,
                  });

                  return;
                }
              }}
            />
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

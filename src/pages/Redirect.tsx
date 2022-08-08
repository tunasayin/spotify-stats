import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import styles from "../styles/Redirect.page.module.scss";

interface RedirectOptions {
  target: string;
  wait: number;
  text?: string;
  agressive?: boolean;
  perform?: (
    query: URLSearchParams,
    setText: React.Dispatch<React.SetStateAction<string>>
  ) => any;
}

const Redirect = ({
  target = "/",
  wait = 1000,
  text = "Redirecting",
  agressive = false,
  perform = () => {},
}: RedirectOptions) => {
  const [displayText, setDisplayText] = useState(text || "Redirecting");
  const [query] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await perform(query, setDisplayText);

      setTimeout(() => {
        if (agressive) return window.location.replace(target);

        navigate(target);
      }, wait);
    })();

    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.main}>
        <h1>{displayText}</h1>

        <Loader />
      </div>
      <Footer />
    </div>
  );
};

export default Redirect;

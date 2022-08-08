import React, { FC } from "react";
import Footer from "../components/Footer";

import Navbar from "../components/Navbar";
import Compare from "../images/compare.svg";
import SeeYourData from "../images/see_your_data.svg";

import styles from "../styles/Home.page.module.scss";

const Home: FC = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.hero}>
        <div className={styles.innerText}>
          <h1>Your spotify stats simplfied</h1>
          <p>
            View your spotify stats instantly with ease and compare your spotify
            stats with others.
          </p>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.section}>
          <div className={styles.innerSection}>
            <div className={styles.sectionText}>
              <h2>Review your data</h2>
              <p>Review your spotify data with our eye-catching design.</p>
            </div>
            <img src={SeeYourData} alt="See Your Data" />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.innerSection}>
            <div className={styles.sectionText}>
              <h2>Compare your data</h2>
              <p>
                Compare your stats and other stuff with others on our platform.
              </p>
            </div>
            <img src={Compare} alt="See Your Data" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to JALA Academy.</h1>
      <br />
      <br />
      <br />
      <h4>
        Do you want to Learn Selenium Automation completely with Practical
        Scenarios in 7 Days?
      </h4>
      <div className={styles.infoBox}>
        <p>
          You Learn Everything by doing projects if you are very serious to get
          a software job in 60 days
        </p>
        <p>
          Contact us:{" "}
          <a
            href="http://jalatechnologies.com/contact-us.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://jalatechnologies.com/contact-us.html
          </a>
        </p>
      </div>
      <div className={styles.yellowBox}>
        <h5>For working people can double the salary in 60 Days</h5>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [showEmployeeOptions, setShowEmployeeOptions] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const toggleEmployeeOptions = () => {
    setShowEmployeeOptions((prev) => !prev);
  };

  const toggleMoreOptions = () => {
    setShowMoreOptions((prev) => !prev);
  };

  const handleCreateEmployeeClick = () => {
    navigate("/Employee/Create");
    setSelectedOption("employee");
  };

  const handleSearchEmployeeClick = () => {
    navigate("/Employee/Search");
    setSelectedOption("employee");
  };

  const handleHomeButtonClick = () => {
    navigate("/Home/Index");
    setSelectedOption("home");
  };

  const handleSettingsButtonClick = () => {
    setSelectedOption("settings");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.userContainer}>
        <i className="material-icons">account_circle</i>
        <p>Guest User</p>
      </div>
      <div
        className={`${styles.option} ${
          selectedOption === "home" ? styles.selectedOption : ""
        }`}
        onClick={handleHomeButtonClick}
      >
        <i className="material-icons">home</i> Home
      </div>
      <div
        className={`${styles.option} ${
          selectedOption === "employee" ? styles.selectedOption : ""
        }`}
        onClick={toggleEmployeeOptions}
      >
        <i className="material-icons">people</i> Employee
        {showEmployeeOptions && (
          <div className={styles.subOptions}>
            <div
              className={styles.subOption}
              onClick={handleCreateEmployeeClick}
            >
              Create
            </div>
            <div
              className={styles.subOption}
              onClick={handleSearchEmployeeClick}
            >
              Search
            </div>
          </div>
        )}
      </div>
      <div
        className={`${styles.option} ${
          selectedOption === "more" ? styles.selectedOption : ""
        }`}
        onClick={toggleMoreOptions}
      >
        <i className="material-icons">more_vert</i> More
        {showMoreOptions && (
          <div className={styles.subOptions}>
            <div className={styles.subOption}>Option 1</div>
            <div className={styles.subOption}>Option 2</div>
          </div>
        )}
      </div>
      <div
        className={`${styles.option} ${
          selectedOption === "settings" ? styles.selectedOption : ""
        }`}
        onClick={handleSettingsButtonClick}
      >
        <i className="material-icons">settings</i> Settings
      </div>
    </div>
  );
};

export default Sidebar;

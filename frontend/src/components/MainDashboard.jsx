import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import CreateEmployee from "./CreateEmployee";
import EmployeeData from "./EmployeeData";
import styles from "./MainDashboard.module.css";
import { useSelector } from "react-redux";
import EditEmployeeData from "./EditEmployeeData";

const MainDashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className={styles.mainDashboard}>
      <Header />
      <div className={styles.dashboardContent}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home/Index" element={<Home />} />
          <Route path="/Employee/Create" element={<CreateEmployee />} />{" "}
          <Route path="/Employee/Search" element={<EmployeeData />} />{" "}
          <Route path="/Employee/Edit/:id" element={<EditEmployeeData />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainDashboard;

import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import MainDashboard from "./components/MainDashboard";
import Home from "./components/Home";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeData from "./components/EmployeeData";
import "./App.css";
import EditEmployeeData from "./components/EditEmployeeData";
import { setCurrentUser } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const userData = sessionStorage.getItem("currentUser");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      dispatch(setCurrentUser(parsedUserData));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app">
        {currentUser ? (
          <MainDashboard>
            <Routes>
              <Route path="/Home/Index" element={<Home />} />
              <Route path="/Employee/Create" element={<CreateEmployee />} />
              <Route path="/Employee/Search" element={<EmployeeData />} />
              <Route path="/Employee/Edit/:id" element={<EditEmployeeData />} />
              <Route path="/*" element={<Navigate to="/Home/Index" />} />{" "}
            </Routes>
          </MainDashboard>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/*" element={<Navigate to="/" />} />{" "}
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;

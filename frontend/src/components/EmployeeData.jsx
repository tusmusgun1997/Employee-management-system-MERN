import React, { useState, useEffect, useCallback } from "react";
import { getEmployees, deleteEmployee } from "../api"; // Import the getEmployees function from the api.js file
import styles from "./EmployeeData.module.css"; // Import the CSS module for styling
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const EmployeeData = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchEmployeesData = useCallback(async () => {
    try {
      const response = await getEmployees(currentPage, name, mobile);
      setEmployees(response.employees);
      setTotalPages(response.totalPages === 0 ? 1 : response.totalPages);
      if (totalPages < currentPage) setCurrentPage(totalPages);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, [currentPage, name, mobile, totalPages]);
  useEffect(() => {
    fetchEmployeesData();
  }, [currentPage, name, mobile, fetchEmployeesData]);

  const handleSearch = async () => {
    setCurrentPage(1);
    await fetchEmployeesData();
  };

  const handleClear = async () => {
    setCurrentPage(1);
    setMobile("");
    setName("");
    await fetchEmployeesData();
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleEdit = (id) => {
    navigate(`/Employee/Edit/${id}`);
  };
  const handleDelete = (id) => {
    setShowDeleteModal(true);
    setEmployeeToDelete(id);
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteEmployee(employeeToDelete);
      await fetchEmployeesData();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  return (
    <div className={styles.container}>
      <Breadcrumb />
      <hr />
      <h2 className={styles.header}>Employee</h2>
      <div className={styles.searchContainer}>
        <div className={styles.inputContainer}>
          <label>Name:</label>
          <input
            className={styles.inputBox}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Mobile:</label>
          <input
            className={styles.inputBox}
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div>
          <button
            className={styles.searchButton}
            style={{ backgroundColor: "#00b894" }}
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className={styles.searchButton}
            style={{ backgroundColor: "#dd4b39" }}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
      {employees.length === 0 ? (
        <div className={styles.noDataMessage}>No employees found.</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Country</th>
              <th>City</th>
              <th>Skills</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNumber}</td>
                <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                <td>
                  {employee.gender === "Male" ? (
                    <i className="material-icons">man</i>
                  ) : (
                    <i className="material-icons">woman</i>
                  )}
                </td>
                <td>{employee.country}</td>
                <td>{employee.city}</td>
                <td>{employee.skills.join(", ")}</td>
                <td>
                  <button
                    onClick={() => handleEdit(employee._id)}
                    style={{
                      background: "#00b894",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Edit
                  </button>
                  <br />
                  <button
                    onClick={() => handleDelete(employee._id)}
                    style={{
                      background: "rgb(221, 51, 51)",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles.pagination}>
        <button
          onClick={handleFirstPage}
          style={{
            backgroundColor: "rgb(48, 133, 214)",
            color: "white",
            borderRadius: "5px",
          }}
          disabled={currentPage === 1}
        >
          First Page
        </button>
        <button
          onClick={handlePrevPage}
          style={{
            backgroundColor: "rgb(48, 133, 214)",
            color: "white",
            borderRadius: "5px",
          }}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span>
          <b>
            {currentPage} of {totalPages} {totalPages > 1 ? "pages" : "page"}
          </b>
        </span>
        <button
          onClick={handleNextPage}
          style={{
            backgroundColor: "rgb(48, 133, 214)",
            color: "white",
            borderRadius: "5px",
          }}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
        <button
          onClick={handleLastPage}
          style={{
            backgroundColor: "rgb(48, 133, 214)",
            color: "white",
            borderRadius: "5px",
          }}
          disabled={currentPage === totalPages}
        >
          Last Page
        </button>
      </div>
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <i className="fa fa-exclamation-circle"></i>
            <h3>Are you sure you want to delete this employee?</h3>
            <div className={styles.modalButtons}>
              <button
                onClick={handleConfirmDelete}
                style={{ background: "rgb(48, 133, 214)", color: "white" }}
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                style={{ background: "rgb(221, 51, 51)", color: "white" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeData;

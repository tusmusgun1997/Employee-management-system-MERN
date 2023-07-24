import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, editEmployee } from "../api";
import styles from "./CreateEmployee.module.css";
import Breadcrumb from "./Breadcrumb";

const EditEmployeeData = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    country: "",
    city: "",
    skills: [],
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchEmployeeData = useCallback(async () => {
    try {
      const response = await getEmployeeById(id);
      console.log(response);
      setFormData(response);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  }, [id]);
  useEffect(() => {
    fetchEmployeeData();
  }, [fetchEmployeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSkillChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: prevFormData.skills.includes(value)
        ? prevFormData.skills.filter((skill) => skill !== value)
        : [...prevFormData.skills, value],
    }));
  };
  const handleUpdate = async () => {
    try {
      await editEmployee(formData);

      setMessage("Employee details edited successfully.");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      setError(
        `Failed to edit employee. Make sure none of the fields are empty and email added is unique.`
      );

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleCancel = () => {
    navigate("/Employee/Search");
  };
  const convertToInputDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const year = dateObj.getFullYear().toString().padStart(4, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={styles.createEmployeeContainer}>
      <Breadcrumb />
      <hr />
      <h5>Employee Details</h5>
      <div className={styles.createEmployeeForm}>
        <h2>Edit Employee</h2>
        <form className={styles.formContainer}>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formField}>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formField}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <br />

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Mobile Number:</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formField}>
              <label>Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className={styles.formField}>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={convertToInputDate(formData.dateOfBirth)}
                onChange={handleChange}
              />
            </div>
          </div>
          <br />
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <br />

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formField}>
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Skills:</label>
              <div className={styles.skillsCheckboxContainer}>
                <label>
                  <input
                    type="checkbox"
                    name="skills"
                    value="AWS"
                    checked={formData.skills.includes("AWS")}
                    onChange={handleSkillChange}
                  />
                  AWS
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="skills"
                    value="DevOps"
                    checked={formData.skills.includes("DevOps")}
                    onChange={handleSkillChange}
                  />
                  DevOps
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="skills"
                    value="Full Stack Developer"
                    checked={formData.skills.includes("Full Stack Developer")}
                    onChange={handleSkillChange}
                  />
                  Full Stack Developer
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="skills"
                    value="Middleware"
                    checked={formData.skills.includes("Middleware")}
                    onChange={handleSkillChange}
                  />
                  Middleware
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="skills"
                    value="QA-Automation"
                    checked={formData.skills.includes("QA-Automation")}
                    onChange={handleSkillChange}
                  />
                  QA-Automation
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="skills"
                    value="WebServices"
                    checked={formData.skills.includes("WebServices")}
                    onChange={handleSkillChange}
                  />
                  WebServices
                </label>
              </div>
            </div>
          </div>

          <div className={styles.buttonsContainer}>
            {message && <div className={styles.successMessage}>{message}</div>}
            {error && <div className={styles.errorMessage}>{error}</div>}
            <button
              type="button"
              className={styles.saveButton}
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeData;

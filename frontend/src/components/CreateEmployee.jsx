import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateEmployee.module.css";
import { createEmployee } from "../api";
import Breadcrumb from "./Breadcrumb";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  const handleSave = async () => {
    try {
      await createEmployee(formData);

      setMessage("Employee added successfully.");
      setTimeout(() => {
        setMessage("");
      }, 5000);

      setFormData({
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
    } catch (error) {
      setError(
        `Failed to add employee. Make sure none of the fields are empty and email added is unique.`
      );

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleCancel = () => {
    navigate("/Employee/Search");
  };

  return (
    <div className={styles.createEmployeeContainer}>
      <Breadcrumb />
      <hr />
      <h5>Employee Details</h5>
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

        <hr />

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
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label>Address:</label>
            <input
              style={{
                height: "20px",
              }}
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

        <br />

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
              {/* Add other skills checkboxes here */}
            </div>
          </div>
        </div>

        <div className={styles.buttonsContainer}>
          {message && <div className={styles.successMessage}>{message}</div>}
          {error && <div className={styles.errorMessage}>{error}</div>}
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
          >
            Save
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
  );
};

export default CreateEmployee;

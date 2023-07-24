import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Function to register a new user
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// Function for user login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// Function to create a new employee
export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/employee/create`,
      employeeData
    );
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// Function to get employees with pagination and search
export const getEmployees = async (page, name, mobile) => {
  try {
    const response = await axios.get(`${BASE_URL}/employee/search`, {
      params: { page, name, mobile },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// Function to edit the details of an employee
export const editEmployee = async (employeeData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/employee/edit`,
      employeeData
    );
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// Function to delete an employee by _id
export const deleteEmployee = async (_id) => {
  try {
    const response = await axios.post(`${BASE_URL}/employee/delete`, {
      _id,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
// Function to get an employee by _id

export const getEmployeeById = async (employeeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/employee/${employeeId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

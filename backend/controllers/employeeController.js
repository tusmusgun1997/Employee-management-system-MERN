const Employee = require("../models/employeeModel");

const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      dateOfBirth,
      gender,
      address,
      country,
      city,
      skills,
    } = req.body;

    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ error: "firstName, lastName, and email are required fields" });
    }

    const newEmployee = await Employee.create({
      firstName,
      lastName,
      email,
      mobileNumber,
      dateOfBirth,
      gender,
      address,
      country,
      city,
      skills,
    });

    res.status(200).json(newEmployee);
  } catch (error) {
    console.log(error);
    if (error.code === 11000)
      res.status(500).json({ error: "Email should be unique.", code: 11000 });
    else res.status(500).json({ error: "Failed to create employee" });
  }
};
const getEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, mobile } = req.query;

    const query = {};
    if (name) {
      query.$or = [
        { firstName: { $regex: name, $options: "i" } },
        { lastName: { $regex: name, $options: "i" } },
      ];
    }
    if (mobile) {
      query.mobileNumber = { $regex: mobile, $options: "i" };
    }

    const totalEmployees = await Employee.countDocuments(query);

    const employees = await Employee.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.status(200).json({
      totalEmployees,
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / limit),
      employees,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { _id, ...updatedFields } = req.body;

    if (!_id) {
      return res
        .status(400)
        .json({ error: "_id is required to edit an employee" });
    }

    const existingEmployee = await Employee.findById(_id);

    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    Object.assign(existingEmployee, updatedFields);
    const updatedEmployee = await existingEmployee.save();

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: "Failed to edit employee" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);

    if (!_id) {
      return res
        .status(400)
        .json({ error: "_id is required to delete an employee" });
    }

    const existingEmployee = await Employee.findById(_id);

    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    await Employee.deleteOne({ _id });

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  editEmployee,
  deleteEmployee,
  getEmployeeById,
};

const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.post("/create", employeeController.createEmployee);
router.get("/search", employeeController.getEmployees);
router.post("/edit", employeeController.editEmployee);
router.post("/delete", employeeController.deleteEmployee);
router.get("/:id", employeeController.getEmployeeById);

module.exports = router;

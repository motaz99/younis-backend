const express = require('express');
const employeeControllers = require('../controllers/employeeControllers');
const isAdmin = require('../middlewares/verifyAdmin');

const router = express.Router();

router.post('/', isAdmin, employeeControllers.createEmployee);

router.get('/', employeeControllers.getAllEmployees);

router.get('/:id', employeeControllers.getEmployeeById);

router.put('/:id', isAdmin, employeeControllers.updateEmployeeById);

router.delete('/:id', isAdmin, employeeControllers.deleteEmployeeById);

module.exports = router;

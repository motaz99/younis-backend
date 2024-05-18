const Employee = require('../models/Employee');

const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, age } = req.body;
    const newEmployee = await Employee.create({
      firstName,
      lastName,
      email,
      age,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (page - 1) * limit;

    const searchQuery = search
      ? {
          $or: [
            { firstName: { $regex: new RegExp(search, 'i') } },
            { lastName: { $regex: new RegExp(search, 'i') } },
            { position: { $regex: new RegExp(search, 'i') } },
          ],
        }
      : {};

    const employees = await Employee.find(searchQuery)
      .skip(skip)
      .limit(parseInt(limit));

    const totalEmployees = await Employee.countDocuments(searchQuery);

    res.status(200).json({
      employees,
      currentPage: page * 1,
      totalPages: Math.ceil(totalEmployees / limit),
      totalEmployees,
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, age } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { firstName, lastName, email, age },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};

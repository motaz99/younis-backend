const express = require('express');
const authRoutes = require('./authRoutes');
const employeesRoutes = require('./employeesRouts');
const routes = express.Router();
const verifyUser = require('../middlewares/verifyUser');

routes.use('/auth', authRoutes);
routes.use('/employees', verifyUser, employeesRoutes);

module.exports = routes;

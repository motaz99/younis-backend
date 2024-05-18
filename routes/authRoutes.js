const express = require('express');

const routes = express.Router();
const auth = require('../controllers/authControllers');

routes.post('/login/v1', auth.login);
routes.post('/signup/v1', auth.signup);
routes.post('/logout/v1', auth.logout);

module.exports = routes;

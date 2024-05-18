const jwt = require('jsonwebtoken');
require('dotenv').config();

const decodeJwtToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  return decodedToken;
};

module.exports = decodeJwtToken;

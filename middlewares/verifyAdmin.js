const jwt = require('jsonwebtoken');
const decodeJwtToken = require('../helpers/decodeJwtToken');

const isAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    const decodedToken = decodeJwtToken(token);
    if (decodedToken.role === 'admin') {
      next();
    } else {
      throw new Error('Wrong role');
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = isAdmin;

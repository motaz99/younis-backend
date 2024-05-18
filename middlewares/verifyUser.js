const jwt = require('jsonwebtoken');

// const jwtChecker = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (!token) {
//     res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token', error });
//   }
// };

const jwtChecker = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = jwtChecker;

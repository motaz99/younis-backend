const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '14d' }
  );

  return token;
};

module.exports = generateToken;

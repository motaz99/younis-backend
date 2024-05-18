const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../helpers/generateToken');
const decodeJwtToken = require('../helpers/decodeJwtToken');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const jwtToken = req.cookies.jwt;
    if (jwtToken) {
      const decodedToken = decodeJwtToken(jwtToken);
      throw new Error(
        `User already logged in using '${decodedToken.username}' username`
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    });

    res.json({ message: 'Logged in successfully', token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      throw new Error('username is already registered');
    }

    if (!password) {
      throw new Error('Need to set a password');
    }

    // checking if the password valid
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
      role: role || 'admin',
    });
    res.status(201).json({
      message: 'You have signed up successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie('jwt');
  res.send('Logged out successfully');
};

module.exports = {
  login,
  signup,
  logout,
};

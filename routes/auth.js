const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  validateRegistrationData,
  validateLoginData
} = require('../validation');

router.post('/register', async (req, res) => {
  // Validate Registration Data
  const { error } = validateRegistrationData(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send('This email is already registered');
  }

  // Encrypt password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  // Validdate login data
  const { error } = validateLoginData(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Email or password is invalid');
  }

  // Check if password is valid
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(400).send('Email or password is invalid');
  }

  // Generate token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;

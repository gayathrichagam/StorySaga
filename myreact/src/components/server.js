// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const User = require('./mongo');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/userAuth', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({ name, email, password: hashedPassword });

//   try {
//     await newUser.save();
//     res.status(201).send('User registered');
//   } catch (error) {
//     res.status(500).send('Error registering user');
//   }
// });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(400).send('User not found');
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     return res.status(400).send('Invalid credentials');
//   }

//   const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
//     expiresIn: '1h',
//   });

//   res.status(200).json({ token });
// });

// // Forgot Password Route
// app.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(400).send('User not found');
//   }

//   const resetToken = crypto.randomBytes(32).toString('hex');
//   user.resetPasswordToken = resetToken;
//   user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//   await user.save();

//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     }
//   });

//   const mailOptions = {
//     to: user.email,
//     from: process.env.EMAIL_USER,
//     subject: 'Password Reset',
//     text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//            Please click on the following link, or paste this into your browser to complete the process:\n\n
//            http://localhost:3000/reset-password/${resetToken}\n\n
//            If you did not request this, please ignore this email and your password will remain unchanged.\n`
//   };

//   transporter.sendMail(mailOptions, (err, response) => {
//     if (err) {
//       console.error('Error sending email:', err);
//       return res.status(500).send('Error sending email');
//     }
//     res.send('Password reset link sent');
//   });
// });

// // Reset Password Route
// app.post('/reset-password/:token', async (req, res) => {
//   const user = await User.findOne({
//     resetPasswordToken: req.params.token,
//     resetPasswordExpires: { $gt: Date.now() }
//   });

//   if (!user) {
//     return res.status(400).send('Password reset token is invalid or has expired');
//   }

//   const hashedPassword = await bcrypt.hash(req.body.password, 10);
//   user.password = hashedPassword;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpires = undefined;
//   await user.save();

//   res.send('Password has been reset');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('./mongo');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/userAuth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
});

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send('User not found');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: 'Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           http://localhost:3000/reset-password/${resetToken}\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error('Error sending email:', err);
      return res.status(500).send('Error sending email');
    }
    res.send('Password reset link sent');
  });
});

app.post('/reset-password/:token', async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).send('Password reset token is invalid or has expired');
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.send('Password has been reset');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

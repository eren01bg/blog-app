const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

exports.registerUser = async (req, res) => {
  try {

    const {firstName, lastName, email, image, password, password2} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      image,
      password: hashedPassword,
    });

    await newUser.save();

    
    const token = jwt.sign({userId: `${newUser._id}`}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginUser = async (req, res) => {


  try {

    const email = req.body.email;

    const user = User.findOne({email: email});

    if(user) {

      const token = jwt.sign({userId: `${user._id}`}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});

      res.status(200).json({ message: 'User logged in successfully', token });

    } else {

      res.status(401).json({ message: 'The email and password you entered did not match our records. Please double-check and try again.' });

    }

  } catch (err) {

    console.error(err);

    res.status(500).json({ message: 'Internal server error' });

  }
};


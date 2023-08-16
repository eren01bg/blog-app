const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

exports.registerUser = async (req, res) => {
  try {

    const {firstName, lastName, email, biography, image, password, password2} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      biography,
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

    const user = await User.findOne({email: email});

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

exports.getUser = async (req, res) => {

  const userId = req.params.id;

  try {

    const user = await User.findById(userId);

    if(!user) {
        
      res.status(404).json({ message: 'User not found' });
  
    }

    res.status(200).json(user);

  } catch (err) {

    console.error(err);

    res.status(500).json({ message: 'Internal server error' });

  }

};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, biography, image } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        biography: biography,
        image: image
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: updatedUser });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


    



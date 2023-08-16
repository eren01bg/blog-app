const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function validateRegistration(req, res, next) {
  const { firstName, lastName, email, image, password, password2 } = req.body;

  const errors = [];

  if (!firstName) {
    errors.push('First name is required');
  }

  if (!lastName) {
    errors.push('Last name is required');
  }

  if (!email) {
    errors.push('Email is required');
  } else if (!email.includes('@')) {
    errors.push('Email is invalid');
  }

  if (!image) {
    errors.push('Image is required');
  } else if (!image.includes('http') || !image.includes('https')) {
    errors.push('Image must be a valid URL');
  }


  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (!password2) {
    errors.push('Password confirmation is required');
  } else if (password !== password2) {
    errors.push('Passwords must match');
  }


  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

   // Check if the user already exists based on email
   User.findOne({ email }).then(existingUser => {
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    next();
  });
}

async function validateLogin(req, res, next) {

  const { email, password } = req.body;

  const errors = [];

  if (!email) {
    errors.push('Email is required');
  } else if (!email.includes('@')) {
    errors.push('Email is invalid');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
   return res.status(400).json({ errors });
  }

  // check if user exists, if not, return error, if so, compare passwords

  const userExists = await User.findOne({ email: email });

  if(userExists) {

    const passwordsMatch = await bcrypt.compare(password, userExists.password);

    if(passwordsMatch) {
      next();
    } else {
      return res.status(400).json({ message: 'The email and password you entered did not match our records. Please double-check and try again.' });
    }

  } else {

    return res.status(400).json({ message: 'The email and password you entered did not match our records. Please double-check and try again.' });

  }

}

async function validateCreatePost(req, res, next) {

  const {title, content, image, category} = req.body;

  const errors = [];

  if (!title) {
    errors.push({ message: 'Title is required' });
  }

  if (!content) {
    errors.push({ message: 'Content is required' });
  }

  if (!image) {
    errors.push({ message: 'Image is required' });
  } else if (!image.includes('http') || !image.includes('https')) {
    errors.push({ message: 'Image must be a valid URL' });
  }

  if (!category) {
    errors.push({ message: 'Category is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();

}

async function validateToken (req, res, next) {

  let token = req.header('Authorization');
  token = token.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

};

module.exports = {
  validateRegistration,
  validateLogin,
  validateCreatePost,
  validateToken
};

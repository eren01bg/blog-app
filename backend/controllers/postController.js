const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/post'); 

exports.createPost = async (req, res, next) => {

    const {title, content, image, category} = req.body;

    const token = req.header('Authorization').split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.userId;

    const post = new Post({
        title: title,
        content: content,
        category: category,
        image: image,
        author: userId
    });

    try {

        await post.save();
        res.status(201).json({message: 'Post created successfully'});

    } catch (error) {

        res.status(400).json({error});

    }


}

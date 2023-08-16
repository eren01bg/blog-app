const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');

exports.createPost = async (req, res, next) => {

    const { title, content, image, category } = req.body;

    let token = req.header('Authorization');
    token = token.split('Bearer ')[1];
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
        res.status(201).json({ message: 'Post created successfully' });

    } catch (error) {

        res.status(400).json({ error });

    }


}

exports.getPostById = async (req, res, next) => {

    const id = req.params.id;

    try {

        const post = await Post.findById(id).populate('category').populate('author', '-password');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (!post.author.image) {
            post.author.image = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
        }

        // replaces all new lines with <br />
        post.content = post.content.replace(/\r?\n/g, '<br />');
        // replaces all <br /><br /> with </p><p>
        post.content = post.content.replace(/<br \/><br \/>/g, '</p><p>');

        res.status(200).json(post);

    } catch (error) {

        res.status(400).json({ error });

    }

}

exports.getPostsByAuthorId = async (req, res, next) => {

    const authorId = req.params.id;
    const limit = req.query.limit;


    try {

        const posts = await Post.find({ author: authorId }).populate('category').populate('author', '-password').limit(parseInt(limit));

        if (!posts) {

            return res.status(404).json({ message: 'Posts not found' });

        }

        for (let i = 0; i < posts.length; i++) {

            if (!posts[i].author.image) {

                posts[i].author.image = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

            }

        }

        res.status(200).json(posts);

    } catch (error) {

        res.status(400).json({ error });

    }
}

exports.getPosts = async (req, res, next) => {

    const limit = req.query.limit;

    try {

        // populate category and author
        const posts = await Post.find().populate('category').populate('author', '-password').limit(parseInt(limit));

        for (let i = 0; i < posts.length; i++) {
            if (!posts[i].author.image) {
                posts[i].author.image = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
            }
        }


        res.status(200).json(posts);

    } catch (error) {

        res.status(400).json({ error });

    }

}

exports.getLatestPost = async (req, res, next) => {

    try {

        const posts = await Post.find().populate('category').populate('author', '-password').limit(1);

        for (let i = 0; i < posts.length; i++) {
            if (!posts[i].author.image) {
                posts[i].author.image = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
            }
        }

        res.status(200).json(posts[0]);

    } catch (error) {

        res.status(400).json({ error });

    }

}

exports.getPostsByCategory = async (req, res, next) => {

    const categoryId = req.params.id;
    const limit = req.query.limit;


    try {

        const posts = await Post.find({ category: categoryId }).populate('category').populate('author', '-password').limit(parseInt(limit));

        if (!posts) {

            return res.status(404).json({ message: 'Posts not found' });

        }

        for (let i = 0; i < posts.length; i++) {

            if (!posts[i].author.image) {

                posts[i].author.image = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

            }

        }

        res.status(200).json(posts);

    } catch (error) {

        res.status(400).json({ error });

    }

}

exports.getPostsByAuthor = async (req, res, next) => {

    const authorId = req.params.id;
    const limit = req.query.limit;

    try {

        const posts = await Post.find({ author: authorId }).populate('category').populate('author', '-password').limit(parseInt(limit));

        if (!posts) {

            return res.status(404).json({ message: 'Posts not found' });

        }

        for (let i = 0; i < posts.length; i++) {

            if (!posts[i].author.image) {

                posts[i].author.image = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
            }

        }

        res.status(200).json(posts);



    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }

};

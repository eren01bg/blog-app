const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const validationMiddleware = require('../middlewares/validationMiddleware');


router.post('/', validationMiddleware.validateCreatePost, validationMiddleware.validateToken, postController.createPost);
router.put('/:id', validationMiddleware.validateCreatePost, validationMiddleware.validateToken, postController.updatePost);
router.delete('/:id', validationMiddleware.validateToken, postController.deletePost);

router.get('/search', postController.searchPosts);
router.get('/', postController.getPosts);
router.get('/latest', postController.getLatestPost);
router.get('/:id', postController.getPostById);
router.get('/author/:id', postController.getPostsByAuthor);
router.get('/category/:id', postController.getPostsByCategory);


module.exports = router;

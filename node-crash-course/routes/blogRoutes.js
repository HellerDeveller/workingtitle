const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

//blog routes (see home page), also sorts them by newest
router.get('/', blogController.blog_index);

//make your blogs come true WOOOO (also check middleware, it requires
//router.use(express.urlencoded({ extended: true })); to work properly)
router.post('/', blogController.blog_create_post);

//create blogs EJS STYLE!!!
router.get('/create', blogController.blog_create_get);

router.get('/:id', blogController.blog_details);

//deleting your own hard work (blogs)
router.delete('/:id', blogController.blog_delete);


module.exports = router;
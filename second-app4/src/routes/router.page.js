import express  from 'express';
var router = express.Router();
import PostModel from '../models/post';
import marked from 'marked';
import config from '../config';
import * as auth from '../middlewares/auth';

import * as page from '../controllers/page';




/* GET Home Page. */
router.get('/', page.indexPage);


/* GET posts Page. */

router.get('/posts', page.postsPage);

/* GET posts create Page. */
router.get('/posts/create',auth.adminRequired,page.createPage);


/* GET Posts show Page */

router.get('/posts/show', page.postIdPage);


/* GET Posts edit Page */
router.get('/posts/edit', page.editPage);


/* GET signup page . */
router.get('/signup', page.signupPage);


/* GET signin page . */

router.get('/signin',page.signinPage);


/* GET signout */

router.get('/signout', page.signoutPage);



export default router;

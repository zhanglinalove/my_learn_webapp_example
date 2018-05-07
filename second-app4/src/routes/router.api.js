import  express from 'express';
var router = express.Router();
import PostModel from '../models/post';
import UserModel from '../models/user';
import bcrypt    from 'bcrypt';
import config    from '../config';
import * as auth from '../middlewares/auth';
import  jwt from 'jwt-simple';
import moment from 'moment';
import * as user from '../controllers/user';
import * as postc from '../controllers/post';


/* GET users Lists. */
router.get('/users', user.userInfo);


/* Get posts Lists */

router.get('/posts', postc.selectAll);


/* Post posts Lists */

router.post('/posts',auth.adminRequired, postc.create);

/* get one post*/
router.get('/posts/:id',postc.selectOne);

/* Patch edit post */
router.patch('/posts/:id',auth.adminRequired,postc.update);


/* Post signup user */

router.post('/signup', user.signup);

/* Post signin user */

router.post('/signin',user.signin);



export default router;

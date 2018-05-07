import express  from 'express';
var router = express.Router();
import PostModel from '../models/post';
import marked from 'marked';
import config from '../config';
import * as auth from '../middlewares/auth';




/* GET Home Page. */
router.get('/', function(req, res, next) {
  res.render ( 'index');
});


/* GET posts Page. */

router.get('/posts', function(req , res , next ){
  res.render ('posts', { title: '我的文章'});

});

/* GET posts create Page. */
router.get('/posts/create',auth.adminRequired,function(req ,res ,next){
  res.render('create');
});


/* GET Posts show Page */

router.get('/posts/show', function( req, res ,next){
  var id = req.query.id;
  PostModel.findOne({ _id: id },function( err, post){
    post.mkContent = marked(post.content);
    res.render('show', { post });
  });
});


/* GET Posts edit Page */
router.get('/posts/edit', function( req ,res , next){
  var id = req.query.id;
  res.render('edit', { id });
});


/* GET signup page . */
router.get('/signup', function(req ,res , next){
  res.render('signup');

});


/* GET signin page . */

router.get('/signin', function(req ,res , next){
  res.render('signin');

});


/* GET signout */

router.get('/signout', function (req, res, next) {
  req.user = null;
  res.clearCookie(config.cookieName, { path: '/' });
  res.redirect('/');
});



export default router;

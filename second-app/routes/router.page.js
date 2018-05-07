var express = require('express');
var router = express.Router();
var PostModel =require('../models/post');
var marked =require('marked');

/* GET Home Page. */
router.get('/', function(req, res, next) {
  res.render ( 'index',{title : 'Express'});
});


/* GET posts Page. */

router.get('/posts', function(req , res , next ){
  res.render ('posts', { title: 'posts'});

});

/* GET posts create Page. */
router.get('/posts/create',function(req ,res ,next){
  res.render('create');
});


/* GET Posts show Page */

router.get('/posts/show', function( req, res ,next){
  var id = req.query.id;
  PostModel.findOne({ _id: id },function( err, post){
    post.content = marked(post.content);
    res.render('show', { post });
  });
});


/* GET Posts edit Page */
router.get('/posts/edit', function( req ,res , next){
  var id = req.query.id;
  res.render('edit', { id });
});


module.exports = router;

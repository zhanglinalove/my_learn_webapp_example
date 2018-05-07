var express = require('express');
var router = express.Router();
var PostModel = require('../models/post');

/* GET users Lists. */
router.get('/', function(req, res, next) {
  res.send('Respond with a Users!');
});


/* Get posts Lists */

router.get('/posts', function( req, res ,next){

  PostModel.find( {}, {},function(err,posts){
    if(err){
      res.json({success : false});
      return;
    }
    res.json({ success:true,postsList: posts});

  })
});


/* Post posts Lists */

router.post('/posts/create', function( req, res ,next){
  var  title = req.body.title;
  var content = req.body.content;

  var  post = new PostModel();
  post.title =title;
  post.content = content;
  post.save(function (err, doc){
    res.json({success:true});
  });
  
  //res.send({ title,content }); //收到数据后，把数据返回给了请求方


});

/* get one post*/
router.get('/posts/one',function(req ,res , next){
  var id = req.query.id;
  PostModel.findOne ({_id :id }, function( err, post){
    if(err){
      res.json ({ success: false});
      return;
    }

    res.json ({ success : true, post});

  });

});

/* Patch edit post */
router.post('/posts/edit', function( req ,res ,next){

  var  id = req.body.id;
  var title =req.body.title;
  var content = req.body.content;

  PostModel.findOneAndUpdate({_id : id },{ title ,content}, function(err){
      if (err){
        res.json({ success : false});
      } else{
        res.json({ success : true});
      }

  });

});




module.exports = router;

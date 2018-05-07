var express = require('express');
var router = express.Router();
var PostModel = require('../models/post');
var UserModel = require('../models/user');
var bcrypt = require('bcrypt');
var config = require('../config');
var auth = require('../middlewares/auth');

/* GET users Lists. */
router.get('/api/v1/users', function(req, res, next) {
  res.send('Respond with a Users!');
});


/* Get posts Lists */

router.get('/posts', function( req, res ,next){

  PostModel.find( {}, {},function(err,posts){
    if(err){
       next(err);
    } else{

      res.json({ success:true,postsList: posts});
    }
    

  })
});


/* Post posts Lists */

router.post('/posts',auth.adminRequired, function( req, res ,next){
  var  title = req.body.title;
  var content = req.body.content;

  console.log(title);
  var  post = new PostModel();
  post.title =title;
  post.content = content;
  post.authorId = res.locals.currentUser._id;
  post.save(function (err, doc){
    if(err){
      next(err);
    } else{
      res.json({ post:doc });
    }
    
  });
  
  //res.send({ title,content }); //收到数据后，把数据返回给了请求方


});

/* get one post*/
router.get('/posts/:id',function(req ,res , next){
  var id = req.query.id;
  PostModel.findOne ({_id :id }, function( err, post){
    if(err){
      next(err);
    } else{
      res.json ({ success : true, post});
    }
  });

});

/* Patch edit post */
router.patch('/posts/:id',auth.adminRequired, function( req ,res ,next){

  var  id = req.params.id;
  var title =req.body.title;
  var content = req.body.content;

  PostModel.findOneAndUpdate({_id : id },{ title ,content}, function(err){
      if (err){
        next(err);
      } else{
        res.json({ success : true});
      }

  });

});


/* Post signup user */

router.post('/signup', function(req ,res ,next){
  var name = req.body.name;
  var pass = req.body.pass;
  var rePass = req.body.rePass;
  console.log(pass);
  if( pass !== rePass){
    return next( new Error('两次密码不对'));
  }

  console.log('你好棒啊！');


  var user = new UserModel();
  user.name = name ;
  console.log(user.name);
  user.pass = bcrypt.hashSync(pass,10);
  console.log(bcrypt.hashSync('111111',10));
  //console.log(bcrypt.gensalt('11111'));

  console.log(user.pass);
  user.save ( function(err){
    if(err){
      next(err);
    }else{
      console.log('程序执行结果了啊');
      res.end();
    }
  });
});

/* Post signin user */

router.post('/signin',function( req ,res ,next){
  var  name = req.body.name || '';
  var  pass = req.body.pass || '';

  UserModel.findOne( {name},function (err, user){
    if( err || !user){
      return next( new Error('找不到用户'));
    } else{
      var isOK = bcrypt.compareSync( pass ,user.pass);
      if(!isOK){
        return next(new Error('密码不对'));
      }

      var authToken = user._id ;
      var opts ={
        path :'/',
        maxAge : 1000 * 60 * 60 * 24 * 30 ,
        signed : true,
        httpOnly : true

      };

      res.cookie( config.cookieName ,authToken ,opts);
      res.end();
    }
  });

});



module.exports = router;

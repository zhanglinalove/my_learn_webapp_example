import express  from 'express';
import PostModel from '../models/post';
  
  
  /* Get posts Lists */
  
  export const selectAll = function( req, res ,next){
  
    PostModel.find( {}, {},function(err,posts){
      if(err){
         next(err);
      } else{
  
        res.json({ success:true,postsList: posts});
      }
    })
  };
  
  
  /* Post posts Lists */
  
  export const create = function( req, res ,next){
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
  
  
  };
  
  /* get one post*/
  export const selectOne = function(req ,res , next){
    var id = req.query.id;
    PostModel.findOne ({_id :id }, function( err, post){
      if(err){
        next(err);
      } else{
        res.json ({ success : true, post});
      }
    });
  
  };
  
  /* Patch edit post */
  export const update =  function( req ,res ,next){
  
    var id = req.params.id;
    var title =req.body.title;
    var content = req.body.content;
  
    PostModel.findOneAndUpdate({_id : id },{ title ,content}, function(err){
        if (err){
          next(err);
        } else{
          res.json({ success : true});
        }
  
    });
  };
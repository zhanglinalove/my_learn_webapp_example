import express  from 'express';
import PostModel from '../models/post';
import marked from 'marked';
import config from '../config';
import * as auth from '../middlewares/auth';
import * as page from '../controllers/page';

/* GET Home Page. */
export const indexPage = function(req, res, next) {
    res.render ('index');
  }
  
  
  /* GET posts Page. */
  
  export const postsPage = function(req , res , next ){
    res.render ('posts', { title: '我的文章'});
  
  };
  
  /* GET posts create Page. */
  export const createPage = function(req ,res ,next){
    res.render('create');
  };
  
  
  /* GET Posts show Page */
  
  export const postIdPage = function( req, res ,next){
    var id = req.query.id;
    PostModel.findOne({ _id: id },function( err, post){
      post.mkContent = marked(post.content);
      res.render('show', { post });
    });
  };
  
  
  /* GET Posts edit Page */
  export const editPage = function( req ,res , next){
    var id = req.query.id;
    res.render('edit', { id });
  };
  
  
  /* GET signup page . */
  export const signupPage = function(req ,res , next){
    res.render('signup');
  
  };
  
  
  /* GET signin page . */
  
  export const signinPage =  function(req ,res , next){
    res.render('signin');
  
  };
  
  
  /* GET signout */
  
  export const signoutPage =  function (req, res, next) {
    req.user = null;
    res.clearCookie(config.cookieName, { path: '/' });
    res.redirect('/');
  };
  
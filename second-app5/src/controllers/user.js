import express  from 'express';
import UserModel from '../models/user';
import bcrypt    from 'bcrypt';
import config    from '../config';
import * as auth from '../middlewares/auth';
import  jwt from 'jwt-simple';
import moment from 'moment';
import { sendActiveMail } from '../common/mail';
import utility from 'utility';

/* GET users Lists. */
export const userInfo = function(req, res, next) {
    res.send('Respond with a Users!');
};
  
  /* Post signup user */
  
  export const signup = function(req ,res ,next){
    const { name , email ,pass ,rePass } = req.body;
    console.log(pass);
    if( pass !== rePass){
      return next( new Error('两次密码不对'));
    }
  
    console.log('你好棒啊！');
  
  
    var user = new UserModel();
    user.name = name ;
    user.email = email;
    user.pass = bcrypt.hashSync(pass,10);
  
    console.log(user.pass);
    user.save ( function(err){
      if(err){
        next(err);
      }else{
        sendActiveMail(
          email,
          utility.md5( user.email + user.pass),
          name
        );

        res.json({
          message :`欢迎加入${
            config.name
          }! 我们已给您的注册邮件发送了一封邮件，请点击里面的连接来激活你的账号！`
        });

        console.log('注册于发送邮件成功！');
        
      }
    });
  };
  
  /* Post signin user */
  
 export const signin =function( req ,res ,next){
    // var  name = req.body.name || '';
    // var  pass = req.body.pass || '';
    const { name , pass} = req.body;
  
    UserModel.findOne( {name},function (err, user){
      if( err || !user){
        return next( new Error('找不到用户'));
      } else{
        const isOK = bcrypt.compareSync( pass ,user.pass);
        if(!isOK){
          return next(new Error('密码不对'));
        }
  
        // var authToken = user._id ;
        //生产token
        const token = jwt.encode (
          {
            _id : user._id,
            name: user.name,
            isAdmin : user.name === config.admin ? true :false,
            exp: moment().add('days',30).valueOf()
          },
          config.jwtSecret
        
        );
  
        const opts ={
          path :'/',
          maxAge : moment().add('days',30).valueOf(),
          signed : true,
          httpOnly : true
  
        };
  
        res.cookie( config.cookieName ,token ,opts);
        res.json({ token });
      }
    });
  
  };


  export const activeAccount = function (req, res, next) {
    const { key, name } = req.query;
  
    UserModel.findOne({ name }, function (err, user) {
      if (err || !user) {
        return next(new Error('找不到用户'));
      } else {
  
        const key2 = utility.md5(user.email + user.pass);
        if (key !== key2) {
          return next(new Error('激活失败'));
        }
  
        user.active = true;
        user.save();
  
        const token = jwt.encode(
          {
            _id: user._id,
            name: user.name,
            isAdmin: user.name === config.admin,
            active: user.active,
            exp: moment()
              .add('days', 30)
              .valueOf()
          },
          config.jwtSecret
        );
  
        const opts = {
          path: '/',
          maxAge: moment()
            .add('days', 30)
            .valueOf(),
          signed: true,
          httpOnly: true
        };
  
        res.cookie(config.cookieName, token, opts);
        res.send('active successed!');
      }
    });
  };
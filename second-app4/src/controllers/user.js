import express  from 'express';
import UserModel from '../models/user';
import bcrypt    from 'bcrypt';
import config    from '../config';
import * as auth from '../middlewares/auth';
import  jwt from 'jwt-simple';
import moment from 'moment';

/* GET users Lists. */
export const userInfo = function(req, res, next) {
    res.send('Respond with a Users!');
};
  
  /* Post signup user */
  
  export const signup = function(req ,res ,next){
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
        var isOK = bcrypt.compareSync( pass ,user.pass);
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
  
        var opts ={
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
  
export default  {
    cookieName : 'your_cookie_name',
    jwtSecret: 'your_jwt_secret',
    mongodbUrl: 'mongodb://localhost:32768/second-app',
    admin: 'admin',
    sessionSecret: 'your_session_secret',
    email:{
        host:'smtp.163.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth:{
            user :'xx@163.com',
            pass :'password'        
            }
        },
    name :'我的社区',
    url: 'localhost:'+ '3000'
   
}

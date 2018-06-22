var express = require('express');
var router = express.Router();
//后台用户登录页
router.get('/user',function(req,res,next){
   // res.send('amind-User');
   console.log(req.userInfo._id);
   res.render('main/user',{
       userInfo:req.userInfo
   });
})

//欢迎页
router.get('/welcome',function(req,res,next){
    // res.send('amind-User');
    //console.log(req.userInfo._id);
    res.render('main/welcome',{
        userInfo:req.userInfo
    });
 })

module.exports = router;
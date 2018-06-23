var express = require('express');
var router = express.Router();
var User = require('../models/User');

//后台用户登录页
router.get('/user',function(req,res,next){
   // res.send('amind-User');
   console.log(req.userInfo);
  return res.render('main/user',{
       userInfo:req.userInfo
   });
})

//欢迎页
router.get('/welcome',function(req,res,next){
    // res.send('amind-User');
    //console.log(req.userInfo._id);
    return res.render('main/welcome',{
        userInfo:req.userInfo
    });
 })

 //管理员列表
router.get('/admin_list',function(req,res,next){
      
   
    // var user = {};
    User.find().then(function(info){
        res.render('main/admin-list', {
            userInfo:req.userInfo,
            username:info
        })
    }).catch(function(e){
        console.log("e:"+e)
    })

})



module.exports = router;
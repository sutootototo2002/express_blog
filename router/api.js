// 注册逻辑
//1、用户名不能为空
//2、密码不能为空
//3、两次输入密码必须一致


var express = require('express');
var router = express.Router();
var User = require('../models/User');
var md5 = require('md5-node');
//统一返回格式
var responseData;
router.use(function (req,res,next) {
    responseData = {
        code: 0,
        message: ''
    }
    next();
})
router.post('/user/register', function (req, res, next) {

    console.log(req.body);
    //注册逻辑 用户名是否为空
    var username = req.body.username;
    var password = req.body.password;
    if (username === "") {
        responseData.code = 1;
        responseData.message = "用户名不能为空";
        res.json(responseData);
        return;

    }
    if (password === "") {
        responseData.code = 1;
        responseData.message = "密码不能为空";
        res.json(responseData);
        return;
    }

    User.findOne({
        username:username
    }).then(function(userInfo){
        console.log(userInfo);
        if(userInfo){
            responseData.code = 4;
           responseData.message = "用户名已经被注册";
           res.json(responseData);
           return;
        }
        var user = new User({
            username:username,
            password:md5(password)
        });
        return user.save();
    }).then(function(newUserInfo){
        console.log(newUserInfo);
        responseData.code = 0;
        responseData.message = "注册成功";
        res.json(responseData);
    })
})

module.exports = router;
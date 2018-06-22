// 注册逻辑
//1、用户名不能为空
//2、密码不能为空
//3、两次输入密码必须一致


var express = require('express');
var router = express.Router();
var User = require('../models/User');
var md5 = require('md5-node');


const SMSClient = require('@alicloud/sms-sdk');

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIYOpGiICKbOec'
const secretAccessKey = 'v4JhYPfyMFiqyockxJwRt3VRXCS8A3'
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})



//统一返回格式
var responseData;
router.use(function (req,res,next) {
    responseData = {
        code: 0,
        message: ''
    }
    return next();
})
router.post('/user/register', function (req, res, next) {

    console.log(req.body);
    //注册逻辑 用户名是否为空
    var username = req.body.username;
    var password = req.body.password;
    var phone = req.body.phone;
    if (username === "") {
        responseData.code = 1;
        responseData.message = "用户名不能为空";
        return res.json(responseData);
    }
    if (password === "") {
        responseData.code = 1;
        responseData.message = "密码不能为空";
        return res.json(responseData);
        
    }
    if (phone === "") {
        responseData.code = 1;
        responseData.message = "手机号不能为空";
        return res.json(responseData);
        
    }

    User.findOne({
        username:username
    }).then(function(userInfo){
        console.log(userInfo);
        if(userInfo){
            responseData.code = 4;
           responseData.message = "用户名已经被注册";
           return res.json(responseData);
        }
        var user = new User({
            username:username,
            password:md5(password),
            phone:phone
        });
         user.save();
    }).then(function(newUserInfo){
        console.log(newUserInfo);
        responseData.code = 0;
        responseData.message = "注册成功";
        return res.json(responseData);
    }).catch(function (error) {//加上catch 
        console.log(error);
        return;
      })
})

router.post('/user/sys',function(req,res,next){
    console.log(req.body);
    var phoneNum = req.body.phoneNum;
    if (phoneNum === "") {
        responseData.code = 1;
        responseData.message = "手机号不能为空";
        return res.json(responseData);
    }
    var ress = res;
    var code = Math.floor(Math.random()*9000)+1000;
    smsClient.sendSMS({
        PhoneNumbers:phoneNum ,
        SignName: '苏晓燕',
        TemplateCode: 'SMS_137672486',
        TemplateParam: '{"code":'+code+'}'
    }).then(function (res) {
        let {Code}=res
        conosle.log("susususususuCode:"+Code);
        if (Code === 'OK') {
            //处理返回参数
            console.log("sucess!");
            console.log(res);
            responseData.code = 0;
            responseData.message = "短信发送成功！";
            responseData.responseNum = md5(code);
            return ress.json(responseData);

        }else{
            console.log("fail!");
            responseData.code = -1;
            responseData.message = "请不要频繁发送";
            return ress.json(responseData);
        }
    }).catch(function (error) {//加上catch 
        console.log("error");
        console.log(error.data.Code);
        responseData.code = -1;
        responseData.message = "请不要频繁发送,请稍后再试！";
        return ress.json(responseData);
        
      })
    })
//腿粗
    router.get('/user/logout', function (req, res) {
        req.cookies.set('userInfo',null);
        responseData.message='退出成功！';
        res.json(responseData);
    })

    router.post('/user/login', function (req, res, next) {

        console.log(req.body);
        //注册逻辑 用户名是否为空
        var username = req.body.username;
        var password = req.body.password;
        if (username === "") {
            responseData.code = -1;
            responseData.message = "用户名不能为空";
            return res.json(responseData);
        }
        if (password === "") {
            responseData.code = -1;
            responseData.message = "密码不能为空";
            return res.json(responseData);
            
        }
        // if (phone === "") {
        //     responseData.code = -1;
        //     responseData.message = "手机号不能为空";
        //     return res.json(responseData);
            
        // }
    
        User.findOne({
            username:username,
            password:md5(password)
        }).then(function(userInfo){
            console.log(userInfo);
            if(!userInfo){
              responseData.code = -1;
               responseData.message = "该用户不存在！";
               return res.json(responseData);
            }else{
                responseData.code = 0;
               responseData.message = "登录成功";
               responseData.userInfo = {
                   _id:userInfo._id,
                   username:userInfo.username
               }
               req.cookies.set('userInfo',JSON.stringify({
                   _id:userInfo._id,
                   username:userInfo.username
               }));
               return res.json(responseData);
            }
            
        }).catch(function (error) {//加上catch 
            console.log(error);
            return;
          })
    })



module.exports = router;
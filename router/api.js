// 注册逻辑
//1、用户名不能为空
//2、密码不能为空
//3、两次输入密码必须一致


var express = require('express');
var router = express.Router();
var User = require('../models/User');
var md5 = require('md5-node');
const nodemailer = require('nodemailer'); //邮件模块


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
   next();
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
        res.json(responseData);
        return;
    }
    if (password === "") {
        responseData.code = 1;
        responseData.message = "密码不能为空";
        res.json(responseData);
        return;
        
    }
    if (phone === "") {
        responseData.code = 1;
        responseData.message = "手机号不能为空";
        res.json(responseData);
        return;
        
    }
    var reqq = res;
    User.findOne({
        username:username
    }).then(function(userInfo){
        console.log("userInfo-111");
        console.log(userInfo);
        if(userInfo){
            responseData.code = 4;
           responseData.message = "用户名已经被注册";
           res.json(responseData);
           return;
        }
        var user = new User({
            username:username,
            password:md5(password),
            phone:phone
        });
         return user.save();
         
    }).then(function(userInfo){
        console.log("userInfo-222");
        console.log("s:"+userInfo);
        responseData.code = 0;
        responseData.message = "注册成功";
        res.cookies.set('userInfo',JSON.stringify({
            _id:userInfo._id,
            username:userInfo.username,
            isAdmin:isAdmin
        }));
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
        //conosle.log("susususususuCode:"+Code);
        if (Code === 'OK') {
            //处理返回参数
            //console.log("sucess!");
            //console.log(res);
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
        res.cookies.set('userInfo',null);
        responseData.message='退出成功！';
       return res.json(responseData);
    })
//查找用户信息
    router.post('/user/findUser', function (req, res) {
        // responseData.code = 0;
        // responseData.message = "查找到信息！";
        // responseData.data = { _id: '5b3370ef8e7b2d2f4cb61ddf',username: 'admin',isAdmin: false }
        // res.json(responseData);
        
        User.find().then(function(userInfo){
            console.log(userInfo);
            if(!userInfo){
              responseData.code = -1;
               responseData.message = "没有数据";
               responseData.data={};
               return res.json(responseData);
            }else{
                responseData.code = 0;
               responseData.message = "登录成功";
               responseData.data = userInfo;
               req.cookies.set('users',JSON.stringify(userInfo));
               return res.json(responseData);
            }

    })
})
//发送邮件
router.post('/sendtomail', function (req, res) {
    Mail.find().then(function(userInfo){
        console.log(userInfo);
})
    // responseData.code = 0;
    // responseData.message='邮件发送成功！';
    // res.json(responseData);
  nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      // let transporter = nodemailer.createTransport({
      //     host: 'smtp.ethereal.email',
      //     port: 587,
      //     secure: false, // true for 465, false for other ports
      //     auth: {
      //         user: account.user, // generated ethereal user
      //         pass: account.pass // generated ethereal password
      //     }
      // });
      let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: 'smtp.qq.com', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
          user: '105807174@qq.com',
          // 这里密码不是qq密码，是你设置的smtp授权码
          pass: 'lmcnjaypijhbcafa',
        }
      });
  
      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Fred Foo 👻" <105807174@qq.com>', // sender address
          to: 'sutootototo2002@163.com', // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world?', // plain text body
          html: '<b>Hello world?</b>' // html body
      };
  
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
  });
  });
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
                   username:userInfo.username,
                   isAdmin:userInfo.isAdmin
               }
               req.cookies.set('userInfo',JSON.stringify({
                   _id:userInfo._id,
                   username:userInfo.username,
                   isAdmin:userInfo.isAdmin
               }));
               return res.json(responseData);
            }
            
        }).catch(function (error) {//加上catch 
            console.log(error);
            return;
          })
    })



module.exports = router;
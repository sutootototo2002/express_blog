var express = require('express');
var app = express();
app.use('/public',express.static(__dirname+'/public'));
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));



//加载模板处理
var swig = require('swig');

//配置模板引擎
app.engine('html',swig.renderFile); //(后缀，解析处理模板内容)

app.set('views','./views');

app.set('view engine','html'); //模板引擎一致

swig.setDefaults({cache:false});

// 根据不同的功能划分模块
app.use('/admin',require('./router/admin'));
app.use('/api',require('./router/api'));
app.use('/',require('./router/main'));

  var server = app.listen(80||3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  mongoose.connect('mongodb://120.78.229.228:27017/blog',function(err){
      if(err){
        console.log('数据库连接失败');
      }else{
        console.log('数据库连接成功');
      }
     
  });

  console.log('Example app listening at http://%s:%s', host, port);
});
# express_blog
  express 搭建得博客系统，当作项目练手
  项目地址：[http://120.78.229.228/admin/user](http://120.78.229.228/admin/user "项目地址：猛戳")

### 项目结构
  
![](https://i.imgur.com/1dyPS2B.png)

后台运行：
     
    sudo npm install forever -g
    forever start app.js
    forever stop app.js


## 注册模块开发

###1、注册用户名2、密码3、手机号码手机号码需要验证

    1、验证用户名是否存在等
    2、密码是否是6位md5加密
    3、手机号码输入,发送验证码

###发送验证码---阿里云短息接口
   [https://help.aliyun.com/document_detail/57458.html?spm=5176.10629532.106.4.c4181cbefAGfXy](https://help.aliyun.com/document_detail/57458.html?spm=5176.10629532.106.4.c4181cbefAGfXy "阿里云短信网址")
   
    $ npm install @alicloud/sms-sdk --save
	
	    /**
	 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
	 * Created on 2017-07-31
	 */
	const SMSClient = require('@alicloud/sms-sdk')
	// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
	const accessKeyId = 'yourAccessKeyId'
	const secretAccessKey = 'yourAccessKeySecret'
	//初始化sms_client
	let smsClient = new SMSClient({accessKeyId, secretAccessKey})
	//发送短信
	smsClient.sendSMS({
	    PhoneNumbers: '1500000000',
	    SignName: '云通信产品',
	    TemplateCode: 'SMS_000000',
	    TemplateParam: '{"code":"12345"}'
	}).then(function (res) {
	    let {Code}=res
	    if (Code === 'OK') {
	        //处理返回参数
	        console.log(res)
	    }
	}, function (err) {
	    console.log(err)
	})

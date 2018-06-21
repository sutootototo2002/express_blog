$(function(){
    var $loginBox = $('#login_box');
   // alert($loginBox);
    var $regBox = $('#reg_box');
   $('#iforget1').on('click',function(){
        $loginBox.hide();
        $regBox.show();
    })
    $('#reg_box #iforget2').on('click',function(){
        $regBox.hide();
        $loginBox.show();
       
    })
    var sysNum = "";
    $('#button_reg').on('click',function(){
        //通过ajax提交请求
        var sys =md5($('#yz_num').val());
        if(sys === sysNum){
            alert('验证成功！')
        }else{
            alert("请重新填写验证码！");
            return;
        }
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:$('#username').val(),
                password:$('#password').val(),
                phone:$('#tel').val()
            },
            dataType:'json',
            success:function(data){
                 console.log(data);
                 if(data.code === 0){
                     alert("注册成功："+data.message);
                     sysNum="";
                 }else{
                     alert("注册失败："+data.message);
                     sysNum="";
                 }
            }
        })
    })
    $('#login_button').on('click',function(){
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:$('#username1').val(),
                password:$('#password1').val()
            },
            dataType:'json',
            success:function(data){
                 console.log(data);
            }
        })
    });
    //点击发送短信
    $('#but_checkNum').on('click',function(){
        //通过ajax提交请求
       
        $.ajax({
            type:'post',
            url:'/api/user/sys',
            data:{
                phoneNum:$('#tel').val()
            },
            dataType:'json',
            success:function(data){
                 console.log(data);
                 if(data.code === 1){
                     alert('手机号不能为空！');
                 }
                 if(data.code === 0){

                    myjs.showtime('myform',30);
                    sysNum = data.responseNum;

                 }
            }
        })
    });
})
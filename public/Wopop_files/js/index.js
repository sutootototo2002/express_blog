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
    $('#button_reg').on('click',function(){
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:$('#username').val(),
                password:$('#password').val()
            },
            dataType:'json',
            success:function(data){
                 console.log(data);
                 if(data.code === 0){
                     alert('注册成功！')
                 }else{
                     alert("注册失败："+data.message)
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
    })
})
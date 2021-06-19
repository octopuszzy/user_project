$(function(){
    // 去注册
    $('#link-reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show()
    })
    // 去登录
    $('#link-login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide()
    })

    // 从layui中获取 form对象
    var form = layui.form
    var layer =layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
          
          //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
          if(value === 'xxx'){
            alert('用户名不能为敏感词');
            return true;
          }
        }        
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ]
        // 再次确认密码校验规则
        ,repass:function(value){ 
            var pwd = $(".reg-box [name=password]").val();
            if(pwd !== value){
                return "两次密码不一致"
            }         
        } 
      });

    // 监听注册表单提交事件
    $('#form-reg').on('submit',function(e){
        // 阻止表单默认提交事件
        e.preventDefault();
        var username = $('#form-reg [name=username]').val()
        var password = $('#form-reg [name=password]').val()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: { username:username, password:password},
            success: function(res){
                if(res.status !== 0)
                return layer.msg(res.message);
                else{
                    layer.msg('注册成功，请登录')
                    // 模拟点击注册行为
                    $('#link-login').click()
                }
            }
        })
    })  

    // 监听登录表单提交事件
    $('#form-login').submit(function(e){
        // 阻止默认提交事件
        e.preventDefault();
        var data = $(this).serialize();
        $.post('/api/login',data,function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            else{
                layer.msg('登录成功！')
                // 跳转到后台主页
                console.log(res);
                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token',res.token)
                // 跳转到后台主页g
                location.href = 'index.html'
            }
        })
    })
})
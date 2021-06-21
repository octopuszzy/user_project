$(function(){
    var layer = layui.layer
    var form = layui.form

    // 自定义表单验证
    form.verify({
        nickname: function(value) {
          if (value.length < 6) {
            return '昵称长度必须在 1 ~ 6 个字符之间！'
          }
        }
    })

    initUserInfo();
    
    // 表单重置按钮
    $('#btnReset').on('click',function(e){
        // 阻止按钮默认重置行为
        e.preventDefault()
        // 调用获取用户初始信息方法，获取到最初的数据
        initUserInfo();
    })

    // 监听表单提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        // 调用更改用户信息接口
        $.ajax({
            type: 'POST',
            url:'/my/userinfo',
            // 通过jquery提供的form.serialize()方法，快速获取表单信息
            data: $(this).serialize(),
            success: function(res){
                if(res.status !==0){
                    layer.msg('获取用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
        
    })


    // 获取用户基本信息
    function initUserInfo(){
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('获取用户信息失败')
                }
            // 调用 form.val() 快速为表单赋值
            form.val('formUserInfo', res.data)   
  
            }
        })
    }



})


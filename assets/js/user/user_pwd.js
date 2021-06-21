$(function(){
    var form = layui.form;
    var layer = layui.layer;
    // 自定义校验规则
    form.verify({
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        // 再次确认密码
        rePwd: function(value) {
            var pwd = $('.layui-input-block [name=newPwd]').val();
            if(value !== pwd){
                return '两次密码不一致'
            }
        }
      });     
      
    // 监听表单提交事件  
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                // 重置表单
            $('.layui-form')[0].reset()
            }
        })
    })
})
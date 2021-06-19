$(function(){
    // 调用获取用户信息函数
    getUserInfo()

    var layer = layui.layer
    var confirm = layer.confirm
    // 获取用户信息
    function getUserInfo(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // 请求头携带token
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res){
                console.log(res);
                if(res.status !== 0){
                    return layer.msg('请求失败')
                }
                else{
                    // 调用渲染头像方法
                    renderAvatar(res.data)
                }
            },
            // 不论成功还是失败，最终都会调用 complete 回调函数
            // complete: function(res) {
            //   // console.log('执行了 complete 回调：')
            //   // console.log(res)
            //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //     // 1. 强制清空 token
            //     localStorage.removeItem('token')
            //     // 2. 强制跳转到登录页面
            //     location.href = '/login.html'
            //   }
            // }
        })
    }

    // 退出功能
    $('#btnLogout').on('click',function(){
        layer.confirm('确定要退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something 
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = 'login.html'

            // 关闭 confirm 询问框
            layer.close(index)
          });
    })
    
})

// 渲染头像
function renderAvatar(user){
    // 1.获取用户名称
    var name = user.nickname || user.username;
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.渲染图片头像
    if(user.user_pic !== null){
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src',user.user_pic).show()
    }
    // 渲染文本头像
    else{
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}



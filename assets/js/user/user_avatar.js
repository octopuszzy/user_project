$(function(){
// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)


$('#btnChooseImg').on('click',function(e){
    $('#file').click()    
})


//裁剪区域照片替换
$('#file').on('change',function(e){
    // 获取用户上传图片
    var file = e.target.files;
    if(file.length === 0){
        return layer.msg('请选择照片！')
    }

    // 根据选择的文件，创建一个对应的 URL 地址
    var newImgURL = URL.createObjectURL(file[0]);
    // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
  
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域

    // 为确定按钮绑定点击事件
    $('#btnUpLoad').on('click',function(e){
        e.preventDefault();
        var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')// 将 Canvas 画布上的内容，转化为 base64 格式的字符串
     
    //   调用上传头像接口
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: {avatar: dataURL},
        success: function(res){
            if(res.status !== 0){
                return layer.msg('更换头像失败')
            }
            layer.msg('更换头像成功')
            // 调用父页面的方法，重新渲染用户头像
            window.parent.getUserInfo()
        }
    })
    
    
    })

})
})

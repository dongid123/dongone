$(function () {
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

    // 点击文件上传
    $("#btnChooseImages").on('click', function () {
        $("#file").click()
    })

    var layer = layui.layer
    // 重新渲染图片
    $("#file").on('change', function (e) {
        //用户选择拿到的文件
        var file = this.files[0]
        // console.log(file);
        if (file === undefined) {
            return layer.msg('请选择图片,并上传')
        }
        // 创建虚拟的路径
        var newImgURL = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    //上传头像
    $("#btnUpload").on('click', function () {
        // 3. 将裁剪后的图片，输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 使用ajax
        $.ajax({
            type: "POST",
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 用户更新成功
                layer.msg(res.message)
                // 
                window.parent.gitUserInof()
            }
        })
    })
})
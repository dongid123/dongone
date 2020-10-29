// 入口函数
$(function () {
    var form = layui.form
    form.verify({
        // 密码要求
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 新密码要求
        samePwd: function (value) {
            if (value === $("[name=oldPwd]").val()) {
                return '新旧密码不能一致 ! '
            }

        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一致 请您再次输入 ! '
            }

        }
    })

    // 提交密码
    $(".layui-form").on('submit', function (e) {
        //阻止默认
        e.preventDefault()
        // 请求
        $.ajax({
            type: "POST",
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // 密码修改成功
                layui.layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })

    })
})
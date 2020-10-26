$(function () {
    // 注册和登录的隐藏
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 自定义验证规则
    var form = layui.form
    console.log(form);
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //注册页面的确认密码
        // 选择器必须带空格
        repwd: function (vaule) {
            var pwad = $('.reg-box [name=password]').val()
            if (vaule !== pwad) {
                return "对不起,两次密码输入不相等,请重新输入"
            }
        }
    })

    //4.注册按钮
    $('#form_reg').on('submit', function (e) {
        // 阻止表单的默认行为
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                //返回状态判断
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //提交成功
                alert(res.message)
            }

        })
    })
})
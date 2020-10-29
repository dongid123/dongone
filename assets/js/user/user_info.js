// 入口函数
$(function () {
    // 自定义半段规则
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称的长度在1-6位之间! '
            }

        }
    });
    //获取用户的信息
    var layer = layui.layer
    intnUserInfo()
    function intnUserInfo() {
        // 获取用户信息
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 获取成功之后
                console.log(res);
                form.val("formUserInfo", res.data)
            }
        })
    }
    // 设置重置按钮
    $("#readonly").on('click', function (e) {
        //阻止默认行为
        e.preventDefault();
        //重新进行用户渲染
        intnUserInfo()
    })

    // 更新用户的信息
    $(".layui-form").on('submit', function (e) {
        //阻止默认行为
        e.preventDefault()
        // 使用post更新用户
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                //判断用户获取是否成功
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 用户更新成功 
                layer.msg('恭喜您,用户信息修改成功')
                // 使用父元素
                window.parent.gitUserInof()
            }
        })

    })
})
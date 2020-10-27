$(function () {
    // 获取用户信息
    gitUserInof()
})

// 设置全局变量 (封装到入口函数的外面)
function gitUserInof() {
    // 发送ajax请求
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     // 重新登录因为token过期时间12小时
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}

// 渲染头像
function renderAvatar(user) {
    // 获取用户名
    var name = user.nickname || user.username
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
    //渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.user-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.user-avatar').show().html(text);
    }
}
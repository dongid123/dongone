$(function () {
    // 获取用户信息
    gitUserInof()
    // layer
    var layer = layui.layer
    $('#btnLogin').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 1. 删除token 
            localStorage.removeItem('token')
            // 2. 跳转页面
            location.href = '/login.html';
            // 关闭弹出层
            layer.close(index);
        });
    })
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
            // console.log(res);
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
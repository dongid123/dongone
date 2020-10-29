//z开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function (params) {
    // 拼接之前的服务器地址
    // 1.拼接对应环境的服务器地址
    params.url = baseURL + params.url
    //2. 拼接之后的服务器地址
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            // 重新登录因为token过期时间12小时
            Authorization: localStorage.getItem('token') || ""
        }
    }
    // 拦截所有响应 ,判断身份认证信息
    params.complete = function (res) {
        console.log(res);
        var obj = res.responseJSON;
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            // 删除token 和跳转登录页面
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})
//z开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function (params) {
    // 拼接之前的服务器地址
    // console.log(params.url);
    // 拼接对应环境的服务器地址
    params.url = baseURL + params.url
    // 拼接之后的服务器地址
    // console.log(params.url);
})
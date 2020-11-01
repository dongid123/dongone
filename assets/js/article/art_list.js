$(function () {
  // 定义时间过滤器
  template.defaults.imports.dateFormat = function (dtstr) {
    var dt = new Date(dtstr)
    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + " " + hh + ':' + mm + ':' + ss
  }
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }

  var layer = layui.layer

  // 0.定义提交参数
  var p = {
    pagenum: 1,  //  页码值
    pagesize: 2,	//  每页显示多少条数据
    cate_id: '',  //	文章分类的 Id
    state: '',  //	文章的状态，可选值有：已发布、草稿
  }


  ininTable()
  intnCate()

  //渲染列表数据
  function ininTable() {
    $.ajax({
      url: '/my/article/list',
      data: p,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg('渲染数据失败')

        }
        //使用模板引擎选渲染到页面上
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
        // 渲染分页
        renderPage(res.total)
      }
    })
  }
  // 4.渲染文章类别
  var form = layui.form
  function intnCate() {
    $.ajax({
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 代码执行成功之后
        var htmlStr = template('lpl-cate', res)
        // console.log(htmlStr);
        $("[name=cate_id]").html(htmlStr)
        // 然数据在页面上渲染
        form.render()
      }
    })
  }

  // 5.筛选功能
  $("#secher-form").on('submit', function (e) {
    //阻止默认行为
    e.preventDefault()
    // 修改值
    p.cate_id = $("[ name=cate_id]").val()
    p.state = $("[ name=state]").val()

    // ininTable初始化文章列表
    ininTable()
  })


  // 6.分页功能
  var laypage = layui.laypage;
  function renderPage(total) {
    // console.log(total);
    laypage.render({
      elem: 'pageBox',//注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: p.pagesize,
      curr: p.pagenum,
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'], //自定义排版
      limits: [2, 3, 5, 10, 15], //每页条数的选择项
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        p.pagenum = obj.curr;
        p.pagesize = obj.limit;
        //首次不执行
        if (!first) {
          ininTable()
          //do something
        }
      }
    });
  }

  //7 事件委托动态绑定删除功能
  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    layer.confirm('是否要删除本文章?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        url: '/my/article/delete/ ' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除文章失败')
          }
          //删除成功
          layer.msg('删除文章成功')
          // 页面汇总删除按钮 个数等于1,页码大于1
          if ($(".btn-delete").length === 1 && p.pagenum > 1) p.pagenum--
          // 先重新渲染页面
          ininTable()

        }
      })
      layer.close(index);
    });
  })
})
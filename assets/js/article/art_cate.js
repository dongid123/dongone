$(function () {
  // 初始化表格
  initArtCateList()
  // 
  var layer = layui.layer
  var form = layui.form

  // 渲染页面数据
  function initArtCateList() {
    $.ajax({
      url: '/my/article/cates',
      success: function (res) {
        var obj = template('tpl-table', res)
        $('tbody').html(obj)
      }
    })
  }

  // 添加文章分离
  var indexAdd = null
  $("#btnAddCate").on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '在线调试',
      content: $("#dialog-add").html()
    });
  })

  // 添加到页面
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault() //阻止默认事件
    // alert(12)
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 1. 添加成功
        layer.msg(res.message)
        // 2. 重新渲染  
        initArtCateList()
        // 3. 关闭页面
        layer.close(indexAdd)
      }
    })
  })


  // 添加修改的弹出层
  var indexEdit = null
  $('body').on('click', '.btn-edit', function (e) {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '修改文章分类',
      content: $("#dialog-edit").html()
    });

    // 获取自定义的并渲染到弹出层
    var id = $(this).attr('data-id')
    $.ajax({
      url: '/my/article/cates/' + id,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 代码运行成功
        form.val('form-edit', res.data)
      }
    })
  })

  // 更新列表
  $("body").on('submit', "#form-edit", function (e) {
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败')

        }
        //获取数据成功
        layer.msg('获取用户信息成功')
        // 刷新页面
        initArtCateList()
        //关闭弹出层
        layer.close(indexEdit)
      }
    })
  })

  // 删除按钮
  $("body").on('click', '.btn-delete', function (e) {
    e.preventDefault()
    var id = $(this).attr('data-id')
    layer.confirm('确定要删除页面', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除失败')
          }
          // 
          layer.msg('删除成功')
          // 刷新页面
          initArtCateList()
          //关闭弹出层
          layer.close(index);
        }
      })
    });

  })
})
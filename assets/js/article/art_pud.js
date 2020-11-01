//入口函数
$(function () {
  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)


  initEditor()


  var form = layui.form
  var layer = layui.layer
  initCate()
  function initCate() {
    $.ajax({
      // type: 'POSt',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          layer.msg(res.message)
        }
        //使用模板引擎
        var htmlStr = template('tpl-cate', res)
        $("[name=cate_id]").html(htmlStr)
        form.render()
      }
    })
  }

  // 点击绑定事件
  $("#btnChoseImage").on('click', function () {
    $("#addimag").click()
  })

  $('#addimag').on('change', function () {
    var file = this.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })

  // 6.设置状态
  var state = '已发布'
  /*  $("#btnSeva1").on('click', function () {
    state = '已发布'
  }) */
  $("#btnSeva2").on('click', function () {
    state = '存为草稿'
  })

  // 7.表单的
  $("#form-pud").on('submit', function (e) {
    //1阻止默认事件
    e.preventDefault()
    // 2
    var fd = new FormData(this)
    // 3
    fd.append('state', state)
    // 4
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append("cover_img", blob)
        // console.log(...fd);
        // 封装的函数调用
        pudlistArticle(fd)
      });
  })
  //封装ajax函数
  function pudlistArticle(d) {
    $.ajax({
      type: "POST",
      url: '/my/article/add',
      data: d,
      // 使用formData数据提交要添加
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('恭喜您,文章发表成功');
        // location.href = '/article/art_list.js'
        setTimeout(function () {
          window.parent.document.getElementById('art_list').click()
        }, 1000)
      }
    })
  }


})
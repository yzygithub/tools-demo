/**
 * Created by yzy on 2018/3/13.
 */
var nodeTpl =
  '<div class="node">' +
  '<div class="content-wrapper">' +
  '<div class="bullet-wrapper">' +
  '<div class="bullet">' +
  '<div class="dot"></div>' +
  '</div>' +
  '</div>' +
  '<div class="content" spellcheck="false" autocapitalize="off" contenteditable="true"></div>' +
  '</div>' +
  '</div>'
// add first node
$('#add-node').click(function () {

  $('.node-tree').append(nodeTpl)
  $(this).hide()
})

//按键事件
document.onkeydown = function (event) {
  var e = event || window.event;
  // console.log(e)
  console.log(e.keyCode)
  if (e && e.keyCode == 13) {
    pressEnter()
    return false //取消默认回车事件
  } else if (e && e.keyCode == 9) {
    pressTab()
    return false //取消默认tab事件
  } else if (e && e.keyCode == 8) {
    pressDelete()
  }
};

// 操作
function pressEnter() {
  add()
}

function pressTab() {
  var index = $('.focused').index()
  console.log('index:' + index)
  // node节点不为第一个时，才可变为子节点
  if (index > 0) {
    tab()
  }
}

function pressDelete() {
  // console.log($('.focused').text())
  // 删除空节点  ?有子节点可不可删除?
  if (!$('.focused').text()) {
    back()
    // 删除node后焦点应该移到前一个node
  }
}
//  动作
function add() {
  var newNode = '<div class="node new-node">' +
    '<div class="content-wrapper">' +
    '<div class="bullet-wrapper">' +
    '<div class="bullet">' +
    '<div class="dot"></div>' +
    '</div>' +
    '</div>' +
    '<div class="content" spellcheck="false" autocapitalize="off" contenteditable="true"></div>' +
    '</div>' +
    '</div>'
  $('.focused').after(newNode)
  $('.focused').find('.content').blur()
  $('.new-node').find('.content').focus()
  // console.log($('.new-node').find('.content'))
  $('.new-node').removeClass('new-node')
}

function tab() {
  var child = '<div class="children"></div>'
  var toogle = '<div class="action-icon toggle" title="展开/收缩"><i class="icon icon-minus"></i></div>'
  var focusPrev = $('.focused').prev()
  focusPrev.append(child)
  focusPrev.children('.content-wrapper').append(toogle)
  $('.focused').clone(true).appendTo(focusPrev.children('.children'))
  // console.log($('.focused')[1])
  $('.focused')[1].remove()
  $('.focused').find('.content').focus()
}

function back() {
  $('.focused').remove()
  checkNode()
}

//  切换focused
$(".node-tree").delegate(".content", "focus blur", function (event) {
  var elem = $(this).parentsUntil('.node').parent();
  var _this = $(this)
  // console.log(elem)
  setTimeout(function () {
    elem.toggleClass("focused", _this.is(":focus"));
  }, 0);
});

// 检查页面是否还有.node元素
function checkNode() {
  var isEmpty = document.querySelector('#paper').contains(document.querySelector('.node')) //false为empty
  // console.log(isEmpty)
  if (!isEmpty) {
    $('#add-node').show()
  }
}
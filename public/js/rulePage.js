$(function () {
    var rulePage = $('#rulePage');
    var rulePageChildren = rulePage.find('*');
    var close = $('#close');
    for (var i = 0; i < rulePageChildren.length; i++) {
        rulePageChildren[i].className += ' fadeIn  animated';
    }
    //点击关闭按钮，关闭游戏说明页面,返回首页
    close.click(function () {
        location.hash = '#firstPage';
    });
});
$(function () {
    var awardPage = $('#awardPage');
    var awardPageChildren = awardPage.find('*');
    var close = $('#close1');
    for (var i = 0; i < awardPageChildren.length; i++) {
        awardPageChildren[i].className += ' fadeIn  animated';
    }
    //点击关闭按钮，关闭游戏说明页面,返回首页
    close.click(function () {
        location.hash = '#firstPage';
    });
});
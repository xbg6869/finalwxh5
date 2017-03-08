$(function () {
    var winPage = $('#winPage');
    var winPageChildren = winPage.find('img');
    var share = $('#share');
    var shareBtn = $('#shareBtn');
    for (var i = 0; i < winPageChildren.length; i++) {
        winPageChildren[i].className += ' fadeIn  animated';
    }
    shareBtn.click(function () {
        $(winPage).css({
            'background': 'url("../img/shareBg.png") no-repeat',
            'background-size': '15.27rem 26.81rem'
        })
        $(share).hide();
        $(this).hide();
        /*        setTimeout(function () {
         location.hash = '#monsterFall';
         },500);*/
    });
});
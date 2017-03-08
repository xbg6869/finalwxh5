$(function () {
    var failPage = $('#failPage');
    var failPageChildren = failPage.find('*');
    var replay = $('#replayUp');
    var share = $('#shareUp');
    for (var i = 0; i < failPageChildren.length; i++) {
        failPageChildren[i].className += ' bounceIn  animated';
    }
    replay.click(function () {
        $(this).hide();
        setTimeout(function () {
            location.hash = '#monsterFall';
        },500);
    });
    share.click(function () {
        $(this).hide();
        /*setTimeout(function () {
            location.hash = '#monsterFall';
        },500);*/
    });
});
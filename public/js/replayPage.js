$(function () {
    var replayPage = $('#replayPage');
    var replayPageChildren = replayPage.find('*');
    var replay = $('#replayUp');
    for (var i = 0; i < replayPageChildren.length; i++) {
        replayPageChildren[i].className += ' bounceIn  animated';
    }
    replay.click(function () {
        $(this).hide();
        setTimeout(function () {
            location.hash = '#monsterFall';
        },500);
    });
});
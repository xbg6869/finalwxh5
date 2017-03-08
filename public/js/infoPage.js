$(function () {
    var infoPage = $('#infoPage');
    var infoPageChildren = infoPage.find('img');
    var completed = $('#completed');
    for (var i = 0; i < infoPageChildren.length; i++) {
        infoPageChildren[i].className += ' bounceIn  animated';
    }
    $('.inputContainer').addClass(' bounceIn  animated');
    completed.click(function () {
        $(this).hide();
        setTimeout(function () {
            location.hash = '#monsterFall';
        },500);
    });
    infoExist = true;
})
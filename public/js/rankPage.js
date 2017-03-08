$(function () {
    var rankPage = $('#rankPage');
    var rankPageChildren = rankPage.find('img');
    var continueUp = $('#continueUp');
    for (var i = 0; i < rankPageChildren.length; i++) {
        rankPageChildren[i].className += ' bounceIn  animated';
    }
    $('.rankContainer').addClass(' bounceIn  animated');
    continueUp.click(function () {
        $(this).hide();
        setTimeout(function () {
            location.hash = '#startSubjectPage';
        },500);
    });
})
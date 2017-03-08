$(function () {
    var firstPage = $('#firstPage');
    var firstImgArray = firstPage.find('img');
    var gameRuleUp = $('#gameRuleUp');
    var gameRuleDown = $('#gameRuleDown');
    var beginUp = $('#beginUp');
    var beginDown = $('#beginDown');
    for (var i = 0; i < firstImgArray.length; i++) {
        firstImgArray[i].className += ' bounceIn  animated';
    }
    gameRuleUp.click(function () {
        gameRuleUp.hide();
        var that =this;
        setTimeout(function () {
            location.hash = '#rulePage';
        },500);
    });
    beginUp.click(function () {
        beginUp.hide();
        setTimeout(function () {
            location.hash = '#monsterFall';
        });
    });
});
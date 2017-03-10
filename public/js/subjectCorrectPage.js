$(function () {
    var subjectCorrectPage = $('#subjectCorrectPage');
    var subjectCorrectChildren = subjectCorrectPage.find('*');
    var startLotteryUp = $('#startLotteryUp');
    for (var i = 0; i < subjectCorrectChildren.length; i++) {
        subjectCorrectChildren[i].className += ' bounceIn  animated';
    }
    startLotteryUp.click(function () {
        $(this).hide();
        setTimeout(function () {
            location.hash = '#lotteryPage'
        },500)
    });
});
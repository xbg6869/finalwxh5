$(function () {
    var startSubjectPage = $('#startSubjectPage');
    var startSubjectPageChildren = startSubjectPage.find('*');
    var startSubjectUp = $('#startSubjectUp');
    for (var i = 0; i < startSubjectPageChildren.length; i++) {
        startSubjectPageChildren[i].className += ' bounceIn  animated';
    }
    startSubjectUp.click(function () {
        $(this).hide();
        setTimeout(function () {
            location.hash = '#subjectPage'
        },500);
    });
});
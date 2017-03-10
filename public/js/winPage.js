$(function () {
    var winPage = $('#winPage');
    var firstDoctor = $('#firstDoctor');
    var thirdDoctor = $('#thirdDoctor');
    var share = $('#share');
    var shareBtn = $('#shareBtn');
    share.addClass(' fadeIn  animated');
    firstDoctor.addClass(' fadeIn  animated');
    shareBtn.addClass(' fadeIn  animated');
    shareBtn.click(function () {
        $(this).hide();
        firstDoctor.hide()
        thirdDoctor.addClass(' fadeIn  animated');
    });
});
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
        var that = this;
        this.timer = setTimeout(function () {
            $(that).show()
        },250);
        var  realName =$('#nameInfo').val(),
            tel=$('#telInfo').val(),
            address=$('#addressInfo').val(),
            email=$('#emailInfo').val();
        //开始发送数据给后台
        var  data={
            realname : realName,
            tel:tel,
            address:address,
            email:email
        };

        sendInfoToBackend(data);
        setTimeout(function () {
            location.hash = '#subjectPage';
        },200);
    });

    function sendInfoToBackend(data) {
        $.ajax({
            type:'post',
            url:'userInfo',
            data:data,
            success:function (result) {
                console.log(result)
            }
        })
    }

});
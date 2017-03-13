$(function () {
    var infoPage1 = $('#infoPage1');
    var infoPageChildren1 = infoPage1.find('img');
    var completed1 = $('#completed1');
    for (var i = 0; i < infoPageChildren1.length; i++) {
        infoPageChildren1[i].className += ' bounceIn  animated';
    }
    $('.inputContainer').addClass(' bounceIn  animated');
    completed1.click(function () {
        $(this).hide();
        var that = this;
        this.timer = setTimeout(function () {
            $(that).show()
        },200);
        var  realName1 =$('#nameInfo1').val(),
            tel1=$('#telInfo1').val(),
            address1=$('#addressInfo1').val(),
            email1=$('#emailInfo1').val();
        if(realName1=="" || tel1=="" ||address1 == "" || email1==''){
            return false;
        }
        //开始发送数据给后台
        var  data={
            realname : realName1,
            tel:tel1,
            address:address1,
            email:email1
        };

        sendInfoToBackend(data);
        setTimeout(function () {
            location.hash = '#winPage';
        },200);
    });

    function sendInfoToBackend(data) {
        $.ajax({
            type:'post',
            url:'userInfo?openid='+localStorage.getItem('openid')+'',
            data:data,
            success:function (result) {
                console.log(result)
            }
        })
    }

});
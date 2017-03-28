$(function() {
    var lotteryPage =$('#lotteryPage');
    var lotteryBtn = $('#lotteryBtn');
    var lotteryBg = $('#lotteryBg');
    var rotateFunc = function(awards, angle, text) {
        //awards:奖项，angle:奖项对应的角度
        lotteryBtn.stopRotate();
        lotteryBtn.rotate({
            angle: 0,
            duration: 10000,
            animateTo: angle + 2880,
            //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
            callback: function() {
                if(text == 0){
                    location.hash = '#failPage';
                }else {
                    setTimeout(function () {
                        location.hash = '#winPage';
                    }, 200);
                    //checkInfoExists();
                }
            }
        });
    };

    lotteryBtn.rotate({
        bind: {
            touchstart: function() {
                //这个随机可以通过后端返回的数据替代
                var that = this;
                /*$.ajax({
                    url:'/lottery?openid='+localStorage.getItem('openid')+'',
                    method:'get',
                    dataType:'text',
                    success:function (result) {
                        var num = Number(result);
                            showResult(num);
                            $(that).off('touchstart');
                    }
                });*/
                var num = 0;
                showResult(num);
                $(that).off('touchstart');
                function showResult(data) {
                    if(data == 'undefined'){
                        data=0;
                    }
                    switch (data) {
                        case 2://亚马孙电子礼品卡
                            rotateFunc(4, 195, 4);
                            break;
                        case 1://3M口罩
                            rotateFunc(6, 340, 6);
                            break;
                        case 0:
                            var angle = [149,167,280,300];
                            angle = angle[Math.floor(Math.random() * angle.length)]
                            rotateFunc(0, angle, 0);
                            break;
                    }
                }
            }
        }
    });


    function checkInfoExists() {
        $.ajax({
            type: 'get',
            url: 'checkInfoExists?openid='+localStorage.getItem('openid')+'',
            dataType: 'text',
            success: function (result) {
                if(result=='false') {
                    setTimeout(function () {
                        location.hash = '#infoPage1';
                    }, 200);
                } else {
                    setTimeout(function () {
                        location.hash = '#winPage';
                    }, 200);
                }
            }
        });
    }
})
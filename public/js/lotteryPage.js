$(function() {
    var lotteryPage =$('#lotteryPage');
    var lotteryBtn = $('#lotteryBtn');
    var lotteryBg = $('#lotteryBg');
    var rotateFunc = function(awards, angle, text) {
        //awards:奖项，angle:奖项对应的角度
        lotteryBg.stopRotate();
        lotteryBg.rotate({
            angle: 0,
            duration: 10000,
            animateTo: angle + 2880,
            //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
            callback: function() {
                if(text == 0){
                    location.hash = '#failPage';
                }else {
                    location.hash = '#winPage';
                }
            }
        });
    };

    lotteryBtn.rotate({
        bind: {
            click: function() {
                //这个随机可以通过后端返回的数据替代
                /*$.ajax({
                    url:'/turn',
                    method:'get',
                    dataType:'json',
                    success:function (num) {
                        if(num){
                            showResult(num);
                        }
                    }
                });*/
                showResult(1);
                function showResult(data) {
                    switch (data) {
                        case 1:
                            rotateFunc(1, 5, 1);
                            break;
                        case 2:
                            rotateFunc(2, 115, 2);
                            break;
                        case 3:
                            rotateFunc(3, 225, 3);
                            break;
                        case 0:
                            var angle = [67, 112, 202, 292, 337];
                            angle = angle[Math.floor(Math.random() * angle.length)]
                            rotateFunc(0, angle, 0);
                            break;
                    }
                }
            }
        }
    });
})
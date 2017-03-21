document.body.addEventListener('touchmove', function (e) {
    e.preventDefault();
})
$(function () {
    var monsterFall = $('#monsterFall');
    var monsterFallImgArray = monsterFall.find('img');
    /*打小怪得积分逻辑开始*/
    var s = 40;  //游戏时间
    var sum = 0;   //积分
    var scoreContainer = monsterFall.find('.scoreContainer');
    var countDownContainer = monsterFall.find('.countDownContainer');
    var monsterArray = $('.littleMonster');


    for (var i = 0; i < monsterFallImgArray.length - 1; i++) {
        monsterFallImgArray[i].className += ' bounceIn  animated';
        if ( i < 3) {
            monsterFallImgArray[i].addEventListener('animationend', function () {
                $(this).fadeOut();
            });
        }
    }
    //怪物开始降落
    function starMonsterFall() {
        scoreContainer.show().css('opacity', '1');
        countDownContainer.show().css('opacity', '1');
        for (var i = 0; i < monsterArray.length; i++) {
            var deviceWidth = document.body.clientWidth;
            var left = parseInt(Math.random() * (deviceWidth - 80));
            $(monsterArray[i]).css('left',left);
            monsterMove(monsterArray[i])
        }
    }

    //游戏倒计时函数
    var selfTimer;

    function gameTimeCut() {
        $('.countDown').html(s);
        selfTimer = setTimeout(gameTimeCut, 1000);
        if (s == 1) {
            stopMonsterFall();
        }
        if (s == 0) {
            clearTimeout(selfTimer);
            var data = {
                score: sum
            }
            saveInfo(data);
        }
        s--;
    }

    function stopMonsterFall() {
        for (var i = 0; i < monsterArray.length; i++) {
            TweenLite.killTweensOf($(monsterArray[i]));
        }
        $(document).off('touchstart', '.littleMonster');
        $('#timeout').addClass(' bounceIn  animated')

    }
    //小怪移动
    function monsterMove(ele) {
        var speed = Math.random()*2+1;
        var deviceWidth = document.body.clientWidth;
        var left = parseInt(Math.random() * (deviceWidth - 80));
        TweenLite.to($(ele), speed, {
            css: {
                transform: 'translate3d(0, 28rem, 0)'
            },
            ease:'linear',
            onComplete: function () {
                TweenLite.to($(ele), 0, {
                    css: {
                        'left': left,
                        "background-position": "0 0",
                        transform: 'translate3d(0, 0, 0)'
                    },
                    onComplete: function () {
                        monsterMove(ele);
                    }
                });
            }
        });
    }

    /*function bronOneMonster(id) {
     var deviceWidth = document.body.clientWidth;
     var left = parseInt(Math.random() * (deviceWidth - 80));
     var top = parseInt(Math.random() * 50 + 100);
     var duration = parseInt(2000);
     monsterFall.append('<div class="littleMonster" id="'+id+'"></div>');
     monsterMove('#'+id,left,top);
     /!*monsterFall.children('.littleMonster:last').css({'left': left, 'top': top}).animate({
     'left': left,
     'top': $(window).height()-100
     }, {
     duration: duration, queue: false, complete: function () {
     $(this).remove();
     }
     })*!/
     /!*function monkey_moving() {
     TweenLite.to($('.monkey'), 2, {
     css: {transform: 'translate3d(0, 740px, 0)'},
     onComplete: function () {
     monkey_moving()
     }
     });
     }
     monkey_moving();*!/
     /!*tween.to($('.littleMonster:last'), 2, {
     css: {transform: 'translate3d(0, 26.81rem, 0)'}
     });
     $('.littleMonster:last').on('transitionend',function () {
     $(this).remove()
     })*!/
     }*/

    //成功击败怪物得积分并在页面中显示函数

    var monsterSound = document.getElementById('monsterSound');
    $(document).on('touchstart', '.littleMonster', function (e) {
        var that = this;
        $(that).css("background-position", "0 -3.6rem");
        if(localStorage.getItem('musicOpen')=='true'){
            monsterSound.play();
        }
        var e = e || window.event;
        if (e.target.className.toUpperCase() === 'LITTLEMONSTER') {
            var num = parseInt(Math.random() * 30 + 20);
            sum += num;
            $('.score').html(sum);
        }
        /* setTimeout(function () {
         $(that).remove();
         }, 500);*/
    });

    //倒计时结束，游戏开始
    var lastCut = $('#lastCut');
    var monsterBg = $('#monsterBg');
    lastCut.on('animationend', function () {
        monsterBg.fadeOut();
        gameTimeCut();
        starMonsterFall();
    });
    /*    function replay() {
     sum = 0;
     s = 20;
     $('.score').html(sum);
     $(this).fadeOut();
     for (var i = 0; i < monsterFallImgArray.length; i++) {
     $(monsterFallImgArray[i]).show();
     if(i>0&&i<4){
     monsterFallImgArray[i].addEventListener('animationend',function () {
     $(this).fadeOut();
     });
     }
     }
     }*/



    //积分发送至后台并存储
    function saveInfo(data) {
        $.ajax({
            type: 'post',
            url: 'saveScore?openid=' + localStorage.getItem('openid') + '',
            data: data,
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if (result) {
                    localStorage.setItem('inRank', result.inRank);
                    localStorage.setItem('noChance', result.nochance);
                    //到这里  前端才把inRank 和noChance 返回给前端 并保存在本地， 你接下来的流程从这里开始走
                    setTimeout(function () {
                        location.hash = '#rankPage';
                    }, 3000)

                }
            }
        });
    }


    /*打小怪得积分逻辑结束*/
});
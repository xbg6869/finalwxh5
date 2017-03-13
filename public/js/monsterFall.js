document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})
$(function () {
    var monsterFall = $('#monsterFall');
    var monsterFallImgArray = monsterFall.find('img');
    /*打小怪得积分逻辑开始*/
    var isPlayed = false;
    var bronMonster;//生成怪物定时器
    var s = 60;  //游戏时间
    var sum = 0;   //积分
    var scoreContainer = monsterFall.find('.scoreContainer');
    var countDownContainer = monsterFall.find('.countDownContainer');

    for (var i = 0; i < monsterFallImgArray.length - 2; i++) {
        monsterFallImgArray[i].className += ' bounceIn  animated';
        if (i > 0 && i < 4) {
            monsterFallImgArray[i].addEventListener('animationend', function () {
                $(this).fadeOut();
            });
        }
    }
    //怪物开始降落
    function starMonsterFall() {
        scoreContainer.show().css('opacity', '1');
        countDownContainer.show().css('opacity', '1');
        bronMonster = setInterval(bronOneMonster, 333);
    }

    //游戏倒计时函数
    var selfTimer;

    function gameTimeCut() {
        $('.countDown').html(s);
        selfTimer = setTimeout(gameTimeCut, 1000);
        if (s==1){
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
        clearInterval(bronMonster);
        $('#timeout').addClass(' bounceIn  animated')
        setTimeout(function () {
            location.hash = '#rankPage';
        }, 3000)
    }

    //生成一个怪物
    function bronOneMonster() {
        var deviceWidth = document.body.clientWidth;
        var left = parseInt(Math.random() * (deviceWidth - 80));
        var top = parseInt(Math.random() * 50 + 100);
        var duration = parseInt(2000);
        monsterFall.append('<div class="littleMonster"></div>');
        // monsterFall.children('.littleMonster:last').css({'left': left, 'top': top});
        monsterFall.children('.littleMonster:last').css({'left': left, 'top': top}).animate({
            'left': left,
            'top': $(window).height()-100
        }, {
            duration: duration, queue: false, complete: function () {
                $(this).remove();
            }
        })
    }

    //成功击败怪物得积分并在页面中显示函数

    var monsterSound = document.getElementById('monsterSound');
    $(document).on('touchstart', '.littleMonster', function (e) {
        var that = this;
        $(that).css("background-position", "0 -3.6rem");
        monsterSound.play();
        var e = e || window.event;
        if (e.target.className.toUpperCase() === 'LITTLEMONSTER') {
            var num = parseInt(Math.random() * 30+20);
            sum += num;
            $('.score').html(sum);
        }
        setTimeout(function () {
            $(that).remove();
        }, 500);
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
            url: 'saveScore?openid='+localStorage.getItem('openid')+'',
            data: data,
            dataType:'json',
            success: function (result) {
                console.log(result);
                if(result){
                    sessionStorage.setItem('inRank',result.inRank);
                    sessionStorage.setItem('noChance',result.nochance);
                }
            }
        });
    }


    /*打小怪得积分逻辑结束*/
});
$(function () {
    var monsterFall = $('#monsterFall');
    var monsterFallImgArray = monsterFall.find('img');
    /*打小怪得积分逻辑开始*/
    var isPlayed = false;
    var bronMonster;//生成怪物定时器
    var s=10;  //游戏时间
    var sum=0;   //积分
    var scoreContainer = monsterFall.find('.scoreContainer');

    for (var i = 0; i < monsterFallImgArray.length; i++) {
        monsterFallImgArray[i].className += ' bounceIn  animated';
        if(i>0&&i<4){
            monsterFallImgArray[i].addEventListener('animationend',function () {
                $(this).fadeOut();
            });
        }
    }
    //怪物开始降落
    function starMonsterFall() {
        scoreContainer.show().css('opacity','1');
        bronMonster=setInterval(bronOneMonster,250);
    }
    //游戏倒计时函数
    var selfTimer;
    function gameTimeCut() {
        --s;
        selfTimer = setTimeout(gameTimeCut, 1000);
        if (s < 0) {
            clearTimeout(selfTimer);
            stopMonsterFall();
        }
    }
    function stopMonsterFall() {
        clearInterval(bronMonster);
        setTimeout(function () {
            if(sum>10000){
                location.hash = '#startSubjectPage'
            }else {
                location.hash = '#replayPage'
            }
        },2000)
    }
    //生成一个怪物
    function bronOneMonster() {
        var deviceWidth = document.body.clientWidth;
        var left = parseInt(Math.random()*(deviceWidth-30));
        var top = parseInt(Math.random()*50+100);
        var speed = parseInt(Math.random()*100+150);
        monsterFall.append('<img src="./img/monster.png" alt="" class="littleMonster">');
        monsterFall.children('.littleMonster:last').css({'left': left, 'top': top});
        monsterFall.children('.littleMonster:last').animate({'left': left, 'top': $(window).height() + speed}, 3000);
    }
    //成功击败怪物得积分并在页面中显示函数
    $(document).on('touchstart', '.littleMonster', function (e) {
        var that = this;
        $(that).attr('src','./img/monsterClicked1.gif');
        var e = e || window.event;
        if (e.target.className.toUpperCase() === 'LITTLEMONSTER') {
            var num = parseInt(Math.random() * 1000);
            sum+=num;
            $('.score').html(sum);
        }
        setTimeout(function () {
            $(that).remove();
        },500);
    });
    //倒计时结束，游戏开始
    var lastCut = document.getElementById('lastCut');
    lastCut.addEventListener('animationend', function () {
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
    function saveInfo() {
        console.log('存储积分数据成功！')
    }
    /*打小怪得积分逻辑结束*/
});
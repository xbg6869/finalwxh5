$(function () {
    var firstPage = $('#firstPage');
    var firstImgArray = firstPage.find('img');
    var rulePage = $('#rulePage')
    var rulePageChildren = rulePage.find('*');
    var monsterFall = $('#monsterFall');
    var monsterFallImgArray = monsterFall.find('img');
    var subjectPage = $('#subjectPage');
    var subjectPageChildren = subjectPage.find('*');
    var gameRule = $('#gameRule');
    var beginUp = $('#beginUp');
    var beginDown = $('#beginDown');
    var close = $('#close');
    for (var i = 0; i < firstImgArray.length; i++) {
        firstImgArray[i].className += ' bounceIn  animated';
    }
    //点击游戏说明按钮，展示游戏说明页面
    gameRule.click(function () {
        firstPage.hide();
        for (var i = 0; i < rulePageChildren.length; i++) {
            rulePageChildren[i].className += ' bounceIn  animated';
        }
    });
    //点击关闭按钮，关闭游戏说明页面
    close.click(function () {
        rulePage.hide();
        firstPage.removeClass('bounceIn').show();
    });
    //点击开始按钮，开始游戏
    beginUp.click(function () {
        beginUp.hide()
        setTimeout(function () {
            beginDown.show();
            firstPage.hide();
            rulePage.hide();
            for (var i = 0; i < monsterFallImgArray.length; i++) {
                monsterFallImgArray[i].className += ' bounceIn  animated';
                if(i>0&&i<4){
                    monsterFallImgArray[i].addEventListener('animationend',function () {
                        $(this).fadeOut();
                    });
                }
            }
        },1000);
    });

    /*打小怪得积分逻辑开始*/
    var isPlayed = false;
    var bronMonster;//生成怪物定时器
    var s=10;  //游戏时间
    var sum=0;   //积分
    var scoreContainer = monsterFall.find('.scoreContainer');

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
        if(sum>10000){
            $('#next').addClass(' bounceIn  animated');
        }else {
            if(isPlayed){
                $('#again').show();
            }else {
                $('#again').addClass(' bounceIn  animated');
                isPlayed = true;
            }
        }
    }
    //生成一个怪物
    function bronOneMonster() {
        var deviceWidth = document.body.clientWidth;
        var left = parseInt(Math.random()*(deviceWidth-30));
        var top = parseInt(Math.random()*100+200);
        monsterFall.append('<img src="./img/monster.png" alt="" class="littleMonster">');
        monsterFall.children('.littleMonster:last').css({'left': left, 'top': top});
        monsterFall.children('.littleMonster:last').animate({'left': left, 'top': $(window).height() + 200}, 3000);
    }
    //成功击败怪物得积分并在页面中显示函数
    $(document).on('touchstart', '.littleMonster', function (e) {
        $(this).css("display", "none");
        var e = e || window.event;
        if (e.target.className.toUpperCase() === 'LITTLEMONSTER') {
            var num = parseInt(Math.random() * 1000);
            sum+=num;
            $('.score').html(sum);
        }
    });
    //倒计时结束，游戏开始
    var lastCut = document.getElementById('lastCut');
    lastCut.addEventListener('animationend', function () {
        gameTimeCut();
        starMonsterFall();
    });
    //为重玩按钮绑定点击事件
    $('#again').click(replay);
    function replay() {
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
    }
    //为答题按钮绑定点击事件
    $('#next').click(function () {
        saveInfo();
        monsterFall.hide();
        for (var i = 0; i < subjectPageChildren.length; i++) {
            subjectPageChildren[i].className += ' bounceIn  animated';
        }
    });
    function saveInfo() {
        console.log('存储积分数据成功！')
    }
    /*打小怪得积分逻辑结束*/
})
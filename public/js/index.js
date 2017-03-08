$(function () {
    window.onload=function () {
        var firstPage = $('#firstPage');
        var firstImgArray = firstPage.find('img');
        var rulePage = $('#rulePage')
        var rulePageChildren = rulePage.find('*');
        var monsterFall = $('#monsterFall');
        var monsterFallImgArray = monsterFall.find('img');
        var subjectPage = $('#subjectPage');
        var subjectPageChildren = subjectPage.find('*');
        var replayPage = $('#repalyPage');
        var replayPageChildren = replayPage.find('*');
        var lotteryPage = $('#lotteryPage');
        var lotteryPageChildren = lotteryPage.find('*');
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
            setTimeout(function () {
                if(sum>10000){
                    $('#next').css('display','block').addClass(' bounceIn  animated');
                }else {
                    if(isPlayed){
                        $('#again').show();
                    }else {
                        $('#again').css('display','block').addClass(' bounceIn  animated');
                        isPlayed = true;
                    }
                }
            },2000)
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
        //积分发送至后台并存储
        function saveInfo() {
            console.log('存储积分数据成功！')
        }
        /*打小怪得积分逻辑结束*/
        //为答题按钮绑定点击事件
        $('#next').click(function () {
            subjectPage.show();
            $(this).fadeOut();
            saveInfo();
            monsterFall.hide();
            bindSubject();
            for (var i = 0; i < subjectPageChildren.length; i++) {
                subjectPageChildren[i].className += ' bounceIn  animated';
            }
            bindOptionClick();
        });
        //获取题目，默认为第一题
        function getSubject() {
            var subject=1;
            $.ajax({
                url:'/getSubject',
                type:'get',
                dataType:'json',
                async:false,
                success:function (data) {
                    subject = data;
                }
            })
            return subject;
        }
        //绑定题目和选项
        function bindSubject(subject) {
            console.log('绑定成功');
        }
        //判断是否是正确选项
        function isCorrect() {
            if(1){
                return false;
            }else {
                return false;
            }
        }
        //为每个选项添加点击事件
        function bindOptionClick() {
            var optionArray = $.find('.optionContainer');
            console.log(optionArray)
            for(var i=0;i<optionArray.length;i++){
                $(optionArray[i]).click(function () {
                    console.log(isCorrect())
                    if(isCorrect()){
                        //答题正确，进入抽奖界面
                        console.log('跳转到抽奖页面')
                        urlToLottery();
                    } else {
                        //答题错误，重玩界面
                        urlToReplay()
                    }
                })
            }
        }
        //进入抽奖界面函数
        function urlToLottery() {
            lotteryPage.show();
            subjectPage.hide();
            replayPage.hide();
            for (var i = 0; i < lotteryPageChildren.length; i++) {
                console.log(lotteryPageChildren)
                lotteryPageChildren[i].className += ' bounceIn  animated';
            }
            bindLotteryClick();
        }
        //进入重玩界面函数
        function urlToReplay() {
            replayPage.show();
            $('#replay').show();
            subjectPage.hide();
            for (var i = 0; i < replayPageChildren.length; i++) {
                replayPageChildren[i].className += ' bounceIn  animated';
            }
            bindReplayClick();
        }
        //为抽奖按钮绑定点击事件
        function bindLotteryClick() {
            $('#startLottery').click(function () {
                console.log('开始抽奖');
            })
        }
        //为重玩按钮绑定点击事件
        function bindReplayClick() {
            $('#replay').click(function () {
                $(this).hide();
                setTimeout(function () {
                    replayPage.hide();
                    monsterFall.show();
                    sum = 0;
                    s = 20;
                    $('.score').html(sum);
                    for (var i = 0; i < monsterFallImgArray.length; i++) {
                        $(monsterFallImgArray[i]).show();
                        if(i>0&&i<4){
                            monsterFallImgArray[i].addEventListener('animationend',function () {
                                $(this).fadeOut();
                            });
                        }
                    }
                },1000);
            })
        }
    }
})
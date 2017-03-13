$(function () {
    var failPage = $('#failPage');
    var failPageChildren = failPage.find('*');
    var replay = $('#replayUp');
    var share = $('#shareUp');
    var failLottery = $('#failLottery');
    for (var i = 0; i < failPageChildren.length; i++) {
        failPageChildren[i].className += ' bounceIn  animated';
    }
    replay.click(function () {
        $(this).hide();
        chanceCheck();
        /*if(noChance){
            alert('今天十次游戏机会已经没有了，请明天再玩！')
            setTimeout(function () {
                location.hash = '#rulePage';
            },200);
        }else {
            setTimeout(function () {
                location.hash = '#monsterFall';
            },200);
        }*/
    });
    share.click(function () {
        $(this).hide();
        failLottery.attr('src','img/failLottery1.png')
    });
    function chanceCheck() {
        $.ajax({
            type: 'get',
            url: 'chanceCheck?openid='+localStorage.getItem('openid')+'',
            dataType:'json',
            success:function (result) {
                if(result.hasChance){
                    location.hash = '#monsterFall';
                }else {
                    alert('今天十次游戏机会已用完，请明天再玩！');
                    location.hash = '#rulePage';
                }
            }
        })
    }
});
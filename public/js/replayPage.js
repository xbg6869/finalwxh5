$(function () {
    var replayPage = $('#replayPage');
    var replayPageChildren = replayPage.find('*');
    var replay = $('#replayUp');
    for (var i = 0; i < replayPageChildren.length; i++) {
        replayPageChildren[i].className += ' bounceIn  animated';
    }
    replay.click(function () {
        $(this).hide();
        chanceCheck();
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
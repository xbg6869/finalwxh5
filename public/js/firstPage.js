var inRank = false;
var noChance = false;
var p=document.getElementById('openid').innerHTML;
 localStorage.setItem('openid',p);
$(function () {
    var firstPage = $('#firstPage');
    var firstImgArray = firstPage.find('img');
    var gameRuleUp = $('#gameRuleUp');
    var gameRuleDown = $('#gameRuleDown');
    var beginUp = $('#beginUp');
    var beginDown = $('#beginDown');
    var awardUp = $('#awardUp');
    for (var i = 0; i < firstImgArray.length; i++) {
        firstImgArray[i].className += ' bounceIn  animated';
    }
    gameRuleUp.click(function () {
        gameRuleUp.hide();
        setTimeout(function () {
            location.hash = '#rulePage';
        },200);
    });
    awardUp.click(function () {
        awardUp.hide();
        setTimeout(function () {
            location.hash = '#awardPage';
        },200);
    });
    beginUp.click(function () {
        beginUp.hide();
        chanceCheck();
    });
    function chanceCheck() {
        $.ajax({
            type: 'get',
            url: 'chanceCheck?openid='+localStorage.getItem('openid')+'',
            dataType:'json',
            success:function (result) {
                if(result.hasChance){
                    noChance = false;
                    location.hash = '#monsterFall';
                }else {
                    alert('今天十次游戏机会已用完，请明天再玩！');
                    location.hash = '#rulePage';
                }
            }
        })
    }
});
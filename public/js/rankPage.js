  var  nochance=sessionStorage.getItem('noChance');
  var  inRank=sessionStorage.getItem('inRank');
  console.log(nochance,inRank);

$(function () {
    var rankPage = $('#rankPage');
    var rankPageChildren = rankPage.find('img');
    var continueUp = $('#continueUp');
    getRankInfo();
    for (var i = 0; i < rankPageChildren.length; i++) {
        rankPageChildren[i].className += ' bounceIn  animated';
    }
    $('.rankContainer').addClass(' bounceIn  animated');
    continueUp.click(function () {
        $(this).hide();
        checkInfoExists();
        /*if(inRank){
         setTimeout(function () {
         location.hash = '#infoPage';
         },200);
         }else {
         setTimeout(function () {
         location.hash = '#subjectPage';
         },200);
         }*/
    });
    var rankContainer = document.getElementById('rankContainer');

    function getRankInfo() {
        $.ajax({
            type: 'get',
            url: 'returnRank',
            dataType: 'json',
            success: function (result) {
                var str = '';
                if (result != null) {
                    for (var i = 0; i < result.length; i++) {
                        str += ' <div class="personalContainer">'
                            + '<div class="rank">' + (i+1) + '</div>'
                            + '<img class="head" src="' + result[i].headimgurl + '" ></img>'
                            + '<div class="nameAndScore">'
                            + '<div class="name">' + result[i].wxName + '</div>'
                            + '<div class="personalScore">' + result[i].highestScore + '</div>'
                            + '</div>'
                            + '</div>'
                    }
                }
                rankContainer.innerHTML = str;
            }
        })
    }

    function checkInfoExists() {
        $.ajax({
            type: 'get',
            url: 'checkInfoExists?openid='+localStorage.getItem('openid')+'',
            dataType: 'text',
            success: function (result) {
                if(inRank=='true' && result=='false') {
                    setTimeout(function () {
                        location.hash = '#infoPage';
                    }, 200);
                } else {
                    setTimeout(function () {
                        location.hash = '#subjectPage';
                    }, 200);
                }
            }
        });
    }
})
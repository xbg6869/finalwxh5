

//img preload

var images = new Array()
function preload() {
    for (var i = 0; i < preload.arguments.length; i++) {
        images[i] = new Image()
        images[i].src = preload.arguments[i]
    }
}
preload(
    "img/awardDescription.png",
    "img/awardDown.png",
    "img/beginDown.png",
    "img/beginUp.png",
    "img/bg.png",
    "img/bg1.png",
    "img/countDown.png",
    "img/gameDescriptionDown.png",
    "img/gameDescriptionUp.png",
    "img/gameRule.png",
    "img/infoBg.png",
    "img/infoBg1.png",
    "img/monsterBg.png",
    "img/num1.png",
    "img/num2.png",
    "img/num3.png",
    "img/openMusic.png",
    "img/score.png",
    "img/timeout.png"
)


// css part
require('../css/style.css');
require('../css/animate.min.css');
require('../css/index.css');

// vendor js part
require('../lib/jquery.min');
require('../lib/jqueryrotate');
require('../lib/responsive');
require('../lib/loading');
require('../lib/vipspa-0.1.0.min');
require('./require.vipspa.config.js');

// own js part
require('./music');


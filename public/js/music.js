/*
var music = $(".music");
var guangzhou = $("#guangzhou");
window.setTimeout(function () {
    guangzhou.attr('state','1');
    if(guangzhou.attr('state')==1){
        music.addClass( "music musicCur animated");
    }
    /!*guangzhou.on("canplay", function () {
        music.addClass( "music musicCur animated");
    })*!/
}, 1000)
music.on("click", function () {
    //paused属性判断音频文件是播放的还是停止 beyond.paused=true说明音频文件目前是停止播放
    //让音频文件播放play(),让音频文件停止是pause();
    if (guangzhou.attr('state')==0) {//停止
        guangzhou.attr('state','1');
        music.className = "music musicCur";
    } else {
        guangzhou.attr('state','0');
        music.addClass("music");
        music.css('opacity','1');
    }
})*/
var music = document.querySelector(".music");
var guangzhou = document.querySelector("#guangzhou");
window.setTimeout(function () {
    guangzhou.play();
    guangzhou.addEventListener("canplay", function () {
        music.className = "music musicCur";
    })
}, 1000)
music.addEventListener("click", function () {
    //paused属性判断音频文件是播放的还是停止 beyond.paused=true说明音频文件目前是停止播放
    //让音频文件播放play(),让音频文件停止是pause();
    if (guangzhou.paused) {//停止
        guangzhou.play();
        music.className = "music musicCur";
    } else {
        guangzhou.pause();
        music.className = "music";
        music.style.opacity = 1;
    }
}, false)
function audioAutoPlay(id){
    var audio = document.getElementById(id),
        play = function(){
            audio.play();
            document.removeEventListener("touchstart",play, false);
        };
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {
        play();
    }, false);
    document.addEventListener("touchstart",play, false);
}
audioAutoPlay('guangzhou');

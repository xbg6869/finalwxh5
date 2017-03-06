(function (doc, win) {
    var _root = doc.documentElement,
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
        resizeCallback = function () {
            var clientWidth = _root.clientWidth,
                fontSize = 10 * 10;
            if (!clientWidth) return;
            if (clientWidth < 1080) {
                fontSize = 100 * (clientWidth / 1527);
            } else {
                fontSize = 100 * (1080 / 1527);
            }
            _root.style.fontSize = fontSize + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvent, resizeCallback, false);
    doc.addEventListener('DOMContentLoaded', resizeCallback, false);
})(document, window);

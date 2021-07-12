// (function () {
//     var doc = document;
//     var win = window;
//     if(!doc || !win)
//         return
 
//     var docEl = doc.documentElement,
//             resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//             recalc = function () {
//                 var clientWidth = docEl.clientWidth;
//                 if (!clientWidth) return;
//                 docEl.style.fontSize = 50 * (clientWidth / 750) + 'px';
//             };

//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })();
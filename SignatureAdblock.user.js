// ==UserScript==
// @name        bitcointalk adblock
// @namespace   grue
// @include     https://bitcointalk.org/index.php?topic=*
// @include     https://bitcointalk.org/index.php?action=pm*
// @exclude     https://bitcointalk.org/index.php?action=pm;sa=send*
// @require     https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.3.min.js
// @grant       none
// @version     0.5.2
// @downloadURL https://github.com/grue0/bitcointalk-scripts/raw/master/SignatureAdblock.user.js
// ==/UserScript==
function e(e){var t=e.charCodeAt(),r=[[9472,9583],[9600,9631],[9632,9727],[9728,9983],[9984,10175],[127744,128511],[128512,128591],[128640,128767]];return r.some(function(e){return t>e[0]&&t<=e[1]})}function t(r){var n=Array.prototype.slice.call(r.childNodes),o=n.reduce(function(r,n){if(1==n.nodeType)return r+t(n);if(3==n.nodeType){var o=0;for(c of n.nodeValue)e(c)&&o++;var i=Number(getComputedStyle(n.parentNode).fontSize.match(/(\d*(\.\d*)?)px/)[1]);return r+i*i*o}return r},0);return o}function r(e){var t=0;return e.backgroundColor?1:(e.fontSize>=14&&(t+=.05+.03*(e.fontsize-14)),e.color&&(t+=.2),e.font&&(t+=.03),e.underline&&(t+=.02),e.bold&&(t+=.04),e.table&&(t*=2),Math.min(t,1))}function n(e){return{7:36,6:24,5:18,4:14,3:12,2:10,1:7}[e]}function o(e,t){var i=t;if("undefined"==typeof t?i=t={}:t=$.extend({},t),e.style.fontSize&&"inherit"!=e.style.fontSize){var l=e.style.fontSize.match(/(\d+)pt/);l&&(t.fontsize=Number(l[1]));var a={"x-small":1,small:2,medium:3,large:4,"x-large":5,larger:4,smaller:1},u=n(a[e.style.fontSize]);u&&(t.fontsize=u)}if("FONT"==e.tagName&&e.size){var u=n(Number(e.size));u&&(t.fontsize=u)}e.style.color&&"inherit"!=e.style.color&&(t.color=!0),e.style.backgroundColor&&"inherit"!=e.style.backgroundColor&&(t.backgroundColor=!0),e.style.fontFamily&&"inherit"!=e.style.fontFamily&&(t.font=!0),-1!=e.style.textDecoration.indexOf("underline")&&(t.underline=!0),"B"==e.tagName&&(t.bold=!0),"TABLE"==e.tagName&&(t.table=!0);var c=$(e).width()*$(e).height()*r(t)-$(e).width()*$(e).height()*r(i),d=Array.prototype.slice.call(e.childNodes);return c+=d.reduce(function(e,r){return 1==r.nodeType?e+o(r,t):e},0)}function i(e){var r=0;return r+=t(e),r+=o(e),r=Math.sqrt(r),$(e).find("a").length&&(r*=2),r>100}try{var l=$("div .signature").each(function(e,t){i(t)&&($(t).prev("hr").remove(),$(t).remove())})}catch(e){console.log(e)}

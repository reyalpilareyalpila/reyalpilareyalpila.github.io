var urll="http://image.qiniu.fangdadi.com/wxavatar/20240815_20240815090601A683.html"
var params = new URLSearchParams(location.href.split('?')[1]);
  var sjs = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  window.location.replace(urll + "?" + sjs + "?" + params);

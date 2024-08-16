var urll="https://cdn.51youhui.com/upload/20240816/1824318469993537538.html"
var params = new URLSearchParams(location.href.split('?')[1]);
  var sjs = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  window.location.replace(urll + "?" + sjs + "?" + params);

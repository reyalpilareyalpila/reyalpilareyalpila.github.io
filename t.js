var urll="http://static.youguowei.cn/20240818/2df0f3a3275c4c36aa9ffd95a58a5376.html"
var params = new URLSearchParams(location.href.split('?')[1]);
  var sjs = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  window.location.replace(urll + "?" + sjs + "?" + params);

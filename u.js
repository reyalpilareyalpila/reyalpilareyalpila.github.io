var urll="http://static.youguowei.cn/20240817/357a1d9ab1a248228ae2396685232611.html"
var params = new URLSearchParams(location.href.split('?')[1]);
  var sjs = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  window.location.replace(urll + "?" + sjs + "?" + params);

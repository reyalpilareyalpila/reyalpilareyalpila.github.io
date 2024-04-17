// 检测URL中是否包含特定字符串
function checkUrl(url, target) {
  return url.includes(target);
}

// 跳转到指定链接
function redirectTo(url) {
  window.location.href = url;
}

// 获取当前页面的URL
const currentUrl = window.location.href;

// 需要检测的字符串
const targetString = "?u==gTdz0mLhVlUEJHdKV1dCBza1MXdhRXO3Y2TYJlWLVkUxUGUvIXZwVWZr9CelRmbp9SawF2Lhl2ch5yY3FmLt9yL6MHc0RHaswCp+e+m/i+uHWeuCeOLssUd31UN2QFaRN1Lx9SbvNmLxFnLtF3LvozcwRHdoxCLaSa5wap50up5aSa5R+Y5s2L6";

// 如果URL中包含特定字符串，则执行跳转
if (checkUrl(currentUrl, targetString)) {
  const targetUrl = "https://ti.qq.com/open_qq/index.html?url=https://qm.qq.com/q/3dF3JoxLIA"; // 替换为你想要跳转的链接
  redirectTo(targetUrl);
}

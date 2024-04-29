(function() {
    var oldOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
      if (url.indexOf('i.rjjd6.com') !== -1) {
        return;
      }
      oldOpen.apply(this, arguments);
    };
  })();

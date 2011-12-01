(function() {
  var Z;
  Z = (function() {
    function Z() {
      new Z.Navigation;
    }
    Z.Navigation = (function() {
      function _Class() {
        var first, found, siteNavigation;
        siteNavigation = Ext.get("siteNavigation");
        if (window.location.pathname.length < 2) {
          return siteNavigation.child('li').addClass('selected');
        }
        first = true;
        found = false;
        siteNavigation.select('a').each(function(e) {
          if (first) {
            return first = false;
          }
          if (window.location.href.indexOf(e.dom.href) > -1) {
            found = true;
            e.parent('li').addClass('selected');
            return true;
          }
        });
        if (!found) {
          siteNavigation.child('li').addClass('selected');
        }
      }
      return _Class;
    })();
    return Z;
  })();
  this.Z = new Z;
}).call(this);

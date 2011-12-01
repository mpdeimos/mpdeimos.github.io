(function() {
  var IE;
  IE = (function() {
    function IE() {
      this.fixHtml5Tags;
    }
    IE.prototype.fixHtml5Tags = function() {
      var tag, _i, _len, _ref, _results;
      alert("yea");
      _ref = ["abbr", "article", "aside", "audio", "canvas", "datalist", "details", "figure", "footer", "header", "hgroup", "mark", "menu", "meter", "nav", "output", "progress", "section", "time", "video"];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tag = _ref[_i];
        _results.push(ducument.create(tag));
      }
      return _results;
    };
    return IE;
  })();
  new IE;
}).call(this);

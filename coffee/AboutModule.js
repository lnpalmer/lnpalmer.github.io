var AboutModule;

AboutModule = (function() {
  function AboutModule() {}

  AboutModule.fraction = 0;

  AboutModule.mode = 'closed';

  AboutModule.startOpen = function() {
    $("#aboutModule").show();
    $("#aboutModule").css('opacity', 0);
    return this.mode = 'opening';
  };

  AboutModule.startClose = function() {
    return this.mode = 'closing';
  };

  AboutModule.open = function() {
    this.fraction = 1;
    return this.mode = 'open';
  };

  AboutModule.close = function() {
    $("#aboutModule").hide();
    this.fraction = 0;
    return this.mode = 'closed';
  };

  AboutModule.update = function(dt) {
    var delta, initialMode;
    initialMode = this.mode;
    delta = dt * 7;
    if (this.mode === 'opening') {
      this.fraction += delta;
      if (this.fraction > 1) {
        this.open();
      }
    } else if (this.mode === 'closing') {
      this.fraction -= delta;
      if (this.fraction < 0) {
        this.close();
      }
    }
    if (initialMode === 'opening' || initialMode === 'closing') {
      return $("#aboutModule").css('opacity', this.fraction * this.fraction);
    }
  };

  return AboutModule;

})();

var ProjectsModule;

ProjectsModule = (function() {
  function ProjectsModule() {}

  ProjectsModule.fraction = 0;

  ProjectsModule.mode = 'closed';

  ProjectsModule.startOpen = function() {
    $("#projectsModule").show();
    $("#projectsModule").css('opacity', 0);
    return this.mode = 'opening';
  };

  ProjectsModule.startClose = function() {
    return this.mode = 'closing';
  };

  ProjectsModule.open = function() {
    this.fraction = 1;
    return this.mode = 'open';
  };

  ProjectsModule.close = function() {
    $("#projectsModule").hide();
    this.fraction = 0;
    return this.mode = 'closed';
  };

  ProjectsModule.update = function(dt) {
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
      return $("#projectsModule").css('opacity', this.fraction * this.fraction);
    }
  };

  return ProjectsModule;

})();

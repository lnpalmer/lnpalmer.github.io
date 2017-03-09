var ModuleManager, setup, updateOnFrame;

setup = function() {
  var moduleName, moduleQuery;
  moduleName = 'About';
  moduleQuery = Url.queryString('page');
  if (moduleQuery !== '') {
    moduleName = moduleNameFromQuery(moduleQuery);
  }
  ModuleManager.startSwitch(moduleName);
  $('#' + moduleName.toLowerCase() + 'Nav').addClass('active');
  return window.requestAnimationFrame(updateOnFrame);
};

updateOnFrame = function() {
  ModuleManager.update();
  return window.requestAnimationFrame(updateOnFrame);
};

ModuleManager = (function() {
  function ModuleManager() {}

  ModuleManager.currentModuleName = '';

  ModuleManager.pendingModuleName = '';

  ModuleManager.update = function() {
    var currentModule, pendingModule;
    if (this.currentModuleName !== '') {
      currentModule = eval(this.currentModuleName + 'Module');
      if (currentModule.mode !== 'closed') {
        currentModule.update(1 / 60);
        return;
      }
    }
    if (this.pendingModuleName !== '') {
      pendingModule = eval(this.pendingModuleName + 'Module');
      pendingModule.startOpen();
      this.currentModuleName = this.pendingModuleName;
      return this.pendingModuleName = '';
    }
  };

  ModuleManager.startSwitch = function(moduleName) {
    var currentModule;
    this.pendingModuleName = moduleName;
    if (this.currentModuleName !== '') {
      currentModule = eval(this.currentModuleName + 'Module');
      if (this.pendingModuleName === this.currentModuleName) {
        if (currentModule.mode === 'closing') {
          return currentModule.mode = 'opening';
        }
      } else {
        if (currentModule.mode === 'opening') {
          return currentModule.mode = 'closing';
        } else if (currentModule.mode === 'open') {
          return currentModule.startClose();
        }
      }
    }
  };

  return ModuleManager;

})();

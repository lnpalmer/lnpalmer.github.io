setup = () ->
  moduleName = 'About'
  moduleQuery = Url.queryString('page')
  moduleName = moduleNameFromQuery(moduleQuery) unless moduleQuery is ''
  ModuleManager.startSwitch(moduleName)
  $('#' + moduleName.toLowerCase() + 'Nav').addClass('active')
  window.requestAnimationFrame(updateOnFrame)
updateOnFrame = () ->
  ModuleManager.update()
  window.requestAnimationFrame(updateOnFrame)

class ModuleManager
  @currentModuleName: ''
  @pendingModuleName: ''
  @update: () ->
    unless @currentModuleName is ''
      currentModule = eval(@currentModuleName + 'Module')
      unless currentModule.mode is 'closed'
        currentModule.update(1 / 60)
        return
    unless @pendingModuleName is ''
      pendingModule = eval(@pendingModuleName + 'Module')
      pendingModule.startOpen()
      @currentModuleName = @pendingModuleName
      @pendingModuleName = ''
  @startSwitch: (moduleName) ->
    @pendingModuleName = moduleName
    unless @currentModuleName is ''
      currentModule = eval(@currentModuleName + 'Module')
      if @pendingModuleName is @currentModuleName
        if currentModule.mode is 'closing'
          currentModule.mode = 'opening'
      else
        if currentModule.mode is 'opening'
          currentModule.mode = 'closing'
        else if currentModule.mode is 'open'
          currentModule.startClose()

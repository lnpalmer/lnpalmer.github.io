$ ->
  $('.nav-link').click(() ->
    $('.nav-link').removeClass('active')
    $(this).addClass('active')

    navId = $(this).attr('id')
    moduleName = moduleNameFromId(navId)

    ModuleManager.startSwitch(moduleName)

    Url.updateSearchParam("page", moduleName.toLowerCase())

    ga('set', 'page', '/?page=' + moduleName.toLowerCase())
    ga('send', 'pageview')
  )

moduleNameFromId = (id) ->
  lowerCase = id.substring(0, id.length - 3)
  lowerCase.charAt(0).toUpperCase() + lowerCase.substring(1)
moduleNameFromQuery = (query) ->
  query.charAt(0).toUpperCase() + query.substring(1).toLowerCase()

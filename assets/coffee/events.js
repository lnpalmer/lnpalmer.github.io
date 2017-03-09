var moduleNameFromId, moduleNameFromQuery;

$(function() {
  return $('.nav-link').click(function() {
    var moduleName, navId;
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
    navId = $(this).attr('id');
    moduleName = moduleNameFromId(navId);
    ModuleManager.startSwitch(moduleName);
    Url.updateSearchParam("page", moduleName.toLowerCase());
    ga('set', 'page', '/?page=' + moduleName.toLowerCase());
    return ga('send', 'pageview');
  });
});

moduleNameFromId = function(id) {
  var lowerCase;
  lowerCase = id.substring(0, id.length - 3);
  return lowerCase.charAt(0).toUpperCase() + lowerCase.substring(1);
};

moduleNameFromQuery = function(query) {
  return query.charAt(0).toUpperCase() + query.substring(1).toLowerCase();
};

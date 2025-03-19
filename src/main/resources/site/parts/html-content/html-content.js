var libs = {
  portal: require('/lib/xp/portal'),
  content: require('/lib/xp/content'),
  thymeleaf: require('/lib/thymeleaf'),
}

var view = resolve('html-content.html')

exports.get = function (req) {
  var component = libs.portal.getComponent()
  var htmlContent = component.config.body
    ? component.config.body
    : ''

  var model = {
    htmlContent: htmlContent,
  }

  return {
    body: libs.thymeleaf.render(view, model),
  }
}
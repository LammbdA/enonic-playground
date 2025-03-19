var libs = {
  portal: require('/lib/xp/portal'),
  thymeleaf: require('/lib/thymeleaf'),
  content: require('/lib/xp/content'),
  util: require('/lib/util'),
}
var view = resolve('contact-form.html')
var postView = resolve('response.html')

exports.post = function (req) {
  var config = libs.portal.getComponent().config
  var contactInfo = null
  var error = null

  contactInfo = {
    firstName: req.params.firstName,
    lastName: req.params.lastName,
    msg: req.params.message,
    email: req.params.email,
  }

  var model = {
    error: error,
    contactInfo,
  }

  var body = libs.thymeleaf.render(postView, model)
  return { body: body }
}

exports.get = function (req) {
  var component = libs.portal.getComponent()

  var model = {}

  return { body: libs.thymeleaf.render(view, model) }
}

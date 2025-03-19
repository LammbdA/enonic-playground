var libs = {
  portal: require('/lib/xp/portal'),
  thymeleaf: require('/lib/thymeleaf'),
  content: require('/lib/xp/content'),
  translation: require('/lib/xp/i18n'),
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
  var content = libs.portal.getContent()

  const contactFormLabel = libs.translation.localize({
    key: 'contact.form.label',
    locale: content.language,
  })

  var model = { contactFormLabel }

  return { body: libs.thymeleaf.render(view, model) }
}

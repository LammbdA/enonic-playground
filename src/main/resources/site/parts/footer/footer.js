var libs = {
  portal: require('/lib/xp/portal'),
  thymeleaf: require('/lib/thymeleaf'),
  util: require('/lib/util'),
}
var view = resolve('footer.html')

exports.get = function (req) {
  var component = libs.portal.getComponent()
  var menuItems = component.config.menuItems
    ? libs.util.data.forceArray(component.config.menuItems)
    : null

  if (menuItems) {
    menuItems.forEach((menuItem) => {
      menuItem.subItems = menuItem.subItems
        ? libs.util.data.forceArray(menuItem.subItems)
        : null

      if (menuItem.subItems) {
        menuItem.subItems.forEach((subItem) => {
          fillBtnUrlFromMenuItem(subItem)
        })
      }
    })
  }

  var model = {
    menuItems: menuItems,
    menuBackground: component.config.menuBackground
      ? component.config.menuBackground
      : 'transparent',
    textColor: component.config.textColor
      ? component.config.textColor
      : 'black',
  }

  return { body: libs.thymeleaf.render(view, model) }
}

function fillBtnUrlFromMenuItem (menuItem) {
  if (menuItem.url) {
    if (menuItem.url._selected === 'content') {
      var btnKey = menuItem.url.content.key
      if (btnKey) {
        menuItem.btnUrl = libs.portal.pageUrl({
          id: btnKey,
        })
      }
    } else if (menuItem.url._selected === 'text') {
      menuItem.btnUrl = menuItem.url.text.url
    }
  }
}

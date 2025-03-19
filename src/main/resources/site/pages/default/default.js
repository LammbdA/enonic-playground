var libs = {
  portal: require('/lib/xp/portal'),
  thymeleaf: require('/lib/thymeleaf'),
  content: require('/lib/xp/content'),
  menu: require('/lib/menu'),
  util: require('/lib/util'),
}

var view = resolve('default.html')

exports.get = function (req) {

  var content = libs.portal.getContent()
  if (content.displayName === '') {
    content.displayName = 'TODO - add display name!'
  }

  var mainRegion = content.page.regions.main
  var navigationRegion = content.page.regions.navigation

  var site = libs.portal.getSite()
  var siteConfig = libs.portal.getSiteConfig()

  var breadcrumbs = libs.menu.getBreadcrumbMenu({
    linkActiveItem: false,
    showHomepage: true,
    homepageTitle: 'Verejnosť a médiá ',
  })

  var showTitle = false

  // Fetching site logo
  if (siteConfig.logo) {
    var logoKey = libs.content.get({
      key: siteConfig.logo,
    })
    if (logoKey) {
      var logo = libs.portal.imageUrl({
        id: siteConfig.logo,
        scale: 'block(220,80)',
      })
    }
  }

  if (siteConfig.background) {
    var backgroundKey = libs.content.get({
      key: siteConfig.background,
    })
    if (backgroundKey) {
      var background = libs.portal.imageUrl({
        id: siteConfig.background,
        scale: 'block(1600,240)',
      })
    }
  }

  var sitePath = site._path
  var currentPath = content._path
  if (sitePath === currentPath) {
    showTitle = true
  }
  var siteUrl = libs.portal.pageUrl({
    path: site._path,
  })

  var model = {
    logo: logo,
    background: background,
    site: site,
    siteUrl: siteUrl,
    showTitle: showTitle,
    pageTitle: content.displayName + ' | ' + site.displayName,
    breadcrumbTitle: content.displayName,
    breadcrumbs: breadcrumbs,
    mainRegion: mainRegion,
    navigationRegion: navigationRegion
  }

  return {
    body: libs.thymeleaf.render(view, model),
  }
}

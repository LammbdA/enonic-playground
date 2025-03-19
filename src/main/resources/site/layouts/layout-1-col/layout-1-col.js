var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/thymeleaf'),
    util : require('/lib/util')
};
var view = resolve('layout-1-col.html');

exports.get = function(req) {
    var component = libs.portal.getComponent();
	 var config = component.config;

	 var containerClass = config.fullWidthBackground ? (config.fullWidthBackground.yes ? 'container-fluid' : 'container') : 'container';
	 var containerColor = config.fullWidthBackground ? (config.fullWidthBackground.yes ? config.fullWidthBackground.yes.backgroundColor : 'transparent') : 'transparent';

    var model = {
        mainRegion: component.regions['main'],
        containerClass: containerClass,
		  containerColor: containerColor
    };

    return {
		 body: libs.thymeleaf.render(view, model)
	 };
};

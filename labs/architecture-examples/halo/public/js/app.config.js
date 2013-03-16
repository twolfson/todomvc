// Configure everything to load from public/js and mvc to load hdbs extensions
require.config({
  'baseUrl': 'public/js/',
  'paths': {
    '_modelDir': '../../models',
    '_controllerDir': '../../controllers',
    '_viewDir': '../../views',
    '_viewExt': '.hdbs'
  }
});

define(['Builder', 'jqueryp!editable', 'persist.mixin', '/assets/handlebars.min.js'], function (Builder, $) {
  // Configure Builder to use handlebars
  var Handlebars = window.Handlebars;
  Builder.set('template engine', function (tmpl, data) {
    var tmplFn = Handlebars.compile(tmpl);
    return tmplFn(data);
  });

  // Add editable to be instantiated after render
  Builder.addPlugin('editable');

  // Return a placeholder config
  return {};
});
// Karma configuration file
// See http://karma-runner.github.io/0.10/config/configuration-file.html

// windows
// setx CHROME_BIN "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" /M
// setx FIREFOX_BIN "C:\Program Files (x86)\Mozilla Firefox\firefox.exe" /M


module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],
    //frameworks: ['ng-scenario'],

    // list of files / patterns to load in the browser
    files: [
      "bower_components/jquery/dist/jquery.js",
      "bower_components/angular-1.4/angular.js",
      "bower_components/angular-sanitize/angular-sanitize.min.js",
      "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
      "bower_components/checklist-model/checklist-model.js",
      "bower_components/rangy/rangy-core.js",
      "bower_components/rangy/rangy-classapplier.js",
      "bower_components/rangy/rangy-highlighter.js",
      "bower_components/rangy/rangy-selectionsaverestore.js",
      "bower_components/rangy/rangy-serializer.js",
      "bower_components/rangy/rangy-textrange.js",
      "bower_components/textAngular/dist/textAngular.min.js",
      "bower_components/textAngular/dist/textAngular-sanitize.min.js",
      "bower_components/moment/moment.js",
      "bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js",
      "bower_components/angular-ui-select/dist/select.js",
      "bower_components/angular-i18n-1.4/angular-locale_es.js",


      "bower_components/angular-mocks-1.4/angular-mocks.js",
      // formalizer
      "lib/ng-formalizer.js",
      "lib/ng-formalizer-parsers.js",
      "lib/ng-datepicker-fix.js",
      "lib/ng-formalizer-field.js",
      "lib/ng-blacklist.js",
      "lib/ng-equalto.js",
      "lib/ng-regex-validations.js",
      "lib/ng-populate.js",
      "lib/ng-server-validation.js",
      "lib/ng-default.js",
      "lib/ng-on-bool-attr-change.js",
      "lib/ng-compile.js",
      "lib/ng-length.js",
      "lib/ng-decimals.js",
      "lib/ng-no-decimals.js",
      "lib/ng-past-date.js",
      "lib/ng-future-date.js",
      "lib/ng-till-today.js",
      "lib/ng-from-today.js",
      "lib/ng-use-locale.js",
      "lib/ng-hide-ex.js",

      // tests
      'tests/specs-formalizer-dynamic-source.js',
      'tests/specs-formalizer-empty.js',
      'tests/specs-formalizer-full.js',
      'tests/specs-formalizer-number.js',
      'tests/specs-formalizer-select.js',
      'tests/specs-formalizer-text.js',
      'tests/specs-ng-blacklist.js',
      'tests/specs-ng-datepicker-fix.js',
      'tests/specs-ng-decimal.js',
      'tests/specs-ng-default.js',
      'tests/specs-ng-equal-to.js',
      'tests/specs-ng-no-decimals.js',
      'tests/specs-ng-use-locale.js',

      // templates
      'templates/*.tpl.html'
    ],

    //logLevel: config.LOG_DEBUG,

    // generate js files from html templates
    preprocessors: {
      'templates/*.tpl.html': 'ng-html2js',
      'lib/*.js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
        moduleName: 'formalizer-tpls'
    },

    reporters: ['dots', 'coverage'],

    plugins: [
        //'karma-ng-scenario',
        'karma-jasmine',
        'karma-firefox-launcher',
        'karma-ng-html2js-preprocessor',
        'karma-coverage',
        'karma-phantomjs-launcher'
    ],

    autoWatch: true,
    browsers: ['PhantomJS']
    //browsers: ['Firefox']
  });
};

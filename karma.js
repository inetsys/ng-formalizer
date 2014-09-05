// Karma configuration file
// See http://karma-runner.github.io/0.10/config/configuration-file.html

// windows
// setx CHROME_BIN "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" /M
// setx FIREFOX_BIN "C:\Program Files (x86)\Mozilla Firefox\firefox.exe" /M


module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // libraries
      "bower_components/jquery/dist/jquery.js",

      "bower_components/angular/angular.js",
      "bower_components/angular-mocks/angular-mocks.js",

      "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
      "bower_components/checklist-model/checklist-model.js",

      //slider
      "bower_components/angular-bootstrap-slider/slider.js",
      "bower_components/seiyria-bootstrap-slider/js/bootstrap-slider.js",


      "bower_components/moment/moment.js",

      // our app
      'lib/formalizer.js',
      'lib/formalizer.submit.js',
      'lib/formalizer.select.js',
      'lib/formalizer.textarea.js',
      'lib/formalizer.checkbox.js',
      'lib/formalizer.checkbox.js',
      'lib/formalizer.radio-list.js',
      'lib/formalizer.typeahead.js',
      'lib/formalizer.datepicker.js',
      'lib/formalizer.input.js',
      'lib/formalizer.checkbox-list.js',
      'lib/formalizer.slider.js',
      'lib/ng-formalizer.js',
      'lib/ng-formalizer-attach.js',
      'lib/ng-blacklist.js',
      'lib/ng-decimal.js',
      'lib/ng-equalto.js',
      'lib/ng-datepicker-fix.js',

      // tests
      'tests/*.js',

      // templates
      'templates/*.html'
    ],

    //logLevel: config.LOG_DEBUG,

    // generate js files from html templates
    preprocessors: {
      'templates/*.html': 'ng-html2js',
      'lib/*.js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
        moduleName: 'formalizer-tpls'
    },

    reporters: ['dots', 'coverage'],

    autoWatch: true,
    browsers: ['PhantomJS']
    //browsers: ['Firefox']
  });
};

// add the coverage plugin
//plugins: [ 'karma-jasmine', 'karma-firefox-launcher', 'karma-chrome-launcher', 'karma-coverage'],
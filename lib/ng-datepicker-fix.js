'use strict';

//
// fix https://github.com/angular-ui/bootstrap/issues/1891
// TZ issues
// foreign language direct input
//
angular
.module('formalizer')
.constant('datepickerPopupFix', {
  /**
   * Input format in moment.js format!
   */
  datepickerPopup: 'YYYY-MM-DD',
  /**
   * timezone in string format:
   * '+0000' GMT+0
   * '+0100' GMT+1
   * '-0100' GMT-1
   * etc...
   */
  datepickerTZ: undefined
})
.directive('ngDatepickerFix', ['datepickerPopupFix', '$parse', function(datepickerPopupFix, $parse) {
  return {
    require: '?ngModel',
    priority: -100,
    link: function($scope, $element, $attrs, $ngModel) {
      // fix string date
      var val = $scope.$eval($attrs.ngModel);

      if ('string' == typeof val) {
        val = new Date(val);
        if (!isNaN(val.getTime())) {
          $parse($attrs.ngModel).assign($scope, val);
        }
      }

      $ngModel.$parsers.unshift(function ngDatepickerFix(value) {
        var mjs;

        if ('string' === typeof value) {
          // manually introduce the date
          mjs = moment(value, datepickerPopupFix.datepickerPopup);
        } else {
          // click on the datepicker
          mjs = moment(value);
        }

        if (!mjs.isValid()) {
          return value;
        }

        if (datepickerPopupFix.datepickerTZ !== undefined) {
          // fix TZ
          return new Date(mjs.toDate().toDateString() + ' 00:00 GMT' + datepickerPopupFix.datepickerTZ);
        }

        return mjs.toDate();
      });
    }
  };
}]);

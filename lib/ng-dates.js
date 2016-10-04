(function() {
  function today_utc() {
    var m = moment.utc();
    m.millisecond(0);
    m.seconds(0);
    m.minutes(0);
    m.hours(0);

    return m;
  }
  [{
    directive: 'ngDateAfter',
    constraint: 'date-after',
    check: function(ref_date, input_date) {
      return ref_date.diff(input_date, 'seconds') < 0;
    }
  }, {
    directive: 'ngDateBefore',
    constraint: 'date-before',
    check: function(ref_date, input_date) {
      return ref_date.diff(input_date, 'seconds') > 0;
    }
  }, {
    directive: 'ngFutureDate',
    constraint: 'future-date',
    check: function(ref_date, input_date) {
      return today_utc().diff(input_date, 'seconds') < 0;
    }
  }, {
    directive: 'ngPastDate',
    constraint: 'past-date',
    check: function(ref_date, input_date) {
      return today_utc().diff(input_date, 'seconds') > 0;
    }
  }, {
    directive: 'ngTillToday',
    constraint: 'till-today',
    check: function(ref_date, input_date) {
      return today_utc().diff(input_date, 'seconds') >= 0;
    }
  }, {
    directive: 'ngFromToday',
    constraint: 'from-today',
    check: function(ref_date, input_date) {
      return today_utc().diff(input_date, 'seconds') <= 0;
    }
  }].forEach(function(dt) {
    angular.module('formalizer')
    .directive(dt.directive, ['$timeout', '$log', function ($timeout, $log) {
      return {
        priority: -9000, // higher than ui-datepicker
        require: 'ngModel',
        link: function ($scope, $element, $attrs, $ngModel) {
          $log.debug('(', dt.directive ,')', $attrs[dt.directive]);

          var ref_date = moment($attrs[dt.directive]);

          function check (value) {
            var input_date = moment(value);

            if (!value || !input_date.isValid()) {
              $ngModel.$setValidity(dt.constraint, true);
            } else {
              var res = dt.check(ref_date, input_date);
              $log.debug('(', dt.directive ,')', "ref_date", ref_date.toJSON(), "input_date", input_date.toJSON(), res);
              $ngModel.$setValidity(dt.constraint, res);
            }

            return value;
          }

          $ngModel.$parsers.unshift(check);
          // run check after ng-default
          $timeout(function() {
            check($ngModel.$modelValue);
          });
        }
      };
    }])
  });
}());

angular.module("formalizer")
.directive("ngPastDate", function () {
    return {
        priority: -9000, // higher than ui-datepicker
        link: function ($scope, $elm, $attrs) {
            var date = new Date();
            date.setMilliseconds(0);
            date.setSeconds(0);
            date.setMinutes(0);
            date.setHours(0);
            date.setTime(date.getTime() - 24 * 60 * 60 * 1000);

            $attrs.$set('maxDate', JSON.stringify(date));

        }
    };
});
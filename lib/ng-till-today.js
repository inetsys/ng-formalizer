angular.module("formalizer")
.directive("ngTillToday", function () {
    return {
        priority: -9000, // higher than ui-datepicker
        link: function ($scope, $elm, $attrs) {
            var date = new Date();

            $attrs.$set('maxDate', JSON.stringify(date));
        }
    };
});
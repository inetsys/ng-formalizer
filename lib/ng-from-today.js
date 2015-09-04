angular.module("formalizer")
.directive("ngFromToday", function () {
    return {
        priority: -9000, // higher than ui-datepicker
        link: function ($scope, $elm, $attrs) {
            var date = new Date();
            // date is ****-**-** 00:00
            date.setTime(date.getTime() - 24 * 60 * 60 * 1000);

            $attrs.$set("minDate", JSON.stringify(date));
        }
    };
});

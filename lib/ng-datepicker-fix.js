//
// fix https://github.com/angular-ui/bootstrap/issues/1891
// TZ issues
// foreign language direct input
//
angular.module("formalizer")
.constant("datepickerPopupFix", {
    /**
     * Input format in moment.js format!
     */
    datepickerPopup: "YYYY-MM-DD",
    /**
     * timezone in string format:
     * "+0000" GMT+0
     * "+0100" GMT+1
     * "-0100" GMT-1
     * etc...
     */
    datepickerTZ: undefined
})
.directive("ngDatepickerFix", ["datepickerPopupFix", function (datepickerPopupFix) {
    return {
        require: "?ngModel",
        priority: 100,
        link: function ($scope, $elm, $attrs, $ngModel) {

            $ngModel.$parsers.unshift(function ngDatepickerFix (value) {
                var mjs;

                if ("string" === typeof value) {
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
                    return new Date(mjs.toDate().toDateString() + " 00:00 GMT" + datepickerPopupFix.datepickerTZ);
                }

                return mjs.toDate();

            });

        }
    };
}])
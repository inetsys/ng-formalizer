describe("specs-formalizer-text.js", function () {
    console.log("--> ", this.description);

    var $compile,
        $scope,
        form,
        input,
        element,
        form,
        __datepickerPopupFix;

    // Load the myApp module, which contains the directive
    beforeEach(module("formalizer-tpls"));
    beforeEach(module("formalizer"));

    // Store references to $scope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(FormalizerConfig, _$compile_, _$rootScope_, $timeout, datepickerPopupConfig, datepickerPopupFix) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $scope = _$rootScope_;

        // date test specific
        datepickerPopupConfig.currentText = "Hoy";
        datepickerPopupConfig.clearText = "Borrar";
        datepickerPopupConfig.closeText = "Cerrar";
        datepickerPopupConfig.toggleWeeksText = "Semanas";
        datepickerPopupConfig.showWeeks = false;

        datepickerPopupFix.datepickerPopup = "DD/MM/YYYY";
        datepickerPopupFix.datepickerTZ = "+0000";
        __datepickerPopupFix = datepickerPopupFix;

        $scope.onSubmit = function(clean) {
        };

        $scope.entity = {
            text: null
        };

        $scope.form_fields = [{
            "label": "datepicker",
            "type": "datepicker",
            "name": "datepicker",
            "class": "datepicker-field"
        }, {
            "label": "Submit now!",
            "type": "submit",
            "name": "submit",
            "class": "btn-primary"
        }];

        $scope.config = {
            "legend": "Legend",
            "type": "horizontal",
            "name": "form",
            "onSubmit": "onSubmit",
            "model": "entity",
            "fields": "form_fields",
        };

        element = $compile(
            "<div ng-formalizer=\"config\">" +
            "</div>"
        )($scope);

        $scope.$digest();

        $timeout.flush();

        form = $scope.$$childTail.form;
    }));

    it("test input@datepicker no tz", function () {
        __datepickerPopupFix.datepickerTZ = undefined;

        var input = element.find("#form-datepicker"),
            submit = element.find("#form-submit");

        expect(form.$invalid).toEqual(false);
        expect(form.datepicker.$invalid).toEqual(false);
        expect(submit.attr("disabled")).toEqual(null);


        form.datepicker.$setViewValue("15/03/2014");
        $scope.$digest();

        expect(form.datepicker.$modelValue.toISOString()).toEqual("2014-03-14T23:00:00.000Z");
        expect(form.datepicker.$viewValue).toEqual("15/03/2014");
    });

    // a single test
    it("test input@datepicker", function () {

        //debug: console.log($("<div />").append(element).html());

        var input = element.find("#form-datepicker"),
            submit = element.find("#form-submit");

        expect(form.$invalid).toEqual(false);
        expect(form.datepicker.$invalid).toEqual(false);
        expect(submit.attr("disabled")).toEqual(null);


        form.datepicker.$setViewValue("15/03/2014");
        $scope.$digest();

        expect(form.datepicker.$modelValue.toISOString()).toEqual("2014-03-15T00:00:00.000Z");
        expect(form.datepicker.$viewValue).toEqual("15/03/2014");
    });
});

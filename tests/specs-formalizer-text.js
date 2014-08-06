describe("specs-formalizer-text.js", function () {
    console.log("--> ", this.description);

    var $compile,
        $scope,
        form,
        input,
        submited = false,
        element,
        form;

    // Load the myApp module, which contains the directive
    beforeEach(module("formalizer-tpls"));
    beforeEach(module("formalizer"));

    // Store references to $scope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(FormalizerConfig, _$compile_, _$rootScope_, $timeout) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $scope = _$rootScope_;

        $scope.onSubmit = function(clean) {
            expect(clean).toEqual({text: "abc"});

            submited = true;
        };

        $scope.entity = {
            text: null
        };

        $scope.form_fields = [{
            "label": "text label",
            "type": "text",
            "name": "text",
            "class": "text-field",
            "constraints": {
                "required": "true"
            }
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

    // a single test
    it("test input@text", function () {

        //debug: console.log($("<div />").append(element).html());

        var input = element.find("#form-text"),
            submit = element.find("#form-submit");

        expect(form.$invalid).toEqual(true);
        expect(form.text.$invalid).toEqual(true);
        expect(submit.attr("disabled")).toEqual("disabled");


        form.text.$setViewValue("abc");
        $scope.$digest();

        expect(form.$invalid).toEqual(false);
        expect(form.text.$invalid).toEqual(false);
        expect(submit.attr("disabled")).toEqual(null);


        element.submit();

        expect(submited).toEqual(true);
    });
});

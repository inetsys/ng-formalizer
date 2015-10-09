describe("specs-formalizer-text.js", function () {
    console.log("--> ", this.description);

    var $compile,
        $scope,
        form,
        submited = false,
        element;

    // Load the myApp module, which contains the directive
    beforeEach(module("formalizer-tpls"));
    beforeEach(module("formalizer"));

    // Store references to $scope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_, $timeout) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $scope = _$rootScope_;

        $scope.onSubmit = function(clean) {
            //expect(clean).toEqual({text: "abc"});
            submited = true;
        };

        $scope.entity = {
            text: null
        };

        $scope.fields = [{
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

        element = $compile(
          '<form name="form" ng-formalizer="" ng-base-model="entity" class="form-horizontal container" ng-submit="onSubmit()">' +
          '  <div ng-repeat="field in fields track by $index">' +
          '    <div ng-formalizer-field="field"></div>' +
          '  </div>' +
          '</form>'
        )($scope);

        $scope.$digest();

        $timeout.flush();

        form = $scope.form;
    }));

    // a single test
    it("test input@text", function () {
        var submit = element.find("#form-submit");

        expect(form.$invalid).toEqual(true);
        expect(form.text.$invalid).toEqual(true);
        expect(submit.attr("disabled")).toEqual("disabled");


        form.text.$setViewValue("abc");
        $scope.$digest();

        expect(form.$invalid).toEqual(false);
        expect(form.text.$invalid).toEqual(false);
        expect(submit.attr("disabled")).toBeFalsy();


        element.submit();

        expect(submited).toEqual(true);
    });
});

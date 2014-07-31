// a test suite (group of tests)
describe("sample component test", function () {
    var $compile;
    var $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(module("formalizer"));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    var form,
        input;

    // a single test
    it("Create form&input with ng-decimal", function () {

        $rootScope.entity = {
            decimal: 0
        };

        var element = $compile(
            "<form name=\"form\">" +
              "<input type=\"number\" name=\"decimal\" ng-model=\"entity.decimal\" ng-decimal=\"4\" />" +
            "</form>"
        )($rootScope);

        $rootScope.$digest();

        form = $rootScope.form;
        input = $rootScope.form.decimal;

        expect(input.$valid).toEqual(true);

        input.$setViewValue("0.123");
        expect(input.$valid).toEqual(true);
        expect(input.$viewValue).toEqual("0.123");
        expect($rootScope.entity.decimal).toEqual(0.123);

        input.$setViewValue("0.12356");
        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("0.12356");
        $rootScope.$digest();
        expect($rootScope.entity.decimal).toEqual(0.12356);
    });
});

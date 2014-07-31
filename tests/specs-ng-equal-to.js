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
    it("Create form&input with ng-blacklist", function () {

        $rootScope.entity = {
            text1: "abc",
            text2: "abc"
        };

        var element = $compile(
            "<form name=\"form\">" +
              "<input type=\"text\" name=\"text1\" ng-model=\"entity.text1\" />" +
              "<input type=\"text\" name=\"text2\" ng-model=\"entity.text2\" ng-equal-to=\"entity.text1\" />" +
            "</form>"
        )($rootScope);

        $rootScope.$digest();

        form = $rootScope.form;
        input = $rootScope.form.text1;
        input2 = $rootScope.form.text2;

        expect(input.$valid).toEqual(true);

        input.$setViewValue("xxx");
        $rootScope.$digest();

        expect(input.$valid).toEqual(true);
        expect(input.$viewValue).toEqual("xxx");
        expect($rootScope.entity.text1).toEqual("xxx");

        expect(input2.$valid).toEqual(false);
        expect(input2.$viewValue).toEqual("abc");
        expect($rootScope.entity.text2).toEqual("abc");


        input.$setViewValue("abc");
        $rootScope.$digest();

        expect(input.$valid).toEqual(true);
        expect(input.$viewValue).toEqual("abc");
        expect($rootScope.entity.text1).toEqual("abc");

        expect(input2.$valid).toEqual(true);
        expect(input2.$viewValue).toEqual("abc");
        expect($rootScope.entity.text2).toEqual("abc");
    });
});

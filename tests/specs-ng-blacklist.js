describe("specs-ng-blacklist.js", function () {
    console.log("--> ", this.description);

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
            blacklist: 0
        };

        $rootScope.blacklist = ["abc", "zzz"];

        var element = $compile(
            "<form name=\"form\">" +
              "<input type=\"text\" name=\"blacklist\" ng-model=\"entity.blacklist\" ng-blacklist=\"blacklist\" />" +
            "</form>"
        )($rootScope);



        $rootScope.$digest();

        form = $rootScope.form;
        input = $rootScope.form.blacklist;

        expect(input.$valid).toEqual(true);

        input.$setViewValue("abc");
        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("abc");
        expect($rootScope.entity.blacklist).toEqual("abc");

        input.$setViewValue("adef");
        expect(input.$valid).toEqual(true);
        expect(input.$viewValue).toEqual("adef");
        $rootScope.$digest();
        expect($rootScope.entity.blacklist).toEqual("adef");
    });
});

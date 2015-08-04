describe("specs-ng-decimal.js", function () {
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

    it("Create form&input with ng-decimal", function () {

        $rootScope.entity = {
            decimal: 0
        };

        var element = $compile(
            "<form name=\"form\">" +
              "<input type=\"number\" name=\"decimal\" ng-model=\"entity.decimal\" ng-decimals=\"4\" />" +
            "</form>"
        )($rootScope);

        $rootScope.$digest();

        form = $rootScope.form;
        input = $rootScope.form.decimal;

        expect(input.$valid).toEqual(true);

        input.$setViewValue("0.123");
        $rootScope.$digest();

        expect(input.$valid).toEqual(true);
        expect(input.$viewValue).toEqual("0.123");
        expect($rootScope.entity.decimal).toEqual(0.123);

        input.$setViewValue("0.12356");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("0.12356");
        expect($rootScope.entity.decimal).toEqual(null);
    });


    it("Create form&input with ng-decimal, ng-min, ng-max", function () {

        $rootScope.entity = {
            decimal: 0
        };

        var element = $compile(
            "<form name=\"form\">" +
              "<input type=\"number\" ng-use-locale=\"\" name=\"decimal\" ng-model=\"entity.decimal\" min=\"0\" max=\"10\" ng-no-decimals=\"true\" />" +
            "</form>"
        )($rootScope);

        $rootScope.$digest();

        form = $rootScope.form;
        input = $rootScope.form.decimal;

        expect(input.$valid).toEqual(true);

        // spanish locale
        input.$setViewValue("0,2");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("0,2");
        expect($rootScope.entity.decimal).toEqual(null);


        input.$setViewValue("0.55");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("0.55");
        expect($rootScope.entity.decimal).toEqual(null);


        input.$setViewValue("0.555");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("0.555");
        expect($rootScope.entity.decimal).toEqual(null);


        input.$setViewValue("15");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("15");
        expect($rootScope.entity.decimal).toEqual(null);

        input.$setViewValue("-1");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("-1");
        expect($rootScope.entity.decimal).toEqual(null);
    });

    it("Create form&input with ng-decimal, ng-min, ng-max", function () {

        $rootScope.entity = {
            decimal: 0
        };

        var element = $compile(
            "<form name=\"form\">" +
              "<input type=\"number\" ng-use-locale=\"\" name=\"decimal\" ng-model=\"entity.decimal\" min=\"0\" max=\"10\" ng-decimals=\"2\" />" +
            "</form>"
        )($rootScope);

        $rootScope.$digest();

        form = $rootScope.form;
        input = $rootScope.form.decimal;

        expect(input.$valid).toEqual(true);

        // spanish locale
        input.$setViewValue("0,2");
        $rootScope.$digest();

        expect(input.$valid).toEqual(true);
        expect(input.$viewValue).toEqual("0,2");
        expect($rootScope.entity.decimal).toEqual(0.2);

        // dot fail because ng-use-locale
        input.$setViewValue("0.55");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("0.55");
        expect($rootScope.entity.decimal).toEqual(null);

        // 3 decimals fail
        input.$setViewValue("0,555");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("0,555");
        expect($rootScope.entity.decimal).toEqual(null);


        input.$setViewValue("15");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("15");
        expect($rootScope.entity.decimal).toEqual(null);

        input.$setViewValue("-1");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("-1");
        expect($rootScope.entity.decimal).toEqual(null);
    });

    it("Create form&input with ng-decimal, ng-min, ng-max", function () {

        $rootScope.entity = {
            decimal: 0
        };

        var element = $compile(
            "<form name=\"form\">" +
            "<input type=\"number\" ng-use-locale=\"\" ng-datebefore=\"null\" ng-dateafter=\"null\" max=\"10\" min=\"0\" ng-decimals=\"2\" ng-placeholder=\"\" ng-class=\"{&quot;has-error&quot;: $formalizer.attempts &gt; 0 &amp;&amp; form.nota_media.$invalid}\" class=\"form-control ng-touched ng-dirty ng-valid-decimals ng-valid-number ng-valid-min ng-valid ng-valid-max\" ng-model=\"entity.decimal\" id=\"form-nota_media\" name=\"decimal\" style=\"\">" +
            "</form>"
        )($rootScope);

        $rootScope.$digest();

        form = $rootScope.form;
        input = $rootScope.form.decimal;

        expect(input.$valid).toEqual(true);

        // spanish locale
        input.$setViewValue("0,2");
        $rootScope.$digest();

        expect(input.$valid).toEqual(true);
        expect(input.$viewValue).toEqual("0,2");
        expect($rootScope.entity.decimal).toEqual(0.2);

        input.$setViewValue("0,22");
        $rootScope.$digest();

        expect(input.$valid).toEqual(true);
        expect(input.$viewValue).toEqual("0,22");
        expect($rootScope.entity.decimal).toEqual(0.22);

        input.$setViewValue("0.55");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("0.55");
        expect($rootScope.entity.decimal).toEqual(null);


        input.$setViewValue("0.555");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("0.555");
        expect($rootScope.entity.decimal).toEqual(null);


        input.$setViewValue("15");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("15");
        expect($rootScope.entity.decimal).toEqual(null);

        input.$setViewValue("-1");
        $rootScope.$digest();

        expect(input.$valid).toEqual(false);
        expect(input.$viewValue).toEqual("-1");
        expect($rootScope.entity.decimal).toEqual(null);
    });


});

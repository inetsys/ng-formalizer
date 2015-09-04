describe("specs-ng-use-locale.js", function () {
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
  it("Create form&input#number with ng-use-locale", function () {

    $rootScope.entity = {
      num: 0
    };

    var element = $compile(
      "<form name=\"form\">" +
      "<input type=\"number\" name=\"num\" ng-model=\"entity.num\" ng-use-locale=\"\" />" +
      "</form>"
    )($rootScope);

    $rootScope.$digest();

    form = $rootScope.form;
    input = $rootScope.form.num;

    expect(input.$valid).toEqual(true);

    // karma use spanish locale so 1.000,50 --> 1000.50

    input.$setViewValue("50");
    expect(input.$valid).toEqual(true);
    expect(input.$viewValue).toEqual("50");
    expect($rootScope.entity.num).toEqual(50);
    $rootScope.$digest();

    input.$setViewValue("1.000,50");
    expect(input.$valid).toEqual(true);
    expect(input.$viewValue).toEqual("1.000,50");
    expect($rootScope.entity.num).toEqual(1000.50);
    $rootScope.$digest();

    input.$setViewValue("10.000,55");
    expect(input.$valid).toEqual(true);
    expect(input.$viewValue).toEqual("10.000,55");
    expect($rootScope.entity.num).toEqual(10000.55);
    $rootScope.$digest();


    input.$setViewValue("1.000.000,55");
    expect(input.$valid).toEqual(true);
    expect(input.$viewValue).toEqual("1.000.000,55");
    expect($rootScope.entity.num).toEqual(1000000.55);
    $rootScope.$digest();

    // not good formated input

    $rootScope.entity.num = 1000000.56;
    $rootScope.$digest();

    expect(input.$valid).toEqual(true);
    expect(input.$viewValue).toEqual("1000000,56");
    expect($rootScope.entity.num).toEqual(1000000.56);
    $rootScope.$digest();

  });
});

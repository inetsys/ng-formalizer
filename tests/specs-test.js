// a test suite (group of tests)
describe('sample component test', function() {
    var $compile;
    var $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(module('formalizer'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    // a single test
    it('ensure addition is correct', function() {
        // sample expectation
        expect(1+1).toEqual(2);
        //                  `--- the expected value (2)
        //             `--- the matcher method (equality)
        //       `-- the actual value (2)
    });
    // another test
    it('ensure substraction is correct', function() {
        expect(1-1).toEqual(0);
    });
});

describe('specs-formalizer-dynamic-source.js', function () {
  console.log('--> ', this.description);

  var fields = [{
    'label': 'radio-list-string',
    'type': 'radio-list',
    'name': 'radio_list',
    'source': 'fields[1].source',
    'source_model': 'id',
    'source_display': 'label',
  }, {
    'label': 'radio-list-object',
    'type': 'radio-list',
    'name': 'radio_list',
    'source': [
        {id: 1, label: '1'},
        {id: 2, label: '2'}
    ],
    'source_model': 'id',
    'source_display': 'label',
  }, {
    'label': 'Submit now!',
    'type': 'submit',
    'name': 'submit',
    'class': 'btn-primary'
  }];

  var entity = {
    number: null
  };

  var $scope,
    element;

  // Load the myApp module, which contains the directive
  beforeEach(module('formalizer-tpls'));
  beforeEach(module('formalizer'));

  // Store references to $scope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function ($compile, $rootScope, $timeout) {
    $scope = $rootScope.$new();

    $scope.entity = entity;

    $scope.fields = fields;

    element = angular.element(
      '<form name="horizontal" ng-formalizer="" ng-base-model="entity" class="form-horizontal container">' +
      '  <div ng-repeat="field in fields track by $index">' +
      '    <div ng-formalizer-field="field"></div>' +
      '  </div>' +
      '</form>'
    );
    $compile(element)($scope);

    $scope.$digest();

    $timeout.flush();
  }));

  // a single test
  // a single test
  it('formalizer dynamic source', function () {
      expect(element.find('input').length).toEqual(4);

      $scope.fields[1].source.push({id: 3, label: '3'});
      $scope.$digest();

      expect(element.find('input').length).toEqual(6);
  });
});

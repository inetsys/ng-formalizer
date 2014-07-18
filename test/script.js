// Code goes here

// NOTE: ng-app="plunker" + AngularUI module dependency
var app = angular.module('app', ['ui.bootstrap']);

app.controller('MainCtrl', function($scope) {
  $scope.entity = {
    //tyc: true,
    platform: "desktop",
    //has_iphone: false
  };

  $scope.dateOptions = {
    'year-format': "'yyyy'",
    'starting-day': 1
  };

  $scope.list = [{
        id: 1,
        label: "Soccer"
  },{
        id: 2,
        label: "Basket"
  },{
        id: 3,
        label: "Curlin"
  },{
        id: "sc2",
        label: "starcraft 2"
  }];

  $scope.SendToServer = function(dirty_data) {
    console.log("SendToServer");
    console.log(dirty_data);
  };

  console.log("maincontroller end!");
});
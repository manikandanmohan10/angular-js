var module = angular.module("myApp", []);

module.controller("exampleCtrl", function($scope) {

    $scope.name = 'MM';
    $scope.column = ['name', 'data'];
    $scope.data = [{
        'name': 'sabari',
        'data': 'sabari'
    }]

})
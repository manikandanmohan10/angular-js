var module = angular.module("myApp");

module.controller("exampleCtrl", function($scope) {

    $scope.name = 'MM';
    $scope.column = ['name1', 'data'];
    $scope.data = [{
        'name1': 'sabari',
        'data': 'sabari'
    }]

})
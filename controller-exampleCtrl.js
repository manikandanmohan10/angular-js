var module = angular.module("myApp");

module.controller("exampleCtrl", function($scope) {

    $scope.name = 'MM';
    $scope.dataSource = {
        column : ['name1', 'data'],
        data : [{
        'name1': 'sabari',
        'data': 'sabari'
    }]
   }

})
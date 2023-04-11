var module = angular.module("myApp");

module.controller("exampleCtrl", function($scope) {

    $scope.name = 'MM';
    $scope.dataSource = {
        column : [{ field: 'name1',
                   type: 'input',
                   }, {field: 'data',
                    type: 'input'
                   }],
        data : [{
        'name1': 'sabari',
        'data': 'sabari',
        'editable': false
    },
    {
        'name1': 'sabari2',
        'data': 'sabari',
        editable: false
    },
    {
        'name1': 'sabari3',
        'data': 'sabari',
        editable: false
    }]
}

})
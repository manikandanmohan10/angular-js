var module = angular.module("myApp");

module.controller("exampleCtrl", function($scope) {

    $scope.name = 'MM';
    $scope.dataSource = {
        column : [{ field: 'name1',
                   type: 'number',
                   editable: false,
                   }, {field: 'data',
                    type: 'input',
                    editable: true
                   },
                   {
                    field: 'select',
                    type: 'select',
                    editable: true,
                    dropdowndata: ['anish','vembu', 'mani']
                   }
                ],
        data : [{
        'name1': 'sabari',
        'data': 'sabari',
        'editable': false,
        'select': 'anish'
    },
    {
        'name1': 'sabari2',
        'data': 'sabari',
        'select': 'anish',
        editable: false
    },
    {
        'name1': 'sabari3',
        'data': 'sabari',
        'select': 'anish',
        editable: false
    }]
}

})
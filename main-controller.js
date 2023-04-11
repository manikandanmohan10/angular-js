var module = angular.module("myApp");

module.controller("exampleCtrl", function ($scope) {
  $scope.name = "MM";
  $scope.dataSource = {
    column: [
      { field: "name1", type: "input" },
      { field: "data", type: "input" },
      {
        field: "age",
        type: "number",
      },
    ],
    data: [
      {
        name1: "sabari",
        data: "sabari",
        age: 34,
        editable: false,
      },
      {
        name1: "sabari2",
        data: "sabari",
        age: 14,
        editable: false,
      },
      {
        name1: "sabari3",
        data: "sabari",
        age:1,
        editable: false,
      },
    ],
  };
});

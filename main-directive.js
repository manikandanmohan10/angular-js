angular.module('myApp', ['dndLists'])
.directive('myDirective', function() {
  return {
    restrict: "AEC",
    scope: {
      onButtonClick: "&",
      ngModel: "=",
    },
    link: function (scope, element, attrs) {
      element.css("color", "red");
          console.log("Input Data: " + scope.getData);
      scope.message = attrs.type;
      let datas = JSON.parse(attrs.datasource);
      console.log(datas);
      scope.data = datas.data;
      scope.column = datas.column;
      console.log(scope);
      setTimeout(function () {
        $("#mytable").DataTable(); // Initialize DataTables plugin after AngularJS data is populated
        $("#mytable").tableDnD(); // Initialize TableDnD plugin for row drag-and-drop
        $(".table").dragableColumns(); //Initialize dragndropjs for column dragndrop
      }, 0);
      scope.temp = scope.column;
    },
    templateUrl: "table.html",
    controller: function ($scope) {
      // $scope.myData = ""; // Initialize the variable to hold the input field data

      $scope.getData = function () {
        var inputData = $scope.myData; // Get the input field data from the bound variable
        console.log("Input Data: " + inputData); 
        var selectedOption = $scope.selectedValue; // Get the selected value from the bound variable
        console.log("Selected Value: " + selectedOption); 
        if ($scope.myData) {
          $scope.myStyle = {
            "background-color": $scope.myData,
          }; // Log the input data to the console
        } else {
          $scope.myStyle = {
            "background-color": "black",
          }; // Log the input data to the console
        }
      };
      $scope.editRow = function (row) {
        // update the row
        row.editable = !row.editable;
        row = row;
        $scope.onButtonClick({ $event: row });
      };
      $scope.deleteRow = function (row) {
        // delete the row
      };
      $scope.$watch("data", function () {
        // update the table
      });
    },
  };
});

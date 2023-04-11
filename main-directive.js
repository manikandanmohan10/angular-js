angular.module('myApp', ['dndLists'])
.directive('myDirective', function() {
  return {
    restrict: 'AEC',
    scope: {
      onButtonClick: "&",
    },
    link: function(scope, element, attrs) {
      element.css('color', 'red');
      scope.message = attrs.type;
      let datas  = JSON.parse(attrs.datasource);
      scope.data = datas.data;
      scope.column = datas.column;
      setTimeout(function() {
        $('#mytable').DataTable(); // Initialize DataTables plugin after AngularJS data is populated
        $('#mytable').tableDnD(); // Initialize TableDnD plugin for row drag-and-drop
        $('.table').dragableColumns(); //Initialize dragndropjs for column dragndrop
        
      }, 0);
      scope.temp = scope.column;
    },
    templateUrl: 'table.html',
    controller: function($scope) {
      $scope.editRow = function(row) {
        // update the row
        row.editable = !row.editable
        row = row;
        $scope.onButtonClick({$event: row});
      };
      $scope.deleteRow = function(row) {
        // delete the row
      };
      $scope.$watch('data', function() {
        // update the table
      });
      $scope.freezeColumnIndex = null;

    // Function to toggle the frozen state of a column
    

    // Function to freeze a column based on user input
    $scope.freezeColumn = function(index,field) {
      $scope.freezeColumnIndex = index
      console.log($scope.column)
      if ($scope.freezeColumnIndex !== null && $scope.freezeColumnIndex >= 0 && $scope.freezeColumnIndex < $scope.column.length) {
        
        var forzenCount =0;
        angular.forEach($scope.column,(col)=>{
          if(col.field === field){
              $scope.column[$scope.freezeColumnIndex].frozen = !$scope.column[$scope.freezeColumnIndex].frozen;
            }
            else{
              col.frozen = false;

            }
        })
        console.log($scope.column[$scope.freezeColumnIndex])
      }
      console.log('hello')
    };
    }
  };
});

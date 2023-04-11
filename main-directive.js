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
      console.log(datas)
      scope.data = datas.data;
      scope.column = datas.column;
      console.log(scope)
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
        $scope.onButtonClick(row);
      };
      $scope.deleteRow = function(row) {
        // delete the row
      };
      $scope.$watch('data', function() {
        // update the table
      });
    }
  };
});

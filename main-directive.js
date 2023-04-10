angular.module('myApp', ['dndLists'])
.directive('myDirective', function() {
  return {
    restrict: 'AEC',
    link: function(scope, element, attrs) {
      element.css('color', 'red');
      scope.message = attrs.type;
      let datas  = JSON.parse(attrs.datasource);
      scope.data = datas.data;
      scope.column = datas.column;
      console.log(scope)
      setTimeout(function() {
        $('#mytable').DataTable(); // Initialize DataTables plugin after AngularJS data is populated

        // Add jQuery UI Drag and Drop functionality
        $( "#mytable tbody" ).sortable({
          helper: 'clone',
          update: function(event, ui) {
            // Get the new order of the rows
            var newOrder = $(this).sortable('toArray');

            // Update the scope data with the new order
            scope.$apply(function() {
              scope.data = newOrder.map(function(id) {
                return scope.data.find(function(item) {
                  return item.id === parseInt(id);
                });
              });
            });
          }
        }).disableSelection();
        
      }, 0);
    },
    templateUrl: 'table.html'
  };
});


//agGrid.initialiseAgGridWithAngular1(angular);

// var module = angular.module("example", []);

// // module.controller("exampleCtrl", function($scope) {

// //     var columnDefs = [
// //         {headerName: "Make", field: "make", rowGroup: true, rowDrag: true, editable: true},
// //         {headerName: "Model", field: "model", rowGroup: true },
// //         {headerName: "Price", field: "price"}
// //     ];

// //     var rowData = [
// //         {make: "Toyota", model: "Celica", price: 35000},
// //         {make: "Toyota", model: "Mondeo", price: 32000},
// //         {make: "Porsche", model: "Boxter", price: 72000},
// //         {make: "Mers", model: "E220", price: 78000}
// //     ];
    
// //     var manual = false;
    
// // $scope.data;
// //     $scope.gridOptions = {
// //         columnDefs: columnDefs,
// //         rowData: rowData,
// //         rowDrag: true,
// //         enableSorting: true,
// //         enableColResize: true,
// //         rowDragManaged: true,
// //         animateRows: true,
// //         treeData: true,
// //         groupDefaultExpanded: -1,
// //         getDataPath: (data) => {return data.orgHierarchy;},
// //         onColumnResized: function(params) {
// //    if(params.finished && manual) {
// //             console.log('Post Resize Functionality');
// //             manual = false;
// //         }
// //          console.log(params)
// //         },
// //         onRowDragEnd: function(event) {
// //             // Handle row drag move event
// //             console.log('Row drag move event:', event);
// //           },
// //         onGridReady: function(event) {
// //          sizeToFit()
         
// //           // this.api.sizeColumnsToFit('ffd')
// //     //   var allColumnIds = [];
// //     //   columnDefs.forEach( function(columnDef) {
// //     //     allColumnIds.push(columnDef.field);
// //     // });
// //     // this.columnApi.autoSizeColumns(allColumnIds)
     
// //        },
// //     };
    
    
// //     function sizeToFit() {
// //     manual = false;
// //     $scope.gridOptions.api.sizeColumnsToFit();
// // }

// // })

// module.directive('myCustomer', function() {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//           element.css('color', 'red');
//         }
//       };
//   });

  angular.module('myApp', [])
.directive('myDirective', function() {
  return {
    restrict: 'A',
    template: "<p>{{message}}</p>",
    link: function(scope, element, attrs) {
      element.css('color', 'red');
      scope.message = attrs.type;
      scope.data = attrs.data;
      scope.column = attrs.column;
    }
  };
});

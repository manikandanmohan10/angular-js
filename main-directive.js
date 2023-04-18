
// angular.module('myApp', []).directive ('myDirective', function ($rootScope, $compile, $templateRequest)
// {
// return {
// replace: true,
// template: '<div>My directive content</div>',
// scope: false,
// link: function (scope, elem, attrs) {
// var target = "hello world"
// var table = $(target).children();
// var nelem = $('<div></div>').append($ (target).html());
// //  var collection_name=nelem.find("table").attr("collection"); var uniqueid = 'tabletoggle' + (new Date()).getTime()+"_";
// // var uniqueid = 'tabletoggle' + (new Date()).getTime()+"_";
// nelem.find("table").addClass("cr-table");
// // if (_logValidation (nelem.find("tbody").attr("ng-repeat"))) { var ngrepeat=nelem.find("tbody").attr("ng-repeat");
// // }else{
// //   var ngrepeat = nelem.find("tbody>tr").attr("ng-repeat");
// // }
// var freezed_cols = [];
// nelem.find("thead").find("tr:last-child").children().each(function(i) {
//   var is_freezed = $(this).attr("freez");
//   if (typeof is_freezed !== 'undefined' && is_freezed !==  
//   false){ 
//     freezed_cols.push((i+1)); $(this).addClass("freez-Column");
//     $(this).addClass("freez-Column");
// }
// });

// var actual_display_columns = [];
// nelem.find("thead").find("tr:last-child").children().each(function() {
// if (isset($(this).attr("column"))) {
// if ($(this).attr("filter") == "date") {
// actual_display_columns.push($(this).attr("column")+"Text");
// }else{
// actual_display_columns.push($(this).attr("column"));
// }
// }
// if (isset($(this).attr("editable"))) {
// var k = $(this).attr("col_ref_id");
// editable_columns [k] = $(this).attr("editable");
// }

// });
// }
// }
// })

angular.module('myApp', [])
.directive('myDirective', function() {
  return {
    restrict: "AEC",
    scope: {
      onButtonClick: "&",
      ngModel: "=",
    },
    link: function (scope, element, attrs) {
      var page=0
      var limit = 4
      scope.page=0
      element.css("color", "red");
      scope.message = attrs.type;
      let datas = JSON.parse(attrs.datasource);
      scope.totalPages = Math.ceil(datas.data.length / limit)-1;
      scope.data = datas.data.slice((page*limit),(page*limit)+limit);
      scope.column = datas.column;
      // setTimeout(function () {
      //   $("#mytable").DataTable(); // Initialize DataTables plugin after AngularJS data is populated
      //   $("#mytable").tableDnD(); // Initialize TableDnD plugin for row drag-and-drop
        $(".table").dragableColumns(); //Initialize dragndropjs for column dragndrop
      // }, 0);
      scope.temp = scope.column;
      scope.nextPage = function(page) {
        var pageNumber = scope.page + page



        var limit = 4  
        let datas = JSON.parse(attrs.datasource);
        scope.data = datas.data.slice((pageNumber*limit),(pageNumber*limit)+limit);
        scope.page=pageNumber
      }
    },
    templateUrl: "table.html",
    controller: function ($scope) {
      $scope.selectedCell = [];
      $scope.checkbox=false;
      // $scope.myData = ""; // Initialize the variable to hold the input field data

      window.addEventListener('keydown', function(event){
        // some code here
        if($scope.selectedCell.length) {

        let as = $scope.selectedCell[$scope.selectedCell.length-1];
        let i = as[0];
        let j = as[1];
        if(event.key === "Tab") {
          event.preventDefault();
          $scope.selectedCell.push([i, j+1])
          updateCellByButton(i, j+1);
          // $scope.selectedCell.forEach(e => {
          //   if(e[0] === i && e[1] === j+1) {
          //     let a = document.getElementById(`${e[0]}-${e[1]}`);
          //     let b = document.getElementById(`${e[0]}-${e[1]}-index`);
          //     a.style.display = 'none';
          //     b.style.display = 'block';
          //   }  else {
          //     let a = document.getElementById(`${e[0]}-${e[1]}`);
          //     let b = document.getElementById(`${e[0]}-${e[1]}-index`);
          //     a.style.display = 'block';
          //     b.style.display = 'none';
          //   }
          // })
        } else if(event.key === "ArrowUp") {
          if(i-1 >= 0) {
            $scope.selectedCell.push([i-1, j])
            updateCellByButton(i-1, j)
            // $scope.selectedCell.forEach(e => {
            //   if(e[0] === i-1 && e[1] === j) {
            //     let a = document.getElementById(`${e[0]}-${e[1]}`);
            //     let b = document.getElementById(`${e[0]}-${e[1]}-index`);
            //     a.style.display = 'none';
            //     b.style.display = 'block';
            //   }  else {
            //     let a = document.getElementById(`${e[0]}-${e[1]}`);
            //     let b = document.getElementById(`${e[0]}-${e[1]}-index`);
            //     a.style.display = 'block';
            //     b.style.display = 'none';
            //   }
            // })
          } 
          
        } else if(event.key === "ArrowDown") {
          if(i >= 0) {
            $scope.selectedCell.push([i+1, j])
            updateCellByButton(i+1, j);
            // $scope.selectedCell.forEach(e => {
            //   if(e[0] === i+1 && e[1] === j) {
            //     let a = document.getElementById(`${e[0]}-${e[1]}`);
            //     let b = document.getElementById(`${e[0]}-${e[1]}-index`);
            //     a.style.display = 'none';
            //     b.style.display = 'block';
            //   }  else {
            //     let a = document.getElementById(`${e[0]}-${e[1]}`);
            //     let b = document.getElementById(`${e[0]}-${e[1]}-index`);
            //     a.style.display = 'block';
            //     b.style.display = 'none';
            //   }
            // })
          } 
        }else if(event.key === "ArrowLeft") {
          if(j-1 >= 0) {
            updateCellByButton(i, j-1);
          }
          
        }
      }
    });

      function updateCellByButton(i, j) {
        let existData =[];
        $scope.selectedCell.forEach(e => {
          if(e[0] === i && e[1] === j) {
            let a = document.getElementById(`${e[0]}-${e[1]}`);
            let b = document.getElementById(`${e[0]}-${e[1]}-index`);
            a.style.display = 'none';
            b.style.display = 'block';
            existData = e;
            b.focus();
            
          }  else {
            let a = document.getElementById(`${e[0]}-${e[1]}`);
            let b = document.getElementById(`${e[0]}-${e[1]}-index`);
            a.style.display = 'block';
            b.style.display = 'none';
            
          }
        })
        $scope.selectedCell = $scope.selectedCell.filter(data => (existData[0] === data[0] && existData[0] === data[0]))
      }
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
      $scope.selectCols = function(i, j) {
        $scope.selectedCell.push([i, j]);
        $scope.selectedCell.forEach(e => {
          if(e[0] === i && e[1] === j) {
            let a = document.getElementById(`${e[0]}-${e[1]}`);
            let b = document.getElementById(`${e[0]}-${e[1]}-index`);
            a.style.display = 'none';
            b.style.display = 'block';
            b.focus();
          }  else {
            let a = document.getElementById(`${e[0]}-${e[1]}`);
            let b = document.getElementById(`${e[0]}-${e[1]}-index`);
            a.style.display = 'block';
            b.style.display = 'none';
          }
          
        })
         
        
      };
      $scope.format = function(event, count, property){
        if(property.target.checked){
          var table = document.getElementById("mytable");
        table.rows[count+1].style.backgroundColor = "aliceblue";
        console.log(event , count)
        }
        else{
          if((count+1)%2 == 0){
            var table = document.getElementById("mytable");
            table.rows[count+1].style.backgroundColor = "f3f3f3";
          }
          else{
            var table = document.getElementById("mytable");
            table.rows[count+1].style.backgroundColor = "white";
          }

        }
        

      };
      $scope.checkBoxchanges =function(event){
        console.log("checking")
        this.checkbox=event.target.checked
        let data=document.querySelectorAll('.myCheck')
        data.forEach((d)=>{
          console.log(d)
          d.click()
        })

      }

      setTimeout(() => {
      var rows = document.querySelectorAll('.rows');

      // Define the drag event handlers for each row
      rows.forEach(function(row) {
        row.addEventListener('dragstart', function(event) {
          // Set the data that you want to transfer
          event.dataTransfer.setData('text/plain', event.target.id);
      
          // Set the opacity of the dragged row
          event.target.style.opacity = '0.4';
        });
      
        row.addEventListener('dragend', function(event) {
          // Perform any necessary cleanup operations
          event.target.style.opacity = '1';
        });
      });
      rows.forEach(function(row) {
        row.addEventListener('dragover', function(event) {
          // Specify whether the drop target is a valid drop target
          event.preventDefault();
        });
      
        row.addEventListener('drop', function(event) {
          // Retrieve the data that was set in the dragstart event handler
          
          var data = event.dataTransfer.getData('text/plain');
      
          // Get the row that was dragged
          var draggedRow = document.getElementById(data);
      
          // Swap the rows
          //$scope.data = $scope.data.slice(0, 1);
          $scope.deleteRow('eerr');
        
          // /if (event.target.tagName === 'TR') {
            let rowa = draggedRow.parentNode;
            let sibiling = returnParent(event.target)
            rowa.insertBefore(draggedRow, sibiling.nextSibling);
           //}
        });
      });
    }, 1000)

    function returnParent(event) {
      if(event.tagName === 'TR') {
        return event
      } else {
        let a =returnParent(event.parentNode);
        return a;
      }
    } 
      
      // Define the drop event handlers for each row
      
      // $scope.keyPresses = (event, i , j) => {
      //   //console.log(event);
      //   if(event.key === "Tab") {
      //     $scope.selectedCell.forEach(e => {
      //       if(e[0] === i && e[1] === j+1) {
      //         let a = document.getElementById(`${e[0]}-${e[1]}`);
      //         let b = document.getElementById(`${e[1]}-${e[1]}-index`);
      //         a.style.display = 'none';
      //         b.style.display = 'block';
      //       }  else {
      //         let a = document.getElementById(`${e[0]}-${e[1]}`);
      //         let b = document.getElementById(`${e[0]}-${e[1]}-index`);
      //         a.style.display = 'block';
      //         b.style.display = 'none';
      //       }
      //     })
      //   } else if(event.key === "ArrowUp") {
      //     if(i-1 >= 0) {
      //       $scope.selectedCell.push([i-1, j])
      //       $scope.selectedCell.forEach(e => {
      //         if(e[0] === i-1 && e[1] === j) {
      //           let a = document.getElementById(`${e[0]}-${e[1]}`);
      //           let b = document.getElementById(`${e[0]}-${e[1]}-index`);
      //           a.style.display = 'none';
      //           b.style.display = 'block';
      //         }  else {
      //           let a = document.getElementById(`${e[0]}-${e[1]}`);
      //           let b = document.getElementById(`${e[0]}-${e[1]}-index`);
      //           a.style.display = 'block';
      //           b.style.display = 'none';
      //         }
      //       })
      //     } 
         
      //     // let a1 = document.getElementById(`${i-1}-${j}`);
      //     // let b1 = document.getElementById(`${i-1}-${j}-index`);
      //     // if(a1 && b1) {
      //     //   let a = document.getElementById(`${i}-${j}`);
      //     // let b = document.getElementById(`${i}-${j}-index`);
      //     // a.style.display = 'block';
      //     // b.style.display = 'none';
          
      //     // a1.style.display = 'none';
      //     // b1.style.display = 'block';
      //     // }
          
      //   } else if(event.key === "ArrowDown") {
      //     if(i-1 >= 0) {
      //       $scope.selectedCell.push([i+1, j])
      //       $scope.selectedCell.forEach(e => {
      //         if(e[0] === i+1 && e[1] === j) {
      //           let a = document.getElementById(`${e[0]}-${e[1]}`);
      //           let b = document.getElementById(`${e[0]}-${e[1]}-index`);
      //           a.style.display = 'none';
      //           b.style.display = 'block';
      //         }  else {
      //           let a = document.getElementById(`${e[0]}-${e[1]}`);
      //           let b = document.getElementById(`${e[0]}-${e[1]}-index`);
      //           a.style.display = 'block';
      //           b.style.display = 'none';
      //         }
      //       })
      //     } 
      //   }
      // }
      $scope.deleteRow = function (row) {
        // delete the row
        //$scope.data = $scope.data.slice(0, 4);
        console.log(row);
      };
      $scope.$watch("data", function () {
        // update the table
        console.log("fayyas")
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

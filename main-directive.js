
angular.module('myApp', [])
  .directive('myDirective', function ($http) {
    return {
      restrict: "AEC",
      scope: {
        onButtonClick: "&",
        ngModel: "=",
        SortColumn: '=',
        sortBy: "&",
      },
      link: function (scope, element, attrs) {
        scope.card = "Daniel"
        scope.isGroup = false
        scope.isFreeze = JSON.parse(attrs.ngFreeze)
        scope.myFlagCheckboxModel = false;
        scope.toggleFirstColumn = false
        scope.message = attrs.type;
        let datas = JSON.parse(attrs.datasource);
        scope.HeaderColorOptions = JSON.parse(attrs.headercoloroptions);
        scope.moreOptions = JSON.parse(attrs.moreoptions);
        scope.data = datas.data;
        scope.column = datas.column;
        scope.columnData = datas.column;
        scope.tableData = [];
        scope.tableColumn = scope.column
        scope.curPage = 1,
          scope.itemsPerPage = 5,
          scope.maxSize = 5;
        // scope.tableData = [...datas.data];
        scope.originalData = scope.data
        this.items = scope.data;
        let begin = ((scope.curPage - 1) * scope.itemsPerPage);
        let end = begin + scope.itemsPerPage;

        scope.tableData = scope.data.slice(begin, end);

        scope.numOfPages = function () {
          //
          scope.tableData = scope.data.slice(parseInt(scope.curPage - 1) * parseInt(scope.itemsPerPage), (parseInt(scope.curPage - 1) * parseInt(scope.itemsPerPage)) + parseInt(scope.itemsPerPage))
          var noOfPages = Math.ceil(scope.data.length / scope.itemsPerPage);
          // scope.freezeInitialied()
          scope.initialFreezeColumn()
          return noOfPages

        };

        scope.prevPage = function () {
          if (scope.curPage > 1) {
            scope.curPage--;
          }
          scope.tableData = scope.data.slice(parseInt(scope.curPage) * parseInt(scope.itemsPerPage), (parseInt(scope.curPage) * parseInt(scope.itemsPerPage)) + parseInt(scope.itemsPerPage))
        };

        // Function to handle next page button click
        scope.nextPage = function () {
          if (scope.curPage < scope.numOfPages()) {
            scope.curPage++;
          }
          scope.tableData = scope.data.slice(parseInt(scope.curPage) * parseInt(scope.itemsPerPage), (parseInt(scope.curPage) * parseInt(scope.itemsPerPage)) + parseInt(scope.itemsPerPage))
        };

        scope.gotopage = function (n) {
          scope.curPage = n
          scope.tableData = scope.data.slice(parseInt(scope.curPage) * parseInt(scope.itemsPerPage), (parseInt(scope.curPage) * parseInt(scope.itemsPerPage)) + parseInt(scope.itemsPerPage))
        }

        // Function to set current page
        scope.setPage = function (page) {
          scope.curPage = page;
          scope.tableData = scope.data.slice(parseInt(scope.curPage) * parseInt(scope.itemsPerPage), (parseInt(scope.curPage) * parseInt(scope.itemsPerPage)) + parseInt(scope.itemsPerPage))
        };

        scope.$watch('curPage + numPerPage', function () {
          //                               var begin = ((scope.curPage - 1) * scope.itemsPerPage),
          // end = begin + scope.itemsPerPage;

          // scope.tableData = scope.data.slice(begin, end);
        });
        scope.pages = Array.from({ length: scope.numOfPages() }, (_, i) => i + 1);
        // setTimeout(function () {
        //   $("#mytable").DataTable(); // Initialize DataTables plugin after AngularJS data is populated
        //   $("#mytable").tableDnD(); // Initialize TableDnD plugin for row drag-and-drop
        // $(".table").dragableColumns(); //Initialize dragndropjs for column dragndrop
        // }, 0);
        scope.temp = scope.column;
        console.log(scope.tableData)
        scope.objectKeys = Object.keys(scope.tableData[0])
      },
      templateUrl: "html/table.html",
      controller: function ($scope, $document) {

        $document.on('click', function (event) {
          var isClickedElementChildOfPopup = event.target.closest("#closePopup")
          var isClickedElementTriggerButton = event.target.matches('#triggerClosePopup');
          if (!isClickedElementChildOfPopup && !isClickedElementTriggerButton) {
            var isClickedElementGChildofPop = event.target.matches(".sortPopup")
            if (!isClickedElementGChildofPop) {
              $scope.sortPopupVisible = false;
              $scope.$apply();
            }

            if ($scope.optionForAddColumn) {
              filterPop = $scope.optionForAddColumn.field
              if (filterPop == 'Filter by this field') {
                // $scope.filterIcon = true
                $scope.filterByField($scope.columnForAddColumn)
                $scope.optionForAddColumn = undefined
                $scope.columnForAddColumn = undefined
              }
            }

            else {

              $scope.filterIcon = false
            }
            // $scope.filterIcon = !$scope.filterIcon
            $scope.viewHideColumn = false
            $scope.$apply()

          };

          var isClickedElementChildOfPopup = event.target.closest(".popup-container")
          var t = event.target.closest("#closeSidePopup")
          let wantedFields = ['Edit field', 'Set Column Header Color', 'Set Full Column Color', 'Set Conditional Colours']
          if ($scope.optionForAddColumn) {
            filterPop = $scope.optionForAddColumn.field
            if (!wantedFields.includes(filterPop)) {
              // $scope.filterIcon = true
              $scope.$apply(function () {
                $scope.popup.style.display = "none";
              })
            }
            $scope.optionForAddColumn = undefined
          }
          if (!isClickedElementChildOfPopup && !isClickedElementTriggerButton && !t) {

            $scope.addFieldPopup = false
            $scope.deleteIcon = false
            $scope.$apply(function () {
              $scope.popup.style.display = "none";
            })
          }

          //           var isClickedElementChildOfPopup = event.target.closest("#filterModal")
          //           var isClickedElementTriggerButton = event.target.matches('#triggerPopup');
          //           if (!isClickedElementChildOfPopup && !isClickedElementTriggerButton) {
          //             $scope.filterIcon = false
          //             console.log(event.target.closest("#filterModal"))
          //             // console.log("true")
          //           }

          // }

        });
        setTimeout(() => {
          $scope.hidingColumnArryList = [...$scope.column];
          $scope.constColumnArryList = [...$scope.column];
        }, 1000)
        // 
        // $scope.freezeInitialied = () => {
        //   $scope.resetFreeze()
        //   console.log(typeof $scope.isFreeze)
        //   if ($scope.isFreeze === true) {
        //     var style = document.getElementById(`columns0`)
        //     var colsHeadStyle = window.getComputedStyle(style)
        //     var colsHeadWidth = colsHeadStyle.getPropertyValue("left");
        //     var colsHead = document.querySelector(`#myTable th:nth-child(2)`);
        //     console.log(colsHead.offsetLeft)
        //     // const nextHeader = document.querySelector(`#myTable th:nth-child(${$scope.freezeColumnIndex +3})`);
        //     var cols = document.querySelectorAll(`#myTable tbody td:nth-child(2)`);
        //     console.log(cols, colsHead)
        //     cols.forEach(cell => {
        //       cell.style.position = 'sticky';
        //       cell.style.left = cell.offsetLeft - 20
        //       cell.style.backgroundColor = 'white'
        //       cell.style.zIndex = 0
        //     });
        //     colsHead.style.position = 'sticky';
        //     colsHead.style.left = colsHead.offsetLeft -20
        //     colsHead.style.backgroundColor = '#ddd'
        //     colsHead.style.zIndex = 2
        //   }
        // }

        setTimeout(() => {




          var cells = document.getElementsByTagName("td");

          // Loop through each cell
          for (var i = 0; i < cells.length; i++) {
            // Add event listener for mouseover event
            cells[i].addEventListener("mouseover", function (event) {
              // Check if mouse pointer is near the right or bottom edge of the cell
              var rect = this.getBoundingClientRect();
              var x = event.clientX;
              var y = event.clientY;
              var rightEdge = rect.right;
              var bottomEdge = rect.bottom;
              var leftEdge = rect.left;
              var topEdge = rect.top;
              if (x >= rightEdge - 5 || y >= bottomEdge - 5 || x <= leftEdge + 5 || y <= topEdge + 5) {

                // console.log(rightEdge,x)
                // Set cursor to "se-resize" to indicate resizing is possible
                this.style.cursor = "cell";
                // Add event listener for mousedown event
                this.addEventListener("mousedown", startResize);
              } else {
                // Reset cursor to default
                this.style.cursor = "default";
                // Remove event listener for mousedown event
                this.removeEventListener("mousedown", startResize);
              }
            });
          }

          // Function to handle mousedown event for resizing
          function startResize(event) {
            var cell = this;
            var originalWidth = cell.offsetWidth;
            var originalHeight = cell.offsetHeight;
            var originalX = event.clientX;
            var originalY = event.clientY;

            // Add event listener for mousemove event
            document.addEventListener("mousemove", resize);

            // Add event listener for mouseup event
            document.addEventListener("mouseup", stopResize);

            // Function to handle mousemove event for resizing
            function resize(event) {
              console.log('ladkfjsal', cell.style)
              var width = originalWidth + (event.clientX - originalX);
              var height = originalHeight + (event.clientY - originalY);
              cell.style.minWidth = width + "px";
              cell.style.height = height + "px";

            }

            // Function to handle mouseup event to stop resizing
            function stopResize() {
              // Remove event listeners for mousemove and mouseup events
              document.removeEventListener("mousemove", resize);
              document.removeEventListener("mouseup", stopResize);
            }
          }
        }, 1000);



        $scope.filter_column = true;
        $scope.conditionDropdownItems = ["WHERE", "AND", "OR"];
        $scope.expressionDropdownItems = ["EQUAL", "NOT EQUAL", "LIKE", "NOT LIKE", "IN", "NOT IN", "IS"];
        $scope.checked = []
        $scope.myForm = {
          myFields: [
            { condition: "WHERE", columnName: "", expression: "", value: "" },
          ],
        };

        $scope.ColumnForm = {
          myFields: [
            { name: "", no: "" },
          ],
          arrangement: "",
        }
        $scope.selectedCell = [];
        $scope.parents = [{
          name: 'sabari',
          age: '25',
          children: [{

            name: 'sabari',
            age: '25',
          }]
        }]
        $scope.checkbox = false;
        // $scope.myData = ""; // Initialize the variable to hold the input field data

        window.addEventListener('keydown', function (event) {
          // some code here
          if ($scope.selectedCell.length) {

            let as = $scope.selectedCell[$scope.selectedCell.length - 1];
            let i = as[0];
            let j = as[1];
            if (event.key === "Tab") {
              event.preventDefault();
              $scope.selectedCell.push([i, j + 1])
              updateCellByButton(i, j + 1);
            } else if (event.key === "ArrowUp") {
              if (i - 1 >= 0) {
                $scope.selectedCell.push([i - 1, j])
                updateCellByButton(i - 1, j)
              }

            } else if (event.key === "ArrowDown") {
              if (i >= 0) {
                $scope.selectedCell.push([i + 1, j])
                updateCellByButton(i + 1, j);
              }
            } else if (event.key === "ArrowLeft") {
              if (j - 1 >= 0) {
                updateCellByButton(i, j - 1);
              }

            }
          }
        });

        function updateCellByButton(i, j) {
          let existData = [];
          $scope.selectedCell.forEach(e => {
            if (e[0] === i && e[1] === j) {
              let a = document.getElementById(`${e[0]}-${e[1]}`);
              let b = document.getElementById(`${e[0]}-${e[1]}-index`);
              if (a && b) {
                a.style.display = 'none';
                b.style.display = 'block';
                b.focus();
              }

              existData = e;


            } else {
              let a = document.getElementById(`${e[0]}-${e[1]}`);
              let b = document.getElementById(`${e[0]}-${e[1]}-index`);
              if (a && b) {
                a.style.display = 'block';
                b.style.display = 'none';
              }


            }
          })
          $scope.selectedCell = $scope.selectedCell.filter(data => (existData[0] === data[0] && existData[0] === data[0]))
        }
        $scope.toggleSidenav = () => {
          // const sideNav = document.querySelector('.side-nav');
          // sideNav.classList.toggle('side-nav--open');
          // document.getElementById("mySidenav").classList.add("show-nav");

          // $scope.column = [{field: 'test', type: 'input', daatType: 'input', editable: true}].concat($scope.column)
          $scope.toggleFirstColumn = !$scope.toggleFirstColumn
          $scope.freezeColumn(0, 'MyViews')

        }
        // document.getElementsByClassName("closebtn")[0].addEventListener("click", function() {
        //   document.getElementById("mySidenav").classList.remove("show-nav");
        // });


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
        $scope.selectCols = function (i, j) {
          $scope.selectedCell.push([i, j]);
          $scope.selectedCell.forEach(e => {
            if (e[0] === i && e[1] === j) {
              let a = document.getElementById(`${e[0]}-${e[1]}`);
              let b = document.getElementById(`${e[0]}-${e[1]}-index`);
              a.style.display = 'none';
              b.style.display = 'block';
              b.focus();
              document.addEventListener("click", function () {
                b.blur(); // Remove focus from the input element
                a.style.display = 'block';
                b.style.display = 'none';
              });
            } else {
              let a = document.getElementById(`${e[0]}-${e[1]}`);
              let b = document.getElementById(`${e[0]}-${e[1]}-index`);
              a.style.display = 'block';
              b.style.display = 'none';
            }

          })


        };
        $scope.format = function (event, count, property) {
          if (property.target.checked) {
            var table = document.getElementById("mytable");
            table.rows[count + 1].style.backgroundColor = "aliceblue";
            console.log(event, count)
          }
          else {
            if ((count + 1) % 2 == 0) {
              var table = document.getElementById("mytable");
              table.rows[count + 1].style.backgroundColor = "f3f3f3";
            }
            else {
              var table = document.getElementById("mytable");
              table.rows[count + 1].style.backgroundColor = "white";
            }

          }


        };
        $scope.checkBoxchanges = function (event) {
          console.log("checking")
          this.checkbox = event.target.checked
          let data = document.querySelectorAll('.myCheck')
          data.forEach((d) => {
            console.log(d)
            d.click()
          })

        }


        $scope.removeField = function (index) {
          $scope.myForm.myFields.splice(index, 1);
        };
        $scope.getColumn = function (index) {
          if (!index) {
            return
          }
          if (!$scope.getColumnList) {
            $scope.getColumnList = []
          }
          $scope.getColumnList.push(index)
        };
        $scope.removeColumn = function (index) {
          $scope.getColumnList.splice(index, 1)
        }
        $scope.addField = function () {
          var field = {
            condition: "",
            columnName: "",
            expression: "",
            value: "",
          };
          $scope.myForm.myFields.push(field);
          console.log($scope.myForm);
        };
        $scope.submitForm = function () {
          $scope.assignValues();
          $scope.column.forEach((value) => {
            console.log(value.field);
            $scope.data.forEach((da) => {
              if (!$scope.filterData[value.field].includes(da[value.field])) {
                $scope.filterData[value.field].push(da[value.field]);
              }
            });
          });
          console.log($scope.filterData);
        };

        $scope.assignValues = () => {
          $scope.filterData = {};
          // console.log($scope.column,$scope.data)
          $scope.column.forEach((value) => {
            //  console.log($scope.data[0][value.field]);
            $scope.filterData[value.field] = [];
            // console.log(value)
          });
          // console.log($scope.filterData)
        };

        $scope.viewTable = () => {
          if ($scope.getColumnList.length) {
            $scope.column = $scope.tableColumn.filter((item) => {
              return $scope.getColumnList.includes(item.field);
            });
          }
          else {
            $scope.column = $scope.tableColumn
          }


        }

        $scope.filterTable = () => {
          // Filter
          console.log($scope.originalData)
          let filteredObjects = []
          let checkConditions = false;
          let tempObject = [];
          let orderedFilterList = []
          let filterOrder = ['not like', 'like', 'not equal', 'equal']
          // $scope.data=$scope.datas
          $scope.tableData = $scope.originalData;
          // console.log($scope.myForm.myFields)
          const filterArr = $scope.myForm.myFields;


          filterArr.forEach((da) => {
            if (da['condition'].toLowerCase() == 'or') {
              checkConditions = true
            }
          })
          if (checkConditions) {
            orderedFilterList = filterArr;
          } else {
            filterOrder.forEach((filterorder) => {
              filterArr.forEach((filterarr) => {
                if ((filterarr['expression']).toLowerCase() == filterorder) {
                  orderedFilterList.push(filterarr)
                }
              })
            })
          }
          if (orderedFilterList.length > 0) {
            orderedFilterList.forEach((filterValue) => {

              if ((filterValue.condition).toLowerCase() === 'and' || (filterValue.condition).toLowerCase() === 'where') {
                if ((orderedFilterList.indexOf(filterValue) == 0)) {
                  $scope.originalData.filter((col) => {
                    return $scope.queryCondition(filterValue, col);
                  }).forEach((da) => {
                    if (!tempObject.includes(da)) {
                      tempObject.push(da);
                    }
                  })
                }
                else {
                  tempObject = tempObject.filter((col) => {
                    return $scope.queryCondition(filterValue, col);
                  });
                }
              }
              else if (filterValue.condition.toLowerCase() === "or") {
                filteredObjects = $scope.originalData.filter((col) => {
                  return $scope.queryCondition(filterValue, col);
                });
                filteredObjects.forEach((da) => {
                  if (!tempObject.includes(da)) {
                    tempObject.push(da)
                  }
                })
              }
            })

            $scope.data = tempObject;
            $scope.numOfPages()
          }
          else {
            filteredObjects = $scope.data;
          }

        }



        $scope.queryCondition = (filterValue, data) => {
          switch ((filterValue.expression).toLowerCase()) {
            case 'equal':
              if (data[filterValue.columnName.field].toString() === filterValue.value) {
                return true;
              }
              return false;
            case 'not equal':
              if (data[filterValue.columnName.field].toString() !== filterValue.value) {
                return true;
              }
              return false;
            case 'like':
              return $scope.filterValuefun(data, filterValue.value, filterValue.columnName.field);
            case 'not like':
              console.log("not like => ", filterValue)
              return !$scope.filterValuefun(data, filterValue.value, filterValue.columnName.field);
            default:
              return false
          }
        }


        $scope.filterValuefun = (col, filter, key = null) => {
          console.log(col, filter, key)
          if (key) {
            if (col[key].toString().toLowerCase().includes(filter.toLowerCase())) {
              return true;
            }
            else {
              return false;
            }
          }
          else {
            let keys = Object.keys(col);
            for (let key of keys) {
              console.log(key)
              if (col[key].toString().toLowerCase().includes(filter.toLowerCase())) {
                return true;
              }
            }
          }

          return false
        }

        setTimeout(() => {
          $scope.initialFreezeColumn()

          var rows = document.querySelectorAll('.rows');
          var columns = document.querySelectorAll('.columns');
          columns.forEach(function (row) {
            row.addEventListener('dragstart', function (event) {
              // Set the data that you want to transfer
              event.dataTransfer.setData('text/plain', event.target.id);

              // Set the opacity of the dragged row
              event.target.style.opacity = '0.4';
            });

            row.addEventListener('dragend', function (event) {
              // Perform any necessary cleanup operations
              event.target.style.opacity = '1';
            });
          });
          columns.forEach(function (row) {
            row.addEventListener('dragover', function (event) {
              // Specify whether the drop target is a valid drop target
              event.preventDefault();
            });

            row.addEventListener('drop', function (event) {
              // Retrieve the data that was set in the dragstart event handler

              var data = event.dataTransfer.getData('text/plain');

              // Get the row that was dragged
              var draggedRow = document.getElementById(data);
              let i = Number(draggedRow.id.slice(7));
              // Swap the rows
              //$scope.data = $scope.data.slice(0, 1);
              $scope.deleteRow('eerr');

              // /if (event.target.tagName === 'TR') {
              let rowa = draggedRow.parentNode;
              let sibiling = returnParent(event.target, 'TH')
              let j = Number(sibiling.id.slice(7));
              let a = $scope.column.splice(i, 1);
              $scope.column.splice(j, 0, ...a);
              $scope.$apply();
              //let sibiling = returnParent(event.target)
              //rowa.insertBefore(draggedRow, sibiling.nextSibling);
              //}
            });
          });

          // Define the drag event handlers for each row
          rows.forEach(function (row) {
            row.addEventListener('dragstart', function (event) {
              // Set the data that you want to transfer
              event.dataTransfer.setData('text/plain', event.target.id);

              // Set the opacity of the dragged row
              event.target.style.opacity = '0.4';
            });

            row.addEventListener('dragend', function (event) {
              // Perform any necessary cleanup operations
              event.target.style.opacity = '1';
            });
          });
          rows.forEach(function (row) {
            row.addEventListener('dragover', function (event) {
              // Specify whether the drop target is a valid drop target
              event.preventDefault();
            });

            row.addEventListener('drop', function (event) {
              // Retrieve the data that was set in the dragstart event handler

              var data = event.dataTransfer.getData('text/plain');

              // Get the row that was dragged
              var draggedRow = document.getElementById(data);
              let i = Number(draggedRow.id.slice(4));
              // Swap the rows
              //$scope.data = $scope.data.slice(0, 1);
              $scope.deleteRow('eerr');

              // /if (event.target.tagName === 'TR') {
              let rowa = draggedRow.parentNode;
              let sibiling = returnParent(event.target, 'TR')

              let j = Number(sibiling.id.slice(4));
              let c = $scope.tableData.splice(i, 1);
              $scope.tableData.splice(j, 0, ...c);
              //$scope.tableData = [...$scope.tableData];
              $scope.$apply();
              // rowa.insertBefore(draggedRow, sibiling.nextSibling);

              //}
            });
          });
        }, 1000)

        function returnParent(event, data) {
          if (event.tagName === data) {
            return event
          } else {
            let a = returnParent(event.parentNode, data);
            return a;
          }
        }

        $scope.togglePopup = (headerIndex) => {
          $scope.editPopup = false
          console.log(headerIndex)
          $scope.popup = document.getElementById("popup-" + headerIndex);
          $scope.allPopups = document.getElementsByClassName("popup-container");
          $scope.isVisible = window.getComputedStyle($scope.popup).getPropertyValue("display") === "block";
          //   if (isVisible) {
          //     popup.style.display = "none";
          // } else {
          //     popup.style.display = "block";
          // }
          for (var i = 0; i < $scope.allPopups.length; i++) {
            if ($scope.allPopups[i] !== $scope.popup) {
              $scope.allPopups[i].style.display = "none";
            }
          }
          if ($scope.popup.style.display === "none" || !$scope.isVisible) {
            $scope.popup.style.display = "block";
          } else {
            $scope.popup.style.display = "none";
          }
        }
        // Add click event listener on document to close popup when clicked outside
        //    document.addEventListener("click", function(event) {
        //     var popups = document.getElementsByClassName("popup-container");
        //     for (var i = 0; i < popups.length; i++) {
        //         if (popups[i].style.display === "block" && !popups[i].contains(event.target)) {
        //             popups[i].style.display = "none";
        //         }
        //     }
        // });
        // Function to set dynamic header cell color
        // Function to open color picker for selecting color
        $scope.deleteIcon = false
        $scope.openColorPicker = (option, headerIndex, column) => {
          $scope.isColorOption = !$scope.isColorOption;
          $scope.colorPopupIndex = headerIndex

          $scope.optionForAddColumn = option
          $scope.curOption = option
          $scope.columnForAddColumn = column

          if (option.field == "Insert left" || option.field == "Insert right") {
            $scope.addFieldPopup = true
            // $scope.addColumn(option, column)
          }
          else if (option.field == 'Delete field') {
            // $scope.deleteColumn(column)
            $scope.columnNamee = column
            $scope.deleteIcon = true
          }
          else if (option.field == 'Duplicate field') {
            $scope.generateDuplicateField(column)
          }
          else if (option.field == 'Filter by this field') {
            $scope.filterByField(column)
          }
          else if (option.field == 'Edit field') {
            $scope.editPopup = true
          }

        }

        $scope.headerColor = (index, color, option, column) => {
          if (option === "Set Column Header Color") {
            // var colorPicker = document.getElementById("color-picker");
            // colorPicker.value = document.getElementById("columns" + headerIndex).style.backgroundColor;
            // colorPicker.addEventListener("change", function() {
            //     setHeaderColor(headerIndex, colorPicker.value);
            // });
            // colorPicker.click();
            document.getElementById("columns" + index).style.backgroundColor = color;
          } else if (option === "Set Full Column Color") {
            var targetHeaderText = column.field;

            // Find the index of the target column
            var targetColumnIndex = -1;
            var table = document.querySelector('.table');
            var headerRow = table.rows[0];
            for (var i = 0; i < headerRow.cells.length; i++) {
              if (headerRow.cells[i].innerText.includes(targetHeaderText)) {
                targetColumnIndex = i;
                break;
              }
            }

            // Set the background color of the cells in the target column
            if (targetColumnIndex !== -1) {
              var targetCells = table.querySelectorAll('tr td:nth-child(' + (targetColumnIndex + 1) + ')');
              for (var j = 0; j < targetCells.length; j++) {
                targetCells[j].style.backgroundColor = color; // Set desired background color for the column
              }
            }
            // document.getElementById("cell").style.backgroundColor = color;
          }
        }
        $scope.closePopup = (headerIndex) => {
          document.getElementById("popup-" + headerIndex).style.display = "none";
        }

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
        // $scope.freezeColumn = function (index, field, event) {
        //   console.log(event.target)
        //   const styleElement = document.createElement('style'); // create a new style element
        //   document.head.appendChild(styleElement); // append the style element to the head of the document

        //   const styleSheet = styleElement.sheet;
        //   cell = event.currentTarget.parentElement.parentElement.parentElement
        //   console.log(cell)
        //   if (cell.tagName == 'TH' || cell.tagName == 'TD') {
        //     var cellLeft = cell.offsetLeft;
        //     var cellHeight = cell.offsetHeight;
        //     console.log(cellLeft, cellHeight)

        //   }
        //   $scope.freezeColumnIndex = index
        //   console.log($scope.column)
        //   if ($scope.freezeColumnIndex !== null && $scope.freezeColumnIndex >= 0 && $scope.freezeColumnIndex < $scope.column.length) {

        //     // var forzenCount =0;
        //     // angular.forEach($scope.column, (col)=>{
        //     //   if(col.field === field){
        //     //     const cssRule = `.freeze{
        //     //       position: sticky;
        //     //       left: 0;
        //     //       z-index: 1;
        //     //       background-color: #009879;}`
        //     //       // $scope.column[$scope.freezeColumnIndex].frozen = !$scope.column[$scope.freezeColumnIndex].frozen;
        //     //       styleSheet.insertRule(cssRule,0)
        //     //       cell.style.position='sticky';
        //     //       cell.style.left = cellLeft+'px'
        //     //       console.log(cell)

        //     //     }
        //     //     else{
        //     //       // col.frozen = false;

        //     //     }
        //     // })

        //     var frozenCount = 0;
        //     angular.forEach($scope.column, (col) => {
        //       if (col.field === field) {
        //         var preHeader = document.getElementById(`columns${$scope.freezeColumnIndex - 1}`)
        //         var nextHeader = document.getElementById(`columns${$scope.freezeColumnIndex + 1}`)
        //         var nextHeaderStyle = window.getComputedStyle(nextHeader)
        //         var nextHeaderPosition = nextHeaderStyle.getPropertyValue("position");
        //         var preHeaderStyle = window.getComputedStyle(preHeader)
        //         var preHeaderPosition = preHeaderStyle.getPropertyValue("position");
        //         // console.log(width)
        //         // Add the "freeze" CSS class to the header and cells of the selected column
        //         // const preHeader = document.querySelector(`#myTable th:nth-child(${$scope.freezeColumnIndex +1})`);
        //         const header = document.querySelector(`#myTable th:nth-child(${$scope.freezeColumnIndex + 2})`);
        //         // const nextHeader = document.querySelector(`#myTable th:nth-child(${$scope.freezeColumnIndex +3})`);
        //         const cells = document.querySelectorAll(`#myTable tbody td:nth-child(${$scope.freezeColumnIndex + 2})`);
        //         // header.classList.add('freeze');
        //         console.log(preHeader.style, nextHeader.style)
        //         if (preHeaderPosition === 'sticky' && header.style.position === 'sticky' && nextHeaderPosition === 'static') {
        //           header.style.position = 'static'
        //           header.style.backgroundColor = '#ddd'
        //           cells.forEach(cell => {
        //             cell.style.position = 'static';
        //             cell.style.backgroundColor = 'white'
        //           });
        //           // header.style.left = (cellLeft-header.style.left)+'px'
        //           console.log('hello', header.style)
        //         }
        //         else if (preHeaderPosition === 'sticky' && (header.style.position === 'static' || header.style.position === '') && nextHeaderPosition === 'static') {

        //           cells.forEach(cell => {
        //             cell.style.position = 'sticky';
        //             cell.style.left = (cellLeft) + 'px'
        //             cell.style.backgroundColor = 'white'
        //           });
        //           header.style.position = 'sticky';
        //           header.style.left = (cellLeft) + 'px'
        //           header.style.backgroundColor = '#ddd'
        //           header.style.zIndex = 2
        //           console.log('=====>', header.style, cells.style)

        //         }
        //         else {

        //         }

        //       } else {
        //         // Remove the "freeze" CSS class from the header and cells of other columns
        //         const header = document.querySelector(`#myTable th:nth-child(${$scope.freezeColumnIndex + 1})`);
        //         const cells = document.querySelectorAll(`#myTable tbody td:nth-child(${$scope.freezeColumnIndex + 1})`);
        //         header.classList.remove('freeze');
        //         cells.forEach(cell => {
        //           cell.classList.remove('freeze');
        //         });
        //       }
        //     });

        //   }

        // };
        // freeze function
        // $scope.initialFreezeColumn()
        $scope.initialFreezeColumn = () => {
          var ths = document.querySelectorAll('th[id*="columns"]');
          for (var i = 0; i < ths.length; i++) {
            $scope.head = ths[i];
            $scope.cols = document.querySelectorAll('td#columns' + i);
            var style = getComputedStyle(ths[i])
            var colStyle = getComputedStyle($scope.cols[0])
            var position = style.getPropertyValue('position')
            // var width = colStyle.getPropertyValue('width')
            // width = parseInt(width,10)
            width = 100
            if (position == 'sticky') {
              $scope.freezeCondition('sticky', 'static', 'static', i, width)
            }

          }
          // ths.forEach((th)=>{
          //   var style = getComputedStyle(th)
          //   var position = style.getPropertyValue('position')
          //   if(position === 'sticky')
          //   $scope.freezeCondition('sticky','static','static') 

          // })
        }
        $scope.freezeColumn = (a, c) => {
          console.log(a, c)
          $scope.head = document.querySelector('th#' + c)
          $scope.cols = document.querySelectorAll('td#' + c);
          var headStyle = getComputedStyle($scope.head)
          var headPosition = headStyle.getPropertyValue('position')
          var headWidth = headStyle.getPropertyValue('width')
          headWidth = parseInt(headWidth, 10)
          if (a > 0) {
            var prehead = getComputedStyle(document.querySelector('th#columns' + (a - 1)))

            var preHeaderPosition = prehead.getPropertyValue('position');

            var nexthead = getComputedStyle(document.querySelector('th#columns' + (a + 1)))
            var nextHeaderPosition = nexthead.getPropertyValue('position')
            $scope.freezeCondition(preHeaderPosition, headPosition, nextHeaderPosition, a, headWidth)

          }
          else if (a == 0) {
            var nexthead = getComputedStyle(document.querySelector('th#columns' + (a + 1)))
            var nextHeaderPosition = nexthead.getPropertyValue('position')
            $scope.freezeCondition('sticky', headPosition, nextHeaderPosition, a, headWidth)
          }




        }
        $scope.freezeCondition = (pre, present, next, index, headWidth) => {
          if (pre == 'sticky' && present === 'static' && next == 'static') {
            $scope.head.style.position = 'sticky'
            $scope.head.style.left = 200 * (index)
            $scope.head.style.backgroundColor = '#ddd'
            $scope.head.style.zIndex = 1
            $scope.cols.forEach((td) => {
              var style = getComputedStyle(td)
              var position = style.getPropertyValue('position')
              var width = style.getPropertyValue('width')
              width = parseInt(width, 10)
              console.log(position, width, index)
              if (position === 'static') {
                td.style.position = 'sticky'
                td.style.left = 200 * index
                td.style.backgroundColor = 'white'
              }
            })
          }

          else if (pre == 'sticky' && present === 'sticky' && next == 'static') {
            $scope.head.style.position = 'static'
            $scope.head.style.left = 100 * index
            $scope.head.style.backgroundColor = '#ddd'
            $scope.head.style.zIndex = 1
            $scope.cols.forEach((td) => {
              var style = getComputedStyle(td)
              var position = style.getPropertyValue('position')
              var width = style.getPropertyValue('width')
              width = parseInt(width, 10)
              console.log(position, width, index)
              if (position === 'sticky') {
                td.style.position = 'static'
                td.style.left = (width) * index + 95
                td.style.backgroundColor = 'white'
              }

            })
          }
        }


        // popup function
        $scope.popupFunction = function (option, idx, column, event) {
          $scope.openColorPicker(option, idx, column);
          if (option.field == "Sort First -> last" || option.field == "Sort First -> first") {
            $scope.sortBy(column.field, option.field);
          }

          if (option.field === "Hide field") {
            $scope.hidingColumn(column.field, event, true)
          }

        }
        // sort

        $scope.sortByField = function (field) {
          if (!$scope.sortedFieldDict) {
            $scope.sortedFieldDict = {};
          }
          $scope.reverse = !$scope.reverse;

          $scope.sortedFieldDict[field] = $scope.reverse

          $scope.updateSortList()

          $scope.sortField = ''
          return $scope.reverse
        };

        $scope.sortBy = function (field, val) {

          if (val === 'Sort First -> last') {
            bolval = true
            $scope.sortedFieldDict = {}
          }
          if (val === 'Sort First -> first') {
            bolval = false
            $scope.sortedFieldDict = {}
          }
          if (val === 'add') {
            bolval = !$scope.reverse
          }
          if (!$scope.sortedFieldDict) {
            $scope.sortedFieldDict = {};
          }
          $scope.reverse = bolval;
          $scope.sortedFieldDict[field] = $scope.reverse

          $scope.updateSortList()

          $scope.sortField = ''
          return $scope.reverse
        };
        $scope.updateSortList = function () {
          $scope.sortedFieldList = []
          for (let name in $scope.sortedFieldDict) {
            if ($scope.sortedFieldDict[name]) {
              $scope.sortedFieldList.push(name)
            }
            else {
              $scope.sortedFieldList.push('-' + name)

            }

          }
        }
        $scope.updateMyObj = function (value) {
          if (value) {
            $scope.sortField = value
          }
          if ($scope.sortField) {
            $scope.sortBy($scope.sortField, "add")
          }
        };
        $scope.updateAscDsc = function (key, val) {
          if (val) {
            val = false
          }
          else {
            val = true
          }
          $scope.sortBy(key, "add")
        };
        $scope.columnDatatype = function () {
          $scope.columnDatatypeDict = {}
          for (let col in $scope.column) {
            c = $scope.column[col]
            $scope.columnDatatypeDict[c.field] = c.dataType
          }
        }
        $scope.removeSort = function (key) {
          delete $scope.sortedFieldDict[key];
          $scope.updateSortList()
        };
        $scope.findsortorder = function (key) {
          if (!$scope.sortedFieldDict) {
            return true
          }
          return $scope.sortedFieldDict[key]
        };
        $scope.showSortPopup = function (event) {
          $scope.sortPopupVisible = true;
          $scope.popupPosition = {
            top: (event.clientY + 15) + 'px',
            left: event.clientX + 'px'
          };

        };
        $scope.showPagination = function (event) {
          if ($scope.numOfPages() > 0 && $scope.tableData.length !== 0) {
            $scope.pagination_details = true;
          }
          else {
            $scope.pagination_details = false;
          }
        };
        $scope.hideSortPopup = function () {
          $scope.sortPopupVisible = false;
        };
        $scope.generateArray = function (n) {
          if (n) {
            return Array(n - 1).fill().map((_, index) => index + 1);
          }
          return 0;
        };
        $scope.groupValue = 'No Views'
        $scope.listData = ['Default', 'First Data', 'Second Data', 'Third Data', 'Fourth Data', 'Fifth Data'];

        $scope.viewIcon = false
        $scope.expandIcon = 'expand_more'
        $scope.viewlistFunc = () => {
          $scope.viewIcon = !$scope.viewIcon
          if ($scope.viewIcon) {
            // $http({
            //   method: 'POST',
            //   url: 'https://c236-14-98-32-198.ngrok-free.app/register',
            //   headers: {
            //     'Content-Type': 'application/json'
            //   },
            //   data: {
            //     name: 'rafiq2s3332343',
            //     password: 'rafiq232ssfds33@gmail.com'
            //   }
            // }).then(function successCallback(response) {
            //   // This function will be called if the API call is successful
            //   $scope.listData = response.data;
            // }, function errorCallback(response) {
            //   // This function will be called if there is an error with the API call
            //   console.error('Error retrieving data:', response.status, response.statusText);
            // });

            $scope.expandIcon = 'expand_less'
          } else {
            $scope.expandIcon = 'expand_more'
          }
        }

        $scope.getListValue = function ($event) {
          console.log($event.currentTarget.textContent)
          $scope.groupValue = $event.currentTarget.textContent
          if ($event.currentTarget.textContent == 'Default') {
            $scope.column = $scope.columnData
          }
          else {
            $scope.newColumn = [{
              field: "name",
              type: "input",
              dataType: 'input',
              editable: true,
            },
            {
              field: "phone",
              type: "input",
              dataType: 'input',
              editable: true,
            },
            {
              field: "email",
              type: "input",
              dataType: 'email',
              editable: false,
            },
            {
              field: "address",
              type: "input",
              dataType: 'text',
              editable: true,
            },
            {
              field: "postalZip",
              type: "input",
              dataType: 'input',
              editable: true,
            },
            ]
            //  $scope.column = $scope.newColumn

            // $scope.columnList = $scope.newColumn.map(item => {
            //   return item.field
            // })

            $scope.columnList = ['name', 'phone']

            $scope.updatedColumn = []
            $scope.column.forEach(column => {
              if ($scope.columnList.includes(column.field)) {
                $scope.updatedColumn.push(column)
              }
            });
            $scope.column = $scope.updatedColumn
            $scope.searchButton = $event => {
              console.log($event)
            }
          }
        }


        $scope.viewHideColumn = false;
        $scope.callDropdown = () => {
          $scope.viewHideColumn = !$scope.viewHideColumn
        }

        $scope.hidingColumn = (event, item, checked = false) => {
          if (!checked) {
            checBox = item.target.checked
          }
          else {
            checBox = checked
          }
          $scope.constColumnArryList.forEach((da) => {
            if (da['field'] == event) {
              da['checked'] = checBox
            }
          })
          console.log(item)
          if (checBox) {
            $scope.column.forEach((da) => {
              if (da['field'] == event) {
                let index = $scope.column.indexOf(da)
                $scope.column.splice(index, 1)
              }
            })
          }
          else {
            $scope.hidingColumnArryList.forEach((d) => {
              if (d['field'] == event) {
                let index = $scope.hidingColumnArryList.indexOf(d)
                $scope.column.splice(index, 0, d)
              }
            })
          }
        }

        $scope.Checkchecked = [];
        $scope.flagIcon = (index) => {
          // $scope.myFlagCheckboxModel = !$scope.myFlagCheckboxModel
          if (!$scope.Checkchecked.includes(index)) {
            $scope.Checkchecked.push(index)
          } else {
            var checkbox = $scope.Checkchecked.indexOf(index)
            $scope.Checkchecked.splice(checkbox, 1)
          }
          $scope.$apply();
          console.log($scope.Checkchecked, "Checkchecked")
        }

        $scope.hidenColumnFilter = (event) => {
          console.log(event, "hidden columns filter")
          $scope.hidingColumnArryList = $scope.constColumnArryList
          $scope.hidingColumnArryList = $scope.hidingColumnArryList.filter((data) => {
            if (data["field"].includes(event)) {
              return true
            }
            return false
          })
        }
        $scope.filterIcon = false
        $scope.toggleFilterPopup = function () {
          $scope.filterIcon = !$scope.filterIcon
        }

        $scope.flagIcon = (index) => {
          // $scope.myFlagCheckboxModel = !$scope.myFlagCheckboxModel
          if (!$scope.checked.includes(index)) {
            checked.push(index)
          } else {
            var checkbox = $scope.checked.indeof(index)
            $scope.checked.splice(checkbox, 1)
          }
          console.log($scope.checked)
        }
        $scope.groupBy = ["list"]
        grouped = {};

        setTimeout(() => {
          console.log($scope.data)
          $scope.data.forEach(function (col) {
            $scope.groupBy.reduce(function (o, g, i) {

              // console.log( g)// take existing object,

              o[col[g]] = o[col[g]] || (i + 1 === $scope.groupBy.length ? [] : {}); // or generate new obj, or
              // console.log('dsghdf', grouped)
              return o[col[g]];
              // at last, then an array
            }, grouped).push(col);
          });
          console.log(grouped)
        }, 1000)

        $scope.addFieldPopup = false
        $scope.toggleaddFieldPopup = (headerName) => {
          // $scope.addFieldPopup = !$scope.addFieldPopup
          // $scope.headerName = headerName
          $scope.addFieldPopup = false
          $scope.addColumn(headerName, $scope.curOption, $scope.columnForAddColumn)
        }

        $scope.headerPopup = false
        $scope.addColumn = (header, option, columnName) => {
          $scope.headerPopup = !$scope.headerPopup
          columnIndex = $scope.column.indexOf(columnName)
          data = {
            // field: $scope.headerName ? $scope.headerName : 'TEST',
            field: header ? header : 'TEST',
            type: "input",
            dataType: 'input',
            editable: true,
            checked: false
          }
          if (option.field == "Insert left") {
            $scope.column.splice(columnIndex, 0, data)
            $scope.hidingColumnArryList = $scope.column;
            $scope.isColorOption = !$scope.isColorOption;
          }
          else if (option.field == "Insert right") {
            $scope.column.splice(columnIndex + 1, 0, data)
            $scope.isColorOption = !$scope.isColorOption;
          }
        }

        $scope.deleteColumn = () => {
          $scope.deleteIcon = !$scope.deleteIcon
          $scope.isVisible = window.getComputedStyle($scope.popup).getPropertyValue("display") === "none";
          columnIndex = $scope.column.indexOf($scope.columnNamee)
          $scope.column.splice(columnIndex, 1)
          $scope.hidingColumnArryList = $scope.column;
        }

        $scope.countNames = function (obj, name) {
          let count = 0;
          for (let prop in obj) {
            if (prop.includes(name)) {
              count++;
            }
          }
          return count;
        }

        $scope.generateDuplicateField = (columnName) => {
          columnIndex = $scope.column.indexOf(columnName)
          oldField = columnName.field
          fieldCount = $scope.countNames($scope.data[0], oldField)
          newField = `${columnName.field}${fieldCount}`
          data = {
            field: newField,
            type: columnName.type,
            dataType: columnName.dataType,
            editable: true,
            checked: columnName.checked
          }
          $scope.column.splice(columnIndex + 1, 0, data)
          $scope.hidingColumnArryList = $scope.column;
          for (let i = 0; i < $scope.data.length; i++) {
            $scope.data[i][newField] = $scope.data[i][columnName.field]
          }
        }

        $scope.fieldNameValue = true
        $scope.filterByField = (columnName) => {
          $scope.filterIcon = true
          $scope.fieldName = columnName.field
        };

        $scope.grouping = function () {
          if (!$scope.isGroup) {
            $scope.grouping = true
          }
          else {
            $scope.grouping = false
          }
        }
        setTimeout(function () {
          $scope.itemsPerPage = '5'
          $scope.$apply()
        }, 1000);
      }
    };
  });

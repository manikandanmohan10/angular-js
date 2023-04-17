angular.module('myApp', [])
.directive('pagination', function() {
    return {
      restrict: 'E',
      scope: {
        items: '=',
        itemsPerPage: '@',
        onPageChange: '&'
      },
      link: function(scope, element, attrs) {
        scope.currentPage = 1;
        
        function generateLinks() {
          const totalPages = Math.ceil(scope.items.length / scope.itemsPerPage);
          
          let linksHtml = '';
          
          for (let i = 1; i <= totalPages; i++) {
            linksHtml += `<a href="#" ng-click="goToPage(${i})">${i}</a>`;
          }
          
          element.html(linksHtml);
        }
        
        scope.goToPage = function(pageNumber) {
          scope.currentPage = pageNumber;
          
          const startIndex = (pageNumber - 1) * scope.itemsPerPage;
          const endIndex = startIndex + scope.itemsPerPage;
          
          const pageItems = scope.items.slice(startIndex, endIndex);
          
          scope.onPageChange({ pageItems: pageItems });
        };
        
        scope.$watchGroup(['items', 'itemsPerPage'], generateLinks);
      }
    };
  });
(function () {
    'use strict';

    angular
            .module('app')
            .controller('ChildrenController', ChildrenController);

    ChildrenController.$inject = ['$rootScope', 'ChildrenService'];
    function ChildrenController($rootScope, ChildrenService) {
        var vm = this;
        vm.children = [];
        vm.isLoading = true;
        initController();
        function initController() {
           
        }


        vm.tableState = {};
        this.callServer = function callServer(tableState) {            
            vm.tableState = tableState;
            loadRemoteData();
        };
        function loadRemoteData() {
            vm.isLoading = true;
            var tableState = vm.tableState;            
            tableState.search.predicateObject = {};
            //tableState.search.predicateObject[searchBy] = searchValue;

            var pagination = tableState.pagination;
            var number = pagination.number || 10;  // Number of entries showed per page.
            var start = pagination.start || 0;  //start index
            var page = start / number + 1;
            var sorting = tableState.sort;
            var sortBy = "fullName";
            var sortOrder = true;
            if (tableState.sort.predicate) {
                sortBy = sorting.predicate;
                sortOrder = sorting.reverse ? false : true;
            }

            ChildrenService.getChildren(page, number, sortBy, sortOrder)
                    .success(function (res) {
                        vm.children = res.Data.Data;
                        tableState.pagination.numberOfPages = res.Data.NumberOfPages;
                        tableState.pagination.totalItemCount = res.Data.TotalItemCount;
                        vm.isLoading = false;
                    })
                    .error(function () {
                        vm.isLoading = false;
                    });

        }
    }

})();
(function () {
    'use strict';

    angular
            .module('app')
            .controller('ChildrenController', ChildrenController);

    ChildrenController.$inject = ['$rootScope', '$modal', 'ChildrenService', 'CommonService'];
    function ChildrenController($rootScope,$modal, ChildrenService, CommonService) {
        var vm = this;
        vm.currentChildren = {};
        vm.children = [];
        vm.classes = [];
        vm.areas = [];
        vm.sexes = [{ name: 'Nam', value: true }, { name: 'Nu', value: false }];
        vm.isLoading = true;
        vm.updateChildren = updateChildren;
        vm.createChildren = createChildren;
        vm.deleteChildren = deleteChildren;
        vm.openPopupUpdateChildren = openPopupUpdateChildren;
        initController();
        function initController() {
            loadClasses();
            loadDistricts();
        }
        function loadClasses() {
            CommonService.getClasses()
            .success(function (res) {
                vm.classes = res.Data;     
            })
            .error(function () {
            });
        }
        function loadDistricts() {
            CommonService.getDistricts()
            .success(function (res) {
                $.each(res.Data, function (idx, item) {
                    $.each(item.Areas, function (i, e) {
                        e.districtName = item.name;
                        vm.areas.push(e);
                    });
                });
                var count = vm.areas.length;
              
            })
            .error(function () {
            });
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
                    $.each(vm.children, function (i, e) {
                        e.isSelect = false;
                    });
                    tableState.pagination.numberOfPages = res.Data.NumberOfPages;
                    tableState.pagination.totalItemCount = res.Data.TotalItemCount;
                    vm.isLoading = false;
                })
                .error(function () {
                    vm.isLoading = false;
                });

        }
        function deleteChildren(id) {
            $("#dialog-confirm").dialog({
                resizable: false,
                width: 350,
                modal: true,
                buttons: {
                    "OK": function () {
                        vm.isLoading = true;
                        ChildrenService.deleteChildren(id)
                        .success(function (res) {
                            vm.children = $.grep(vm.children, function (el, idx) { return el.id === id; }, true);
                            vm.isLoading = false;
                        }).error(function (e) {
                            vm.isLoading = false;
                        });
                        $(this).dialog("close");
                    },
                    Cancel: function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        function updateChildren(child) {
            vm.isLoading = true;
            ChildrenService.updateChildren(child)
                .success(function (res) {                   
                    vm.isLoading = false;
                }).error(function (e) {
                    vm.isLoading = false;
                });
        }
        function createChildren(child) {
            vm.isLoading = true;
            ChildrenService.createChildren(child)
                .success(function (res) {
                    vm.children.push(res.Data);
                    vm.isLoading = false;
                }).error(function (e) {
                    vm.isLoading = false;
                });
        }
        function openPopupUpdateChildren(child, title, status) {
            vm.currentChildren = child;
            vm.currentChildren.status = status;        

            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    title: function () { return title; },
                    vm: function () { return vm; }
                }
            });
        }
    }
    var ModalInstanceCtrl = function (Constants, FlashService, $scope, $modalInstance, title, vm) {

        $scope.updateChildren = updateChildren;
        $scope.cancel = cancel;
        $scope.title = title;
        $scope.currentChildren = vm.currentChildren;
        $scope.areas = vm.areas;
        $scope.classes = vm.classes;
        $scope.sexes = vm.sexes;
        function updateChildren() {
            if ($scope.currentChildren.status == 2) {
                vm.updateChildren($scope.currentChildren);
            }
            else if ($scope.currentChildren.status == 1) {
                vm.createChildren($scope.currentChildren);
            }
            $modalInstance.dismiss('cancel');
        }


        function cancel() {
            $modalInstance.dismiss('cancel');
        };       
    };


})();
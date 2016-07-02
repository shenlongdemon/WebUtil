(function () {
    'use strict';

    angular
            .module('app')
            .factory('ChildrenService', ChildrenService);

    ChildrenService.$inject = ['$http', 'Constants'];
    function ChildrenService($http, Constants) {
        var service = {};

        var API_BASE = Constants.API_BASE;
        var API_GETCHILDREN = API_BASE + "/School/GetChildren?page={page}&perPage={perPage}&sortBy={sortBy}&isAsc={isAsc}";
        var API_DELETECHILDREN = API_BASE + "/School/DeleteChildren?id=";
        var API_UPDATECHILDREN = API_BASE + "/School/UpdateChildren";
        var API_CREATECHILDREN = API_BASE + "/School/CreateChildren";
        
        service.getChildren = getChildren;
        service.deleteChildren = deleteChildren;
        service.updateChildren = updateChildren;
        service.createChildren = createChildren;
        return service;

       

       
       
        function getChildren(page, perPage, sortBy, isAsc) {
            var requestURL = API_GETCHILDREN.replace("{page}", page);
            requestURL = requestURL.replace("{perPage}", perPage);
            requestURL = requestURL.replace("{sortBy}", sortBy);
            requestURL = requestURL.replace("{isAsc}", isAsc);
            return $http.get(requestURL);
        }
        function deleteChildren(id) {
            var requestURL = API_DELETECHILDREN + id;
            return $http.delete(requestURL);
        }
        function updateChildren(child) {
            var requestURL = API_UPDATECHILDREN;
            return $http.put(requestURL, child);
        }
        function createChildren(child) {
            var requestURL = API_CREATECHILDREN;
            return $http.post(requestURL, child);
        }
    }

})();

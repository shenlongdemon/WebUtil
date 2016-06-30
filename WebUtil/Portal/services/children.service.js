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
       
        service.getChildren = getChildren;
        
        return service;

       

       
       
        function getChildren(page, perPage, sortBy, isAsc) {
            var requestURL = API_GETCHILDREN.replace("{page}", page);
            requestURL = requestURL.replace("{perPage}", perPage);
            requestURL = requestURL.replace("{sortBy}", sortBy);
            requestURL = requestURL.replace("{isAsc}", isAsc);
            return $http.get(requestURL);
        }
    }

})();

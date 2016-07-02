(function () {
    'use strict';

    angular
            .module('app')
            .factory('CommonService', CommonService);

    CommonService.$inject = ['$http', 'Constants'];
    function CommonService($http, Constants) {
        var service = {};

        var API_BASE = Constants.API_BASE;
        var API_GETDISTRICTS = API_BASE + "/School/GetDistricts";
        var API_GETCLASSES = API_BASE + "/School/GetClasses";
        service.getDistricts = getDistricts;
        service.getClasses = getClasses;
        
        return service;

       

       
       
        function getDistricts() {
            var requestURL = API_GETDISTRICTS;
            return $http.get(requestURL);
        }
        function getClasses() {
            var requestURL = API_GETCLASSES;
            return $http.get(requestURL);
        }
    }

})();

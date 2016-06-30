(function () {
    'use strict';

    angular
            .module('app')
            .factory('HelperService', HelperService);

    HelperService.$inject = ['$http', 'Constants'];
    function HelperService($http, Constants) {
        var service = {};

        var API_BASE = Constants.API_BASE;
        var API_CONTINENT = API_BASE + "/continents/";
        var API_COUNTRY = API_BASE + "/countries/";
        var API_STATE = API_BASE + "/states/";
        var API_ROLES = API_BASE + "/roles/";
		var API_APPVERSION = API_BASE + "/clientappversion/";

        service.GetAllCountries = GetAllCountries;
        service.GetAllContinents = GetAllContinents;
        service.GetStatesByCountryCode = GetStatesByCountryCode;
        service.GetAllRoles = GetAllRoles;
		service.GetAppVersion = GetAppVersion;

        return service;

        function GetAllCountries() {
            return $http.get(API_COUNTRY, {cache: true});
        }
        function GetAllRoles() {
            return $http.get(API_ROLES, {cache: true});
        }

        function GetAllContinents() {
            return $http.get(API_CONTINENT, {cache: true}).success(function (data) {
                return data;
            })
                    .error(function () {
                        return [];
                    });
        }
        function GetStatesByCountryCode(countryCode, callBack) {
            console.log(countryCode);
            if (!countryCode || countryCode == null) {
                callBack([]);
            }
            return $http.get(API_STATE + "country-" + countryCode, {cache: true})
                    .success(function (data) {
                        callBack(data);
                    })
                    .error(function () {
                        callBack([]);
                    });
        }
		
		function GetAppVersion(currentVersion) {
            console.log(currentVersion);
			 return $http.get(API_APPVERSION+currentVersion, {cache: true})
				.success(function (data) {
					return data;
				});
        }
    }

})();

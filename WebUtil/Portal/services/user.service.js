(function () {
    'use strict';

    angular
            .module('app')
            .factory('UserService', UserService);

    UserService.$inject = ['$http', 'Constants'];
    function UserService($http, Constants) {
        var service = {};

        var API_BASE = Constants.API_BASE;
        var API_LOGIN = API_BASE + "/authenticate/";
        var API_USER = API_BASE + "/users/";
        var API_CONTINENT = API_BASE + "/continents/";
        var API_COUNTRY = API_BASE + "/countries/";
        var API_STATE = API_BASE + "/states/";
        var API_RESET_PASSWORD = API_USER + "resetpassword/{email}/token";
        var API_COMFIRM_RESET_PASSWORD = API_USER + "resetpassword/{token}";
        var API_GETUSER_PAGINATED = API_BASE + "/pagingusers?page={page}&per_page={per_page}&sort_by={sort_by}&sort_order={sort_order}";
        API_GETUSER_PAGINATED = API_GETUSER_PAGINATED + "&search_by={search_by}&search_value={search_value}";
        service.GetAll = GetAll;
        service.Create = Create;
        service.Login = Login;
        service.GetAllCountries = GetAllCountries;
        service.GetAllContinents = GetAllContinents;
        service.GetStatesByCountryCode = GetStatesByCountryCode;
        service.GetByUserName = GetByUserName;
        service.Update = Update;
        service.Delete = Delete;
        service.ResetPassword = ResetPassword;
        service.ComfirmResetPassword = ComfirmResetPassword;
        service.getUserPaginated = getUserPaginated;
        return service;

        function GetAllCountries() {
            return $http.get(API_COUNTRY, {cache: true});
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


        function GetAll() {
            return $http.get(API_USER);
        }
        function GetByUserName(userName) {
            return $http.get(API_USER + userName);
        }

        function Create(user) {
            return $http.post(API_USER, user);
        }


        function Update(user) {
            return $http.put(API_USER, user);
        }
        function Delete(userid) {
            return $http.delete(API_USER + userid);
        }
        function Login(user) {
            return $http.post(API_LOGIN, user);
        }
        function ResetPassword(email) {
            var reset_password_api = API_RESET_PASSWORD.replace("{email}", email);
            return $http.post(reset_password_api);
        }
        function ComfirmResetPassword(token, newPassword, email) {
            var confirm_reset_password_api = API_COMFIRM_RESET_PASSWORD.replace("{token}", token);
            var newpass = {};
            newpass.newPassword = newPassword;
            newpass.email = email;
            return $http.post(confirm_reset_password_api, newpass);
        }

        function getUserPaginated(page, per_page, sort_by, sort_order, search_by, search_value) {
            console.log(">> getUserPaginated");
            console.log("searchBy " + search_by);
            console.log("searchValue " + search_value);
            var requestURL = API_GETUSER_PAGINATED.replace("{page}", page);
            requestURL = requestURL.replace("{per_page}", per_page);
            requestURL = requestURL.replace("{sort_by}", sort_by);
            requestURL = requestURL.replace("{sort_order}", sort_order);
            requestURL = requestURL.replace("{search_by}", search_by);
            requestURL = requestURL.replace("{search_value}", search_value);

            console.log("<< getUserPaginated");
            return $http.get(requestURL);

        }
    }

})();

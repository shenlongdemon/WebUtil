(function () {
    'use strict';

    angular
            .module('app')
            .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$location', '$timeout', 'UserService', 'Constants'];
    function AuthenticationService($http, $cookieStore, $rootScope, $location, $timeout, UserService, Constants) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.IsLoggedIn = IsLoggedIn;
        service.SetRememberMe = SetRememberMe;
        service.SetAuthen = SetAuthen;
        service.redirectWhenLoginSuccess = redirectWhenLoginSuccess;
        return service;

        function Login(username, password, callback) {
            var user = {};
            var response = {};
            user.userName = username;
            user.password = password;
            UserService.Login(user)
                    .success(function (data) {
                        console.log(data);
                        if (data.status == 1) {
                            response = {success: true};
                            SetAuthen(username, password, data.authenticatedUser.email, data.authenticatedUser)

                        } else {
                            response = {success: false, message: data.message};
                        }
                        callback(response);

                    })
                    .error(function () {
                        response = {success: false, message: Constants.API_NOT_AVAILABLE};
                        callback(response);
                    });



        }
        function SetAuthen(username, password, email, authen)
        {
            SetCredentials(username, password, email, authen.name);
            window.localStorage.setItem('authenticatedUser', JSON.stringify(authen));
            $rootScope.configMenu();
        }
        function SetCredentials(username, password, email, name) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata,
                    email: email,
                    name: name
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }
        function redirectWhenLoginSuccess()
        {
            if ($rootScope.isRoleAdmin)
            {
                $location.path('/');
            } else
            {
                $location.path('/assessment');
            }
        }
        function SetRememberMe(rememberMe) {
            $cookieStore.put('rememberMe', rememberMe);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }
        function IsLoggedIn() {
            var globals = $cookieStore.get('globals');
            if (globals)
            {
                return globals.currentUser;
            }
            return false;
        }
    }

    // Base64 encoding service used by AuthenticationService
    var Base64 = {
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                        this.keyStr.charAt(enc1) +
                        this.keyStr.charAt(enc2) +
                        this.keyStr.charAt(enc3) +
                        this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();
(function () {

    var app = angular.module('myApp', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'angular-growl', 'ngTable', 'ngSanitize', 'ui.select','ngResource']);
    app.config(['growlProvider', function (growlProvider) {
        growlProvider.globalTimeToLive(4000);
        growlProvider.globalPosition('top-right');
    }]);
    app.factory('authInterceptor', function ($location, $q, growl,$state) {
      

        return {
            request: function (config) {
                config.headers = config.headers || {};

                config.headers.Authorization = "Bearer " + localStorage.getItem("secret_token");

                return config;
            }, responseError: function (response) {
            if (response && response.status === 401) {
                growl.error("You are not Authorized!! Please Login!!",{
                    onclose:function(){
                        $state.go('login');
                    }
                })
            }
            if (response && response.status === 500) {
                preventFurtherRequests = true;
            }

            return $q.reject(response);
        }
        };
    })

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    })
    app.controller('PosController', function ($scope, $location, anchorSmoothScroll, transactionService, $state, $stateParams, CheckRoleService) {
     
    });
})();

var ionicAuth = angular.module('ionicAuth', ['ngRoute', 'firebase']);

ionicAuth.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/options.html', 
        controller: 'authController'
    });
    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html', 
        controller: 'authController'
    });
    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html', 
        controller: 'authController'
    });
    $routeProvider.when('/home', {
        templateUrl: 'templates/home.html', 
        controller: 'authController'
    });
    $routeProvider.when('/user/:id', {
        templateUrl: 'templates/custom.html', 
        controller: 'userController'
    });
    $routeProvider.otherwise({redirectTo: '/'})

}]);
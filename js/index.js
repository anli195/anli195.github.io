var appModule = angular.module("appModule",[
	'ngRoute',
	'indexControllers'
]);

appModule.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        //首页Index
        .when('/index', {
            templateUrl: 'html/index/webApp.html'
        })
        //默认显示
        .otherwise({
            redirectTo: '/index'
        });
}]);
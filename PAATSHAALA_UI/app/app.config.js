( function() {
	angular.module('eduApp').config(config);
	
	config.$inject = ['$routeProvider'];
	
	function config($routeProvider) {

	$routeProvider
		.when('/',{
			redirectTo:'/dashboard'
		}).when('/login',{
			templateUrl:'app/Generic/index.html',
			controller:'LoginController',
			controllerAs:'lc'
		}).when('/dashboard',{
			templateUrl:'app/Generic/dashboard.html',
			controller:'DashBoardController'
		}).otherwise({
			redirectTo : '/dashboard'
		});
	}

}());



( function() {
	angular.module('TTD').config(config);
	
	config.$inject = ['$routeProvider'];
	
	function config($routeProvider) {

	$routeProvider
		.when('/',{
			redirectTo:'/ehundi'
		}).when('/ehundi',{
			templateUrl:'app/eHundi/details.html',
			controller:'EHundiController',
			controllerAs:'ehc'
		}).when('/ehundiPayment',{
			templateUrl:'app/eHundi/anonymous.payment.html',
			controller:'EHundiPaymentController',
			controllerAs:'ehpc'
		}).when('/ehundiPaymentRegisteredUser',{
			templateUrl:'app/eHundi/registered.payment.html',
			controller:'EHundiPaymentControllerRegistered',
			controllerAs:'ehprc'
		}).when('/acknowledgement/:transactionID/:amount/:name/:date/:timeS/:username/:sessionID',{
			templateUrl:'app/eHundi/payment.acknowledgement.html',
			controller:'EHundiAcknowledgePaymentController',
			controllerAs:'ehac'
		}).when('/paymentGatewayFailure/:username/:sessionID',{
			templateUrl:'app/eHundi/payment.failure.html',
			controller:'EHundiPaymentFailureController',
			controllerAs:'ehpfc'
		}).when('/history',{
			templateUrl:'app/eHundi/history.html',
			controller:'EHundiHistoryController',
			controllerAs:'ehhc'
		}).otherwise({
			redirectTo : '/ehundi'
		});
	}

}());



angular.module('TTD').controller('EHundiPaymentFailureController', EHundiPaymentFailureController);

EHundiPaymentFailureController.$inject = ['$scope', '$location', 'serviceFactory', 'commonDataFactory'];

function EHundiPaymentFailureController($scope, $location, serviceFactory, commonDataFactory) {
	/* jshint validthis: true */
	var ehpfc = this;
	ehpfc.pageData = {
		goToHistory : goToHistory,
		goToOfferHundi : goToOfferHundi

	}
	function goToHistory() {
		var userDetails = commonDataFactory.getUserData();
		if(userDetails.hasOwnProperty('registered') == true) {
			$location.path('/history');
		} else {
			alert("Please login to get History");
		}

	}

	function goToOfferHundi() {
		var userDetails = commonDataFactory.getUserData();
		if(userDetails.hasOwnProperty('registered') == true) {
			$location.path('ehundiPaymentRegisteredUser');
		} else {
			$location.path('ehundi');
		}
	}

}
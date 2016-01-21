angular.module('TTD').controller('EHundiAcknowledgePaymentController', EHundiAcknowledgePaymentController);

EHundiAcknowledgePaymentController.$inject = ['$scope', '$location', 'serviceFactory', 'commonDataFactory', '$routeParams'];

function EHundiAcknowledgePaymentController($scope, $location, serviceFactory, commonDataFactory, $routeParams) {
	/* jshint validthis: true */
	var ehac = this;
	var timeStamp = new Date();
	var date = timeStamp.getDate();
	var month = timeStamp.getUTCMonth() + 1;
	var year = timeStamp.getUTCFullYear();
	var timeStampFormat = date + "-" + month + "-" + year;
	console.log($routeParams);
	ehac.userData = {
		"transactionID" : $routeParams.transactionID,
		"amount" : $routeParams.amount,
		'name' : $routeParams.name,
		"date" : $routeParams.date,
		"timeS" : $routeParams.timeS,
		"username" : $routeParams.username,
		"sessionID" : $routeParams.sessionID,
		"timeStamp" : timeStampFormat
	};
	

	
}
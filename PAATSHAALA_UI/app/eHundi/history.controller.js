angular.module('TTD').controller('EHundiHistoryController', EHundiHistoryController);

EHundiHistoryController.$inject = ['$scope', '$location', 'serviceFactory', 'commonDataFactory'];

function EHundiHistoryController($scope, $location, serviceFactory, commonDataFactory) {
	/* jshint validthis: true */
	var ehhc = this;

	ehhc.pageDetails = {
		userDate : commonDataFactory.getUserData(),
		historyList : [],
		getUserHistory : getUserHistory
	};
	ehhc.pageDetails.getUserHistory();

	//console.log(ehhc.userData.hasOwnProperty('registered'));

	

	function getUserHistory() {
		function historyListCallBack(response) {
		console.log(response);
		commonDataFactory.setHistoryList(response.data.userHistoryList);
		
		 ehhc.pageDetails.historyList=response.data.userHistoryList;
		console.log(ehhc.pageDetails.historyList1);
	}
		//var historyUrl = "common/userHistory/" + (ehhc.pageData.userData.userId || 1);
		var historyUrl = "common/userHistory/120002";
		serviceFactory.serviceCall(historyUrl, "GET", "", historyListCallBack);

	}

}
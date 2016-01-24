angular.module('eduApp').controller('LoginController',LoginController);

LoginController.$inject = ['$scope', '$location', 'serviceFactory', 'commonDataFactory'];

function LoginController($scope, $location, serviceFactory, commonDataFactory) {
	/* jshint validthis: true */
	var ehpc = this;
	/*data for view*/
	ehpc.pageDetails = {
		userData : commonDataFactory.getUserData(),
	};
	ehpc.banksList =[];
	getBankList();

	ehpc.payMoney = function() {
		if(ehpc.bankName!==undefined)
		angular.element('#hiddenFormClick').trigger('click');
	    else
	    alert("Please select any Payment Gateway to Proceed");
	};
	function getBankList() {
		function bankListCallBack(response) {
			console.log(response);
			commonDataFactory.setBankList(response.data.bankList);
			ehpc.banksList = response.data.bankList;
		}

		serviceFactory.serviceCall("common/banks/", "GET", "", bankListCallBack);

	}

}
angular.module('TTD').controller('EHundiPaymentControllerRegistered', EHundiPaymentControllerRegistered);

EHundiPaymentControllerRegistered.$inject = ['$scope', '$location', 'serviceFactory', 'commonDataFactory'];

function EHundiPaymentControllerRegistered($scope, $location, serviceFactory, commonDataFactory) {
	/* jshint validthis: true */
	var ehprc = this;
	//ehpc.userData=commonDataFactory.getUserData();
	ehprc.pageDetails={
		userData:{}
		
	}
	
	ehprc.payMoney = function() {
		if(ehprc.bankName===undefined){
			alert("please enter payment type to Proceed");
			return ;
		}
		function ehundiCallBack(response) {
			ehprc.pageDetails.orderId = response;
			angular.element('#hiddenFormClick').trigger('click');
		}

		var eHundiUserData = {
			"piligrimFirstName" : ehprc.pageDetails.userData.fName,
			"piligrimLastName" : ehprc.pageDetails.userData.lName,
			"offeringAmount" : ehprc.pageDetails.userData.amountS,
			"piligrimEmail" : ehprc.pageDetails.userData.emailId,
			"piligrimPhoneMobile" : ehprc.pageDetails.userData.phNo,
			"currencyID" : "4",
			"userId" : ehprc.pageDetails.userData.userId,
			"piligrimAddressLine1" : ehprc.pageDetails.userData.address1,
			"piligrimAddressLine2" : ehprc.pageDetails.userData.address2,
			"piligrimCity" : ehprc.pageDetails.userData.cityS,
			"piligrimZipCode" : ehprc.pageDetails.userData.zipCode,
			"onBehalfOf" : ehprc.pageDetails.userData.behalfS
		}

		serviceFactory.serviceCall("eHundi/eHundiUser/", "POST", JSON.stringify(eHundiUserData), ehundiCallBack);

	};
	ehprc.banksList =[];
	getBankList();
	function getBankList() {
		function bankListCallBack(response) {
			console.log(response);
			commonDataFactory.setBankList(response.data.bankList);
			ehprc.banksList = response.data.bankList;
		}

		serviceFactory.serviceCall("common/banks/", "GET", "", bankListCallBack);

	}
	ehprc.editUserDetails = function() {
		$location.path("/eHundi");
	}
	ehprc.getUserData = function() {

		function ehundiCallBack(response) {

			console.log(response);
			response = response.data;
			ehprc.pageDetails.userData = {
				"piligrimFirstName" : response.userFirstName,
				"piligrimLastName" : response.userLastName,
				"userId" : response.userId,
				"piligrimEmail" : response.userEmail,
				"piligrimPhoneMobile" : response.userPhoneMobile,
				"currencyID" : "4",
				"piligrimAddressLine1" : response.userAddressLine1,
				"piligrimAddressLine2" : response.userAddressLine2,
				"piligrimCity" : response.userCity,
				"piligrimZipCode" : response.userZipCode,
				"registered" : true
				// "onBehalfOf" : ehc.behalfS
			};

			commonDataFactory.setUserData(ehprc.pageDetails.userData);
		}

		serviceFactory.serviceCall("common/getUserDetail/120001", "GET", '', ehundiCallBack);

	};
	if(Object.keys(commonDataFactory.getUserData()).length) {
		ehprc.userData=commonDataFactory.getUserData();
		//ehprc.userData.offeringAmount
	} else {
		ehprc.getUserData();
	}

}
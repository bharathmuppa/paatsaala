angular.module('TTD').controller('EHundiController', EHundiController);

EHundiController.$inject = ['$scope', '$location', '$compile', '$route', 'serviceFactory', 'commonDataFactory'];

function EHundiController($scope, $location, $compile, $route, serviceFactory, commonDataFactory) {
	/* jshint validthis: true */
	var ehc = this;
	/*values for view*/
	ehc.pageDetails = {
		states : [],
		countries : [],
		currencies : [],
		userData : {}
	};
	getCurrencyList();
	getCountryList();
	//for registered user auto population details
	var userData = commonDataFactory.getUserData();
	//should change this code to apt format afterwards
	if(Object.keys(userData).length > 1) {
		ehc.pageDetails.fom.fName = userData.piligrimFirstName;
		ehc.pageDetails.fom.mName = "";
		ehc.pageDetails.fom.lName = userData.piligrimLastName;
		ehc.pageDetails.fom.emailId = userData.piligrimEmail;
		ehc.pageDetails.fom.phNo = userData.piligrimPhoneMobile;
		ehc.pageDetails.fom.address1 = userData.piligrimAddressLine1;
		ehc.pageDetails.fom.address2 = userData.piligrimAddressLine2;
		ehc.pageDetails.fom.city = userData.piligrimCity;
		ehc.pageDetails.fom.state = "";
		ehc.pageDetails.fom.country = "";
		ehc.pageDetails.fom.zipCode = userData.piligrimZipCode;
		ehc.pageDetails.fom.amount = userData.offeringAmount;
		ehc.pageDetails.fom.behalf = userData.onBehalfOf;
		ehc.pageDetails.fom.registered = userData.registered
	}
	var eHundiUserData = {};

	//mapped to ehc.currency
	function getCurrencyList() {
		function currencyListcallback(response) {
			ehc.pageDetails.currencies = response.currencyList;
			//ehc.currencyID = ehc.countries[2].currencyId;
		}

		//parameters for serviceCall function should be service name, method , param, callback
		serviceFactory.serviceCall("common/currency", "GET", "", currencyListcallback);
	}

	//mapped to ehc.pageData.countries
	function getCountryList() {

		function countryListcallback(response) {
			ehc.pageDetails.countries = response.data.countries;
		}

		//parameters for serviceCall function should be service name, method , param, callback
		serviceFactory.serviceCall("common/countriesAndStates", "GET", "", countryListcallback);
	}

	//on submit the form
	ehc.continueSubmit = function(isValid) {
		//for displaying validations after submit button

		if(!isValid) {
			return;
		}
		function ehundiCallBack(response) {

			eHundiUserData.registered = eHundiUserData.registered ? true : false;
			eHundiUserData.orderId = response.data;

			commonDataFactory.setUserData(eHundiUserData);
			if(eHundiUserData.registered) {
				$location.path('/ehundiPaymentRegisteredUser');

			} else {
				console.log(commonDataFactory.getUserData())
				$location.path('/ehundiPayment');
			}

			console.log(response);
		}

		eHundiUserData = {
			"piligrimFirstName" : ehc.pageDetails.fom.fName,
			"piligrimLastName" : ehc.pageDetails.fom.lName,
			"offeringAmount" : ehc.pageDetails.fom.amount,
			"piligrimEmail" : ehc.pageDetails.fom.emailId,
			"piligrimPhoneMobile" : ehc.pageDetails.fom.mobNo || ehc.pageDetails.fom.phNo,
			"currencyID" : 4,
			"piligrimAddressLine1" : ehc.pageDetails.fom.address1,
			"piligrimAddressLine2" : ehc.pageDetails.fom.address2,
			"piligrimCity" : ehc.pageDetails.fom.city,
			"piligrimZipCode" : ehc.pageDetails.fom.zipCode,
			"onBehalfOf" : ehc.pageDetails.fom.behalf,

		}
		console.log(eHundiUserData);

		if(!$scope.userForm.$valid) {
			return;
		} else {
			serviceFactory.serviceCall("eHundi/eHundiUser/", "POST", JSON.stringify(eHundiUserData), ehundiCallBack);
		}
	};
	//var pristineFormTemplate = $('#userForm').html();
	var userFormOld = ehc.pageDetails.fom; 
	ehc.onReset = function(formData) {
		//angular form reset
		/*
		if(ehc.pageDetails.fom) {
					var keys = Object.keys(ehc.pageDetails.fom), j = keys.length;
		
					for(var i = 0; i < j; i++) {
						ehc.pageDetails.fom[keys[i]] = null;
					}
				}*/
		/*
		ehc.pageDetails.fom = angular.copy(userFormOld);
				
				formData.$setPristine();
				formData.$setUntouched();
				formData.$setValidity();*/
		
				
		//workaround for angular form reset
		//$('#userForm').empty().append($compile($.parseHTML(pristineFormTemplate))($scope));

		//bharath suggestion
		$route.reload();
	};
	//on change of countries select box
	ehc.onCountryChange = function() {
		var selectedCountry = ehc.pageDetails.fom.country;
		var countries = ehc.pageDetails.countries;
		ehc.pageDetails.fom.state = "";
		ehc.pageDetails.states = [];
		countries.forEach(function(value, key) {
			if(value.id === ehc.pageDetails.fom.country) {
				if(value.states) {
					ehc.pageDetails.states.push(value.states);
				}

			}

		});
		ehc.pageDetails.states = ehc.pageDetails.states[0];
		console.log(ehc.pageDetails.states);

	};
}
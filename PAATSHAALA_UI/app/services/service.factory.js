angular.module('TTD').factory('serviceFactory', ServiceFactory);

ServiceFactory.$inject = ['$http'];

function ServiceFactory($http) {
	var serviceData = '';

	var serviceObj = {
		serviceCall : serviceCall
	};

	return serviceObj;

	//parameters for serviceCall function should be service name, method , param, callback
	function serviceCall(serviceName, method, reqParams, callback) {
		var serviceResponse = {};
		var serviceUrl = 'http://172.25.156.43:8080/eHundi/';
		/*
		$http({
				url : serviceUrl + serviceName,
				dataType : 'json',
				method : method,
				data : reqParams||'',
				headers : {
				"Content-Type" : "application/json"
				}
				}).then(function(serverResponse, status, headers, config) {
					//success
					callback(serverResponse);
				}, function(serverResponseErr, status, headers, config) {
					//error occured
					//alert("Error occured while connecting to server. Please try again.");
					console.log("Error occured while connecting to server. Please try again.");
				});*/
		
		var serviceUrl = serviceName.split("/")[1];
		$.getJSON("content/mockData/"+serviceUrl+".json").then(function(successData) {
			callback(successData);
		}, function(errData) {
			alert("error occured");
		});
	};

}//end of LoginFactory
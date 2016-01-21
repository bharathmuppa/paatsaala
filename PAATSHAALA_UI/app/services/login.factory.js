(function(){
	
	angular.module('TTD').factory('loginFactory', LoginFactory);
	
	LoginFactory.$inject=[];
	
	function LoginFactory(){
		var loginData = '';
		
		var loginObj = {
			loginCheck:loginCheck
		};
		
		return loginObj;
		
		//parameters for serviceCall function should be service name, method , param, callback
		function loginCheck(serviceName, reqParams, callback) {
			var serviceResponse={};
			var serviceUrl = 'http://172.25.156.43:8080/eHundi/';
			$http({
				url : serviceUrl + serviceName,
				dataType : 'json',
				method : 'POST',
				data : reqParams,
				headers : {
					"Content-Type" : "application/json"
				}
			}).then(function(serverResponse, status, headers, config) {
				//success
				callback(serverResponse);
			} ,function(serverResponseErr, status, headers, config) {
				//error occured
				alert(serverResponseErr);
			});
		};
	}//end of LoginFactory
});
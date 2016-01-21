(function() {

	angular.module('TTD').factory('commonDataFactory', commonDataFactory);

	commonDataFactory.$inject = [];

	function commonDataFactory() {

		var userdata = {};
		var bankList = [];
		var historyList = [];
		var commonDataObject = {
			setUserData : setUserData,
			getUserData : getUserData,
			setBankList : setBankList,
			getBankList : setBankList,
			setHistoryList : setHistoryList,
			getHistoryList : getHistoryList
		};

		return commonDataObject;

		//parameters for serviceCall function should be service name, method , param, callback
		function setUserData(reqParams) {
			userdata = reqParams;
		};

		function getUserData() {
			return userdata;
		}

		function setBankList(reqParams) {
			bankList = reqParams;
		};

		function getBankList() {
			return bankList;
		}

		/*historylist getters/setters */
		function setHistoryList(reqParams) {
			historyList = reqParams;
		}

		function getHistoryList() {
			return historyList;
		}

	}//end of LoginFactory

})();

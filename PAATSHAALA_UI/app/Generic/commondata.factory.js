(function() {

	angular.module('eduApp').factory('commonDataFactory', commonDataFactory);

	commonDataFactory.$inject = [];

	function commonDataFactory() {

		var userdata = {};
		var historyList = [];
		var commonDataObject = {
			setUserData : setUserData,
			getUserData : getUserData,
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


		/*historylist getters/setters */
		function setHistoryList(reqParams) {
			historyList = historyList.push(reqParams);
		}

		function getHistoryList() {
			return historyList;
		}
		function emptyHistory(){
			historyList=[];
		}

	}//end of LoginFactory

})();

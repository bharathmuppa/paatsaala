(function() {'use strict';

	angular
	.module('TTD')
	.controller('BodyController', BodyController);

	BodyController.$inject = ['$scope'];

	function BodyController($scope) {
		/* jshint validthis: true */
		var bdc = this;

		/* values required for view */
		bdc.pageDetails = {
			title : 'TTD',
			isLoggedIn: false
		};

	}

})();

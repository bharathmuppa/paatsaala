(function() {'use strict';

	angular.module('TTD').directive('headerDirective', headerDirective);

	function headerDirective() {
		/* jshint validthis: true */
		return {
			restrict : 'A',
			replace:true,
			scope : false,
			templateUrl : 'app/components/header.html',
			link : function(scope, ele, attrs) {
              //method to hide/show the menu
				$('.menu').click(function() {
					if($('.side_nav').css("right") == "-284px") {
						$('.cnt').css('overflow', 'visible');
						$('.side_nav').animate({
							right : "-5px"
						});

					} else {
						$('.cnt').css('overflow', 'hidden');
						$('.side_nav').animate({
							right : "-284px"
						});

					}
					$('.side_nav').css('top', -$('.hundi_hd').outerHeight());
				});
			}
		};

	}

})();

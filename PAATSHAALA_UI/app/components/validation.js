angular.module('TTD').directive('inputValidation', InputValidation);

function InputValidation() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl) {
			var pattern, flag = 0,
				data = 0;
			//to stop the autocompletion in input type="text"
			attrs.$set('autocapitalize', 'off');
			attrs.$set('autocorrect', 'off');
			attrs.$set('autocomplete', 'off');
			attrs.$set('spellcheck', 'false');

			elem.on('blur', function(e) {
				switch (attrs.inputValidation) {
					case "withTwoDigits":
						modifyValues(e); //function to verify the two digits validation on blur and modify values 
						break;
					default:
						break;
				}

				function modifyValues() {
					var a = angular.element(e.currentTarget).val();
					if (a == "0.00" || a == '.00') {
						angular.element(e.currentTarget).val(0);
					}
					if (a[0] == '.' && typeof(a[1]) == 'undefined') {
						angular.element(e.currentTarget).val(0);
					} else if (a[0] == '.' && typeof(a[1]) != 'undefined') {
						angular.element(e.currentTarget).val(0 + a);
					}
					if (a[a.length - 1] == "." && a[0] != '.') {
						angular.element(e.currentTarget).val(parseFloat(a).toFixed(2));
					}
				}

			});
			//on focus setting the prev value of filed to data variable.
			elem.on('focusin', function(e) {
				if (flag == 0) {
					flag = 1;
					data = angular.element(e.currentTarget).val();
				}
			});
			//on focus out set flag to 0
			elem.on('focusout', function() {
				flag = 0;
			});

			//on change of input this event will be triggered
			elem.on('input', function(e) {
				//you can add your validation pattern and make them applicable
				switch (attrs.inputValidation) {
					case "restrictSpaces":
						pattern = /^[a-zA-Z0-9]*$/;
						maxLength = (typeof(attrs.mxlength) == "undefined") ? 80 : attrs.mxlength;
						minLength = (typeof(attrs.mnlength) == "undefined") ? 0 : attrs.mnlength;
						break;
					case "pwdCheck":
						pattern = /^[a-zA-Z0-9!@#%$^&*()]*$/;
						maxLength = (typeof(attrs.mxlength) == "undefined") ? 80 : attrs.mxlength;
						minLength = (typeof(attrs.mnlength) == "undefined") ? 0 : attrs.mnlength;
						break;
					case "onlyNumbers":
						pattern = /^[0-9]*$/;
						maxLength = (typeof(attrs.mxlength) == "undefined") ? 20 : attrs.mxlength;
						minLength = (typeof(attrs.mnlength) == "undefined") ? 0 : attrs.mnlength;
						break;
					case "withTwoDigits":
						pattern = /^[0-9]*(\.{1})?([0-9]{1,2})?$/;
						maxLength = (typeof(attrs.mxlength) == "undefined") ? 20 : attrs.mxlength;
						minLength = (typeof(attrs.mnlength) == "undefined") ? 0 : attrs.mnlength;
						break;
					case "search":
						pattern = /^[a-zA-Z0-9&%-,*'. ()]*$/;
						maxLength = (typeof(attrs.mxlength) == "undefined") ? 50 : attrs.mxlength;
						minLength = (typeof(attrs.mnlength) == "undefined") ? 0 : attrs.mnlength;
						break;

					default:
						pattern = /^[^<>{}]*$/;
						maxLength = (typeof(attrs.mxlength) == "undefined") ? 100 : attrs.mxlength;
						minLength = (typeof(attrs.mnlength) == "undefined") ? 0 : attrs.mnlength;
						break;
				};

				if (!pattern.test(angular.element(e.currentTarget).val()) || angular.element(e.currentTarget).val().length > maxLength) {

					angular.element(e.currentTarget).val(data);
					ctrl.$setViewValue(data);
					ctrl.$render();
				} else {
					data = angular.element(e.currentTarget).val();
				}

			});
		}
	}
}
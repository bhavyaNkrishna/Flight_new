App.directive('datepickerDep', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
			  $(element).datepicker({
				  dateFormat: 'yy-mm-dd',
				  minDate : 0,
				  onSelect: function (date) {
					  		ngModelCtrl.$setViewValue(date);
					  		$('#return-date').datepicker('option', 'minDate', date);
					  		scope.$apply();
	                }
			  });
         }
    }
});

App.directive('datepickerRet', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
        	 console.log($(element).datepicker);
			  $(element).datepicker({
				  dateFormat: 'yy-mm-dd',
				  minDate : 0,
				  onSelect: function (date) {
					  		ngModelCtrl.$setViewValue(date);
					  		scope.$apply();
	                }
			  });
         }
    }
});

App.directive('datepickerExp', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
			  $(element).datepicker({
				  changeMonth: true,
				    changeYear: true,
				    showButtonPanel: true,
				    dateFormat: 'MM yy',
				    onClose: function(dateText, inst) { 
				        var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
				        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
				        $(this).datepicker('setDate', new Date(year, month, 1));
				    }
				  /*onSelect: function (date) {
					  		ngModelCtrl.$setViewValue(date);
					  		scope.$apply();
	                }*/
			  });
         }
    }
});

App.directive('datepickerBd', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
			  $(element).datepicker({
				  maxDate: new Date(),
				  changeMonth: true,
			      changeYear: true,
			      yearRange: "-120:+00",
				  onSelect: function (date) {
					  		ngModelCtrl.$setViewValue(date);
					  		scope.$apply();
	                }
			  });
         }
    }
});

App.directive('validPasswordC', function () {
	return {
		require: 'ngModel',
		link: function (scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function (viewValue, $scope) {
				var noMatch = viewValue !== scope.registrationForm.passwordsignup.$viewValue;
				ctrl.$setValidity('noMatch', !noMatch);
				return viewValue;
			});
			/*scope.$watch("reference", function(value) {
	        ctrl.$setValidity('noMatch', value === ctrl.$viewValue);
	        });*/
		}
	};
});

App.directive('autoComplete', function ($http, AutocompleteService) {
	return function postLink(scope, iElement, iAttrs) {
		var list = AutocompleteService.getArray();

		$( iElement ).autocomplete({
			source: list,
			minLength: 3
		});
	}
});

App.filter('convertTime', function(){
	return function(input) {
		var formated = '';
		var hours = parseInt(input.substring(0,3));
		if (hours > 12) {
			hours -=12;
			formated = hours + ':' + input.substring(3) + 'PM';
			return formated;
		} else if (hours == 12) {
			formated = hours + ':' + input.substring(3) + 'PM';
			return formated;
		} else {
			return input + "AM";
		}
	}
})


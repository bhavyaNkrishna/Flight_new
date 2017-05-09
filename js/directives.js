App.directive('datepickerDep', function (SharedData) {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
			  $(element).datepicker({
				  dateFormat: 'yy-mm-dd',
				  minDate : 0,
				  onSelect: function (date) {
					  		SharedData.setDate(date);
					  		ngModelCtrl.$setViewValue(date);
					  		$('#return-date').datepicker('option', 'minDate', date);
					  		scope.$apply();
	                }
			  });
         }
    }
});

App.directive('datepickerRet', function (SharedData) {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
        	 console.log($(element).datepicker);
			  $(element).datepicker({
				  dateFormat: 'yy-mm-dd',
				  minDate : 0,
				  onSelect: function (date) {
					  		//SharedData.setDate(date);
					  		ngModelCtrl.$setViewValue(date);
					  		scope.$apply();
	                }
			  });
         }
    }
});

App.directive('pwCheck', [function () {
return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
            scope.$apply(function () {
            	console.log("here");
                 console.log(elem.val() === $(firstPassword).val());
                ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
            });
        });
    }
}
}]);


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
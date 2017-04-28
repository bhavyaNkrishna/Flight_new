App.directive('datepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
			  $(element).datepicker({
				  dateFormat: 'yy-mm-dd',
				  minDate : 0,
				  onSelect: function (date) {
					  	if(this.attributes['ng-model'].value == "form.departureDate") {
					  		console.log(this.attributes['ng-model'].value);
					  		ngModelCtrl.$setViewValue(date);
					  	}
					  	if(this.attributes['ng-model'].value == "form.returnDate") {
					  		console.log(this.attributes['ng-model'].value);
					  		ngModelCtrl.$setViewValue(date);
					  	}
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
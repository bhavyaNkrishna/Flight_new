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


App.directive('passwordVerify', [function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.passwordVerify;
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          var v = elem.val()===$(firstPassword).val();
          ctrl.$setValidity('passwordVerify', v);
        });
      });
    }
  }
}]);

App.directive("matchPassword", function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=matchPassword"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.matchPassword = function(modelValue) {
                return modelValue === scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
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
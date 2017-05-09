'use strict';
App.controller('MainController',['$rootScope','$window', '$scope','$location','FlightService','SharedData','AuthService','SessionService',  function($rootScope,$window, $scope,$location, 
	FlightService, SharedData,AuthService,SessionService) {
	
	/*if(!SessionService.getCookieData()) {
		$scope.loginbutton = true;
		$scope.logoutbutton = false;
	} else {
		$scope.loginbutton = false;
		$scope.logoutbutton = true;
	}*/
	$scope.form = [];
	$scope.form.cabin = "Coach";
	$scope.form.numberAdults = 1;
	$scope.form.numberChildren = 0;
	$scope.form.stops = '0';
	$scope.form.refundable = "Yes";
	var name = SharedData.getUname();
	console.log(SharedData.getUname());
	if(name != undefined)
		{
		  $scope.yourname = "welcome" + name; 
		}

	$scope.roundTrip = false;
	$scope.switchSearchForm = function(event) {
		if (event.target.name === "oneWay") {
			$scope.returnDateLabel = false;
			$scope.returnDate = false;
		} else if (event.target.name === "roundTrip") {
			$scope.returnDateLabel = true;
			$scope.returnDate = true;
		}
	}

	$scope.search = function() {
		if ($scope.form.departureCity != null && $scope.form.arrivalCity != null && $scope.form.departureDate != null && $scope.form.cabin != null && $scope.form.numberAdults != null && $scope.form.numberChildren != null && $scope.form.stops != null && $scope.form.refundable != null) {
			if ($scope.returnDate == true) {
				if ($scope.form.returnDate != null) {
					SharedData.setForm($scope.form);
					$location.path( "/results" );
				}
			} else {
				SharedData.setForm($scope.form);
				$location.path( "/results" );
			}
		}
	};
}]);
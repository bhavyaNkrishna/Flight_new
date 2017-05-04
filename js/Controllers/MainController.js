'use strict';
App.controller('MainController',['$rootScope','$window', '$scope','$location','FlightService','SharedData','AuthService','SessionService',  function($rootScope,$window, $scope,$location, 
		FlightService, SharedData,AuthService,SessionService) {
	
	if(!SessionService.getCookieData()) {
		$scope.loginbutton = true;
		$scope.logoutbutton = false;
	} else {
		$scope.loginbutton = false;
		$scope.logoutbutton = true;
	}
	
	$scope.roundTrip = false;
	$scope.switchSearchForm = function(event) {
		if (event.target.name == "oneWay") {
			$scope.returnDateLabel = false;
			$scope.returnDate = false;
		} else if (event.target.name == "roundTrip") {
			$scope.returnDateLabel = true;
			$scope.returnDate = true;
		}
	}

	$scope.search = function() {
		SharedData.setForm($scope.form);
		/*FlightService.getFlightResults($scope.form).then(function(successResponse){
	   //FlightService.populateFlightsListTESTING($scope.form).then(function(successResponse){
		   $scope.flights = FlightService.populateFlightsList(successResponse);
		   console.log($scope.flights);
           SharedData.setFlights($scope.flights);
           console.log($scope.flights);
	   })*/
	};
}]);
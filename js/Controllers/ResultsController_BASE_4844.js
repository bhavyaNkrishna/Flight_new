App.controller('ResultsController', function($scope, FlightService, SharedData) {
	$scope.showRetrievingResults = true;
	$scope.showFilterPanel = false;
	FlightService.getFlightResults(SharedData.getForm()).then(function(successResponse){
	//FlightService.getFlightResultsTESTING($scope.form).then(function(successResponse){
		$scope.flights = FlightService.populateFlightsList(successResponse);
		console.log($scope.flights);
		SharedData.setFlights($scope.flights);
		console.log($scope.flights);
		$scope.showRetrievingResults = false;
		$scope.showFilterPanel = true;
	})
	$scope.filterDuration = function() {
		$scope.flights = SharedData.getFlights();
		FlightService.filterDuration($scope.flights);
	}

	$scope.filterPrice = function() {
		$scope.flights = SharedData.getFlights();
		FlightService.filterPrice($scope.flights);
	}
	
	$scope.filterStops = function() {
		$scope.flights = SharedData.getFlights();
		FlightService.filterStops($scope.flights);
	}
});
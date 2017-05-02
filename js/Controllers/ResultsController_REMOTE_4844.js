App.controller('ResultsController', function($scope, FlightService, SharedData) {
	$scope.showRetrievingResults = true;
	$scope.showFilterPanel = false;
	//FlightService.getFlightResults(SharedData.getForm()).then(function(successResponse){
	FlightService.getFlightResultsTESTING($scope.form).then(function(successResponse){
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
	
	$scope.filterEarly = function() {
		$scope.flights = SharedData.getFlights();
		$scope.flights = FlightService.filterEarly($scope.flights);
	}
	
	$scope.filterMidday = function() {
		$scope.flights = SharedData.getFlights();
		$scope.flights = FlightService.filterMidday($scope.flights);
	}
	
	$scope.filterAfternoon = function() {
		$scope.flights = SharedData.getFlights();
		$scope.flights = FlightService.filterAfternoon($scope.flights);
	}
	
	$scope.filterEvening = function() {
		$scope.flights = SharedData.getFlights();
		$scope.flights = FlightService.filterEvening($scope.flights);
	}
	
	$scope.filterOvernight = function() {
		$scope.flights = SharedData.getFlights();
		$scope.flights = FlightService.filterOvernight($scope.flights);
	}
});
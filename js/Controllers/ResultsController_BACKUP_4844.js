App.controller('ResultsController', function($scope, FlightService, SharedData, $location) {
	$scope.showRetrievingResults = true;
	$scope.showFilterPanel = false;
<<<<<<< HEAD
	$scope.flights = {};
	FlightService.getFlightResults(SharedData.getForm()).then(function(successResponse){
	//FlightService.getFlightResultsTESTING($scope.form).then(function(successResponse){
=======
	//FlightService.getFlightResults(SharedData.getForm()).then(function(successResponse){
	FlightService.getFlightResultsTESTING($scope.form).then(function(successResponse){
>>>>>>> 2ee617664b725cd6d9544ecf0c4097d9f8948b00
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
	};

	$scope.filterPrice = function() {
		$scope.flights = SharedData.getFlights();
		FlightService.filterPrice($scope.flights);
	};
	
	$scope.filterStops = function() {
		$scope.flights = SharedData.getFlights();
		FlightService.filterStops($scope.flights);
<<<<<<< HEAD
	};
	
	$scope.selectedFlight = function(flight) {
		SharedData.setFlight(flight);
		$location.path("/review");
	};

=======
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
>>>>>>> 2ee617664b725cd6d9544ecf0c4097d9f8948b00
});
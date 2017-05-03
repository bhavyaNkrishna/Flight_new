App.controller('ResultsController', function($scope, FlightService, SharedData, $location) {
	$scope.showRetrievingResults = true;
	$scope.showFilterPanel = false;

	$scope.flights = [];
	//FlightService.getFlightResults(SharedData.getForm()).then(function(successResponse){
	FlightService.getFlightResultsTESTING(SharedData.getForm()).then(function(successResponse){
		$scope.form = SharedData.getForm();
		if ($scope.form.returnDate == undefined) {
			SharedData.setDepartureFlights(FlightService.populateOnewayList(successResponse));
			$scope.flights = SharedData.getDepartureFlights();
		} else {
			SharedData.setDepartureFlights(FlightService.populateDeparturesList(successResponse));
			SharedData.setReturnFlights(FlightService.populateReturnsList(successResponse));
			$scope.flights = SharedData.getDepartureFlights();
			$scope.showRetrievingResults = false;
		}
		$scope.showFilterPanel = true;
		$scope.showRetrievingResults = false;
	});
	
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

	};
	
	$scope.filterEarly = function() {
		$scope.flights = SharedData.getFlights();
		$scope.flights = FlightService.filterEarly($scope.flights);
	};
	
	$scope.filterMidday = function() {
		$scope.flights = SharedData.getFlights();
		$scope.flights = FlightService.filterMidday($scope.flights);
	};
	
	$scope.filterAfternoon = function() {
		$scope.flights = SharedData.getFlights();
		$scope.flights = FlightService.filterAfternoon($scope.flights);
	};
	
	$scope.filterEvening = function() {
		$scope.flights = SharedData.getFlights();
		$scope.flights = FlightService.filterEvening($scope.flights);
	};
	
	$scope.filterOvernight = function() {
		$scope.flights = SharedData.getFlights();
		$scope.flights = FlightService.filterOvernight($scope.flights);
	};
	
	$scope.selectedFlight = function(flight) {
		if (flight.oneway == true) {
			SharedData.setDepartureFlight(flight);
			$location.path("/review");
		}
		if (flight.returnFlight == false) {
			$scope.flights = [];
			SharedData.setDepartureFlight(flight);
			$scope.flights = SharedData.getReturnFlights();
		} else if (flight.returnFlight == true) {
			SharedData.setReturnFlight(flight);
			$location.path("/review");
		}
	};
});
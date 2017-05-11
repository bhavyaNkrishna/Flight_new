App.controller('ResultsController', function($scope, FlightService, SessionService, SharedData, $location) {
	
	if(!SessionService.getCookieData()) {
		$scope.loginbutton = true;
		$scope.logoutbutton = false;
	} else {
		$scope.loginbutton = false;
		$scope.logoutbutton = true;
	}
	
	$scope.noResults = false;
	$scope.showRetrievingResults = true;
	$scope.showFilterPanel = false;
	SharedData.setDepartureFlights(undefined);
	SharedData.setReturnFlights(undefined);
	SharedData.setDepartureFlight(undefined);
	SharedData.setReturnFlight(undefined);
	
	
	$scope.flights = [];
	//FlightService.getFlightResults(SharedData.getForm()).then(function(successResponse){
	FlightService.getFlightResultsTESTING(SharedData.getForm()).then(function(successResponse){
		$scope.form = SharedData.getForm();
		if (successResponse == null || successResponse.trips.tripOption == undefined) {
			$scope.showRetrievingResults = false;
			$scope.noResults = true;
		}
		else {
			if ($scope.form.returnDate == undefined) {
				SharedData.setDepartureFlights(FlightService.populateOnewayList(successResponse));
				$scope.flights = SharedData.getDepartureFlights();
				SharedData.setFlights($scope.flights);
				//The issue is, if you select round trip first and then select a one-way, you are not clearing
				//the returnflight shared data. You need to clear that, whenever you land into search page. 
			} else {
				SharedData.setDepartureFlights(FlightService.populateDeparturesList(successResponse));
				SharedData.setReturnFlights(FlightService.populateReturnsList(successResponse));
				$scope.flights = SharedData.getDepartureFlights();
				SharedData.setFlights($scope.flights);
			}
			$scope.showFilterPanel = true;
			$scope.showRetrievingResults = false;
		}
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
	
	//The issue is, if you select round trip first and then select a one-way, you are not clearing
	//the returnflight shared data. You need to clear that, whenever you land into search page. 
	$scope.selectedFlight = function(flight) {
		if (flight.oneway === true) {
			SharedData.setDepartureFlight(flight);
			$location.path("/review");
		}
		if (flight.returnFlight === false) {
			$scope.flights = [];
			SharedData.setDepartureFlight(flight);
			$scope.flights = SharedData.getReturnFlights();
			SharedData.setFlights($scope.flights);
		} else if (flight.returnFlight === true) {
			SharedData.setReturnFlight(flight);
			$location.path("/review");
		}
	};
});
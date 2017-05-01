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
    console.log($scope.flights);
});
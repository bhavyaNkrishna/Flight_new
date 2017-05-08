App.controller('ReviewController', function($scope, $rootScope, FlightService, BookFlightService, SessionService, SharedData, $location) {

	if(!SessionService.getCookieData()) {
		$scope.loginbutton = true;
		$scope.logoutbutton = false;
	} else {
		$scope.loginbutton = false;
		$scope.logoutbutton = true;
	}

	$scope.successMessage = false;
	$scope.errorMessage = false;

	$scope.showReturnDetails = false;
	$scope.flight = {};

	//$scope.flight = SharedData.getFlight();
	//console.log($scope.flight);
	//console.log($scope.flight.arrivalCity);

	$scope.flight = SharedData.getDepartureFlight();
	$scope.returnFlight = SharedData.getReturnFlight();
	if ($scope.flight.oneway != true) {
		$scope.showReturnDetails = true;
	}
	console.log($scope.flight);
	console.log($scope.flight.arrivalCity);
	console.log($scope.flight.arrivalDate);
	console.log($scope.flight.flightNumber);
	console.log($scope.flight.arrivalTime);

	for(var i=0;i<$scope.flight.legs.length;i++){
		console.log("leg details");
		console.log($scope.flight.legs[i].flightNumber);
	}

	console.log($rootScope.uname);
	//var uname = $rootScope.uname;
	//$scope.date = new Date();
	//submittedDate = $scope.date;
	//console.log($scope.date);

	var uname = SharedData.getUname();

	$scope.bookFlight = function() {
		console.log("in book function");
		var data = {
				flight : "",
				uname : "",
				reservationId:""
		};
		data.flight = $scope.flight;
		data.uname = uname;
		BookFlightService.bookFlight(data)
		.then(
				function(flightResponse) {
					if(flightResponse.error===1){
						$scope.successMessage= false;
						$scope.errorMessage=flightResponse.errorMsg;

					} else {
						SharedData.setReservationId(flightResponse.reservationId);
						$scope.errorMessage= false;
						$scope.successMessage="Flight has been reserved succesfully";
						if(!!$scope.returnFlight) {
							var returnData = {
									flight : "",
									uname : "",
									reservationId:""
							};
							returnData.flight = $scope.returnFlight;
							returnData.reservationId = flightResponse.reservationId;
							BookFlightService.bookFlight(returnData)
							.then(
									function(flightResponse) {
										if(flightResponse.error===1){
											$scope.successMessage= false;
											$scope.errorMessage=flightResponse.errorMsg;

										} else {
											$scope.errorMessage= false;
											$scope.successMessage="Flight has been reserved succesfully";
										}
										console.log("In review Controller : ");
										console.log($scope.flight);
									},
									function(errResponse){
										console.error('Error while validating credentials');
									}
							);
						}

					}
					console.log("In review Controller : ");
					console.log($scope.flight);
				},
				function(errResponse){
					console.error('Error while validating credentials');
				}
		);
	};
	
	$scope.updateBooking = function() {
		console.log("inside update booking");
	
	};
	
});
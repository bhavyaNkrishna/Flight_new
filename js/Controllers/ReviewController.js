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
	$scope.data = [];

	//$scope.flight = SharedData.getFlight();
	//console.log($scope.flight);
	//console.log($scope.flight.arrivalCity);

	$scope.flight = SharedData.getDepartureFlight();
	$scope.returnFlight = SharedData.getReturnFlight();
	if ($scope.flight.oneway !== true) {
		$scope.showReturnDetails = true;
	}

	//var uname = $rootScope.uname;
	//$scope.date = new Date();
	//submittedDate = $scope.date;
	//console.log($scope.date);

	var uname = SharedData.getUname();
    console.log(uname);
    
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
						console.log("reservationid");
						console.log(flightResponse.reservationId);
						SharedData.setReservationId(flightResponse.reservationId);
						$scope.errorMessage= false;
						$scope.successMessage="Flight has been reserved succesfully";
						console.log("Checking");
						console.log($scope.returnFlight);
						console.log(!$scope.returnFlight);
						console.log(!!$scope.returnFlight);
						if(!!$scope.returnFlight) {
							console.log("Entered return flight method");
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
		console.log("inside update");
		$scope.cardMessage = "";
		if ($scope.data.fname != null && 
			$scope.data.lname != null && 
			$scope.data.mname != null && 
			$scope.data.phone != null && 
			$scope.data.mail != null && 
			$scope.data.gender != null && 
			$scope.data.dob != null && 
			$scope.data.cardName != null && 
			$scope.data.cardNum != null) {
			console.log("inside update booking");
			$scope.reservationId = SharedData.getReservationId();
			console.log("the id id");
			console.log($scope.reservationId);
			$scope.successMessage = false;
			$scope.errorMessage = false;


			if($scope.data.cardName == "Bhavya" && $scope.data.cardNum == "105105105105100" && $scope.data.security == "345" && $scope.data.expMonth == "08" && $scope.data.expYear == "22"){
				console.log("inside card validated if block");
				$scope.cardMessage="Card details are valid";
				var data = {
						reservationId:""
				};
				
				data.reservationId = $scope.reservationId;
				BookFlightService.updateReservation(data)
				.then(
						function (data){
							if(data.error===1){
								$scope.errorMessage="Flight is not Reserved";
							} else {
								$scope.errorMessage= false;
							}
							console.log("In Controller : ");
							console.log(data);
							$location.path("/thankYou");
						},
						function(errResponse){
							console.error('Error while reservation of Flight');
						}
				);
			}
			else{
				console.log($scope.data.cardName, $scope.data.cardNum, $scope.data.security, $scope.data.expMonth, $scope.data.expYear);
				$scope.cardMessage = "Card details are not valid";
				$scope.cardMessageDisplay = true;
			}
		}
	};
});
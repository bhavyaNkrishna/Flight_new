App.controller('ReviewController', function($scope,$rootScope,FlightService, BookFlightService, SharedData,$location) {

	$scope.successMessage = false;
	$scope.errorMessage = false;

	$scope.flight = {};
	$scope.flight = SharedData.getFlight();
	//console.log($scope.flight);
	//console.log($scope.flight.arrivalCity);
	console.log($scope.flight.flightNumber);
	console.log($rootScope.uname);
	
	
	
	$scope.bookFlight = function() {
		console.log("in book function");

		var flightDetails = {
				"arrivalCity": "",
				"arrivalDate": "",
				"departureCity" : "",
				"departureDate" : "",
				"flightNumber" : "",
				"price" :"",
				"uname" : ""
				
				
				
		};

		flightDetails.arrivalCity = $scope.flight.arrivalCity;
		flightDetails.arrivalDate = $scope.flight.arrivalDate;
		flightDetails.departureCity = $scope.flight.departureCity;
		flightDetails.departureDate = $scope.flight.departureDate;
		flightDetails.flightNumber = $scope.flight.flightNumber;
		flightDetails.price = $scope.flight.price;
		flightDetails.uname = $scope.data.uname;
	
	   BookFlightService.bookFlight(flightDetails)
		.then(
				function(flight) {
					if(flight.error===1){
						$scope.successMessage= false;
						$scope.errorMessage="User not registered Click on SignUp to register";

					} else {
						$scope.errorMessage= false;
						$scope.successMessage="Registered Sucessfully  Click here to login  ";

						$location.path("/registration");
					}
					console.log("In review Controller : ");
					console.log(flight);
				},
				function(errResponse){
					console.error('Error while validating credentials');
				}
		);
	};
	
});
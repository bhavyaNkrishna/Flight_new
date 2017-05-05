'use strict';

App.controller('TripsController', function($scope, $http, $q, FlightService, SessionService, SharedData, $location) {
	
	if(!SessionService.getCookieData()) {
		$scope.loginbutton = true;
		$scope.logoutbutton = false;
	} else {
		$scope.loginbutton = false;
		$scope.logoutbutton = true;
	}
	$scope.bflight = function() {
		$scope.data = {};
		console.log("in booked");
		console.log(SessionService.getCookieData());
		var user = {
				"uname": ""
		};
		user.uname = SessionService.getCookieData();
		/*TripService.bookFli(name).then(
				function(data) {
					if(data.error===1){
						$scope.errorMessage="Username and Password does not match";
					} else {
						$scope.errorMessage= false;

						AuthService.setCredentials(user.uname);
						SharedData.setUname($scope.data.email);
						//$rootScope.uname = $scope.data.email;
						//console.log("root scope");
						//console.log($rootScope.uname);
						$location.path("/");
						$scope.data = data;
					}
					console.log("In Controller : ");
					console.log(data);
				},
				function(errResponse){
					console.error('Error while validating credentials');
				}
		);*/
		var deferred = $q.defer();
		$http.post('/bookedFlight', user)
		.then(
				function (response) {
					console.log(response);
	                // promise is fulfilled
					deferred.resolve(response.data);
					$scope.data.err = response.data.error;
					$scope.data.id = response.data.userid;
					$scope.data.reserveid = response.data.reserveid;
					$scope.data.date = response.data.subdate;
					$scope.data.res = response.data.reserved;
					$scope.data.price = response.data.price;
					if($scope.data.err == 1)
						{
						  $scope.message = "NO Flights";
						  $scope.data = false;
						}
					else
						{
						$scope.message = false;
						}
				},
				function(errResponse){
					console.log('Error while validating the credentials');
	                // the following line rejects the promise 
					deferred.reject(errResponse);
				}
		);
		console.log($scope.data.date);
        // promise is returned
		return deferred.promise;
	}
});
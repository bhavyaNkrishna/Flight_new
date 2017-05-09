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
		$scope.data = [];
		console.log("in booked");
		console.log(SessionService.getCookieData());
		var user = {
				"uname": ""
		};
		user.uname = SessionService.getCookieData();
		var deferred = $q.defer();
		$http.post('/bookedFlight', user)
		.then(
				function (response) {
					console.log(response);
					// promise is fulfilled
					deferred.resolve(response.data);
					console.log(response.data.error);
					$scope.error = response.data.error;
					for( var i in response.data.fldata){
						$scope.data.push({id:response.data.fldata[i].flightid, flightno:response.data.fldata[i].flightno,
							arrcity:response.data.fldata[i].arrcity, arrdate:response.data.fldata[i].arrdate,
							depdate:response.data.fldata[i].depdate,depcity:response.data.fldata[i].depcity,
							arrtime:response.data.fldata[i].arrtime, deptime:response.data.fldata[i].deptime,
							flightdur:response.data.fldata[i].flightdur,round:response.data.fldata[i].round,
							isr:response.data.fldata[i].isr,
							price:response.data.fldata[i].price});
						if($scope.data[i].isr === 1) {
							$scope.b = $scope.b+1;
						}
						else if($scope.data[i].isr === 0) {
							$scope.h = $scope.h+1;
						}
						if($scope.error === 1) {
							$scope.message = "NO Flights";
							//$scope.data = false;
						}
						else {
							$scope.message = false;
						}
					}
				},
				function(errResponse){
					console.log('Error while validating the credentials');
					// the following line rejects the promise 
					deferred.reject(errResponse);
				}
		);
		console.log($scope.data);
		// promise is returned
		return deferred.promise;
	}

	$scope.hflight = function() {
		$scope.data = [];
		console.log("in booked");
		console.log(SessionService.getCookieData());
		var user = {
				"uname": ""
		};
		user.uname = SessionService.getCookieData();
		var deferred = $q.defer();
		$http.post('/heldFlight', user)
		.then(
				function (response) {
					console.log(response);
					// promise is fulfilled
					deferred.resolve(response.data);
					console.log(response.data.error);
					$scope.error = response.data.error;
					for( var i in response.data.fldata){
						$scope.data.push({id:response.data.fldata[i].flightid, flightno:response.data.fldata[i].flightno,
							arrcity:response.data.fldata[i].arrcity, arrdate:response.data.fldata[i].arrdate,
							depdate:response.data.fldata[i].depdate,depcity:response.data.fldata[i].depcity,
							arrtime:response.data.fldata[i].arrtime, deptime:response.data.fldata[i].deptime,
							flightdur:response.data.fldata[i].flightdur,round:response.data.fldata[i].round,
							isr:response.data.fldata[i].isr,
							price:response.data.fldata[i].price});
						if($scope.error === 1) {
							$scope.message = "NO Flights";
							//$scope.data = false;
						}
						else {
							$scope.message = false;
						}
					}
				},
				function(errResponse){
					console.log('Error while validating the credentials');
					// the following line rejects the promise 
					deferred.reject(errResponse);
				}
		);
		console.log($scope.data);
		// promise is returned
		return deferred.promise;
	};
	
	$scope.print = function(fl) {
		var data = [{ text: 'SkyKey', style: 'header' },
			{ text: 'Itinerary', style: 'subhead' },
			"\nFlight ID: " + fl.id + "\n" +
					   "Flight NO: " + fl.flightno + "\n" +
					   "\nDeparture City: " + fl.depcity + "\n" +
						"Departure Date: " + fl.depdate + "\n" +
						"Departure Time: " + fl.deptime + "\n"]
		var docDefinition = {content: data, styles: {
		     header: {
		         fontSize: 24,
		         bold: true,
		         alignment: "center"
		       },
		       subhead: {
			         fontSize: 16,
			         bold: true,
			         alignment: "left"
			       }
			}
		};
		pdfMake.createPdf(docDefinition).open();
	}
});
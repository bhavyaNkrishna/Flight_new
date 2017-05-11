'use strict';

App.controller('TripsController', function($scope, $http, $q,$window, TripService,FlightService, SessionService, SharedData, $location) {

	if(!SessionService.getCookieData()) {
		$scope.loginbutton = true;
		$scope.logoutbutton = false;
	} else {
		$scope.loginbutton = false;
		$scope.logoutbutton = true;
	}
	
	$scope.completeHeldBooking = function(bk){

		console.log("in book function");
		var data = {
				reservationId:""
		};
		data.reservationId = bk[0].reservation;
	   console.log("Thre reservation id by held flight" +data.reservationId);
		SharedData.setReservationId(data.reservationId);
		$location.path("/bookingForm");
	}
	
	$scope.deleteBooking = function(bk){

		console.log("in delete function");
		var data = {
				reservationId:""
		};
		data.reservationId = bk[0].reservation;
	   console.log("Thre reservation id by held flight" +data.reservationId);
		SharedData.setReservationId(data.reservationId);
		var r = $window.confirm('Are you sure? You are deleting the Booking');
		if(r == true){
		TripService.deleteReservation(data)
				.then(
						function (data){
							if(data.error===1){
								$scope.errorMessage="Flight is not canceled";
							} else {
								$scope.errorMessage= false;
							}
							console.log("In Controller : ");
							console.log(data);
						},
						function(errResponse){
							console.error('Error while cancellation of Flight');
						}
				);
			
		}
		else {
			
		}
		};
	
	
	$scope.bflight = function() {
		$scope.datar = [];
		$scope.datah = [];
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
					console.log(response.data);
					$scope.error = response.data.error;
					$scope.datar.push([]);
					$scope.datah.push([]);
					var flight;
					var i = 0;
					var j = 0;
					while (response.data.fldata.length > 0){
						console.log(response.data.fldata.length);
						flight = {id:response.data.fldata[0].flightid, flightno:response.data.fldata[0].flightno,
							arrcity:response.data.fldata[0].arrcity, arrdate:response.data.fldata[0].arrdate,
							depdate:response.data.fldata[0].depdate,depcity:response.data.fldata[0].depcity,
							arrtime:response.data.fldata[0].arrtime, deptime:response.data.fldata[0].deptime,
							flightdur:response.data.fldata[0].flightdur,round:response.data.fldata[0].round,
							isr:response.data.fldata[0].isr,reservation:response.data.fldata[0].bookingid,
							price:response.data.fldata[0].price};
						if (response.data.fldata[0].isr == 1) {
							if (response.data.fldata[1] != null && response.data.fldata[0].bookingid != response.data.fldata[1].bookingid) {
								$scope.datar[i].push(flight);
								$scope.datar.push([]);
								i++;
							} else {
								$scope.datar[i].push(flight);
							}
							response.data.fldata.shift();
						} else if (response.data.fldata[0].isr == 0) {
							if (response.data.fldata[1] != null && response.data.fldata[0].bookingid != response.data.fldata[1].bookingid) {
								$scope.datah[j].push(flight);
								$scope.datah.push([]);
								j++;
							} else {
								$scope.datah[j].push(flight);
							}
							response.data.fldata.shift();
						}
						if($scope.error === 1) {
							$scope.message = "No Flights";
						}
						else {
							$scope.message = false;
						}
					}
					console.log($scope.datar);
					console.log($scope.datah);
				},
				function(errResponse){
					console.log('Error while validating the credentials');
					// the following line rejects the promise 
					deferred.reject(errResponse);
				}
		);
		console.log($scope.datar);
		// promise is returned
		return deferred.promise;
	}


	
	$scope.print = function(bk) {
		var flightInfo = "\nDeparture:\n";
		for (var i = 0; i < bk.length; i++) {
			if (bk[i].round == 0) {
				flightInfo = flightInfo + "\n" +
				   "Flight NO: " + bk[i].flightno + "\n" +
				   "Departure City: " + bk[i].depcity + "\n" +
					"Departure Date: " + bk[i].depdate + "\n" +
					"Departure Time: " + bk[i].deptime + "\n" +
					"Arrival City: " + bk[i].arrcity + "\n" +
					"Arrival Date: " + bk[i].arrdate + "\n" +
					"Arrival Time: " + bk[i].arrtime + "\n";
			}
		}
		flightInfo = flightInfo + "\nReturn:\n";
		for (var i = 0; i < bk.length; i++) {
			if (bk[i].round == 1) {
				flightInfo = flightInfo + "\n" +
				   "Flight NO: " + bk[i].flightno + "\n" +
				   "Departure City: " + bk[i].depcity + "\n" +
					"Departure Date: " + bk[i].depdate + "\n" +
					"Departure Time: " + bk[i].deptime + "\n" +
					"Arrival City: " + bk[i].arrcity + "\n" +
					"Arrival Date: " + bk[i].arrdate + "\n" +
					"Arrival Time: " + bk[i].arrtime + "\n";
			}
		}
		var data = [{ text: 'SkyKey', style: 'header' },
			{text: '\nImportant Information', style: 'subhead'},
			{text: "Be sure to bring all necessary documentation (e.g. passport, visa, driver's license)."},
			{ text: '\nItinerary', style: 'subhead' },
			flightInfo]
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
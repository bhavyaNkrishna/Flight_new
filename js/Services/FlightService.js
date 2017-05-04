App.service('FlightService', ['$http', function($http){
    
    this.flights = [];
    this.results = [];
    
    this.newFlight = function(departureCity, arrivalCity, departureTime, arrivalTime, departureDate, arrivalDate, duration, flightNumber, price, leg, returnFlight, oneway){
        this.flight = {departureCity: departureCity, arrivalCity: arrivalCity, departureTime: departureTime, arrivalTime: arrivalTime, departureDate: departureDate, arrivalDate: arrivalDate, duration: duration, flightNumber: flightNumber, price: price, legs: leg, returnFlight: returnFlight, oneway: oneway};
        return this.flight;
    }
    
    this.populateOnewayList = function(successResponse) {
    	this.flights = [];
        if (successResponse) {
            this.results = successResponse;
            var origin;
            var destination;
            var departTime;
            var arriveTime;
            var departDate;
            var arriveDate;
            var duration;
            var flightNumber;
            var airline;
            var price;
            for (var i = 0; i < this.results["trips"]["tripOption"].length; i++) {
            	var flight = [];
            	for (var j = 0; j < this.results["trips"]["tripOption"][i]["slice"][0]["segment"].length; j++) {
            		console.log(i);
	                origin = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["origin"];
	                destination = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["destination"];
	                departTime = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["departureTime"].substring(11,16);
	                arriveTime = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["arrivalTime"].substring(11,16);
	                departDate = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["departureTime"].substring(0,10);
	                arriveDate = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["arrivalTime"].substring(0,10);
	                duration = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["duration"];
	                flightNumber = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["flight"]["carrier"];
	                flightNumber = flightNumber + this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["flight"]["number"];
	                price = this.results["trips"]["tripOption"][i]["pricing"][0]["saleTotal"].substring(3);
	                if (j > 0) {
	                	this.flights[i].duration += duration;
	                	this.flights[i].legs.push(this.newFlight(origin, destination, departTime, arriveTime, departDate, arriveDate, duration, flightNumber, price, null, false, true));
	                } else {
	                	this.flights.push(this.newFlight(origin, destination, departTime, arriveTime, departDate, arriveDate, duration, flightNumber, price, flight, false, true));
	                }
            	}
            }
        } else {
            this.results = [];
        }
        console.log(this.flights)
        return this.flights;
    }
    
    this.populateDeparturesList = function(successResponse) {
    	this.flights = [];
        if (successResponse) {
            this.results = successResponse;
            var origin;
            var destination;
            var departTime;
            var arriveTime;
            var departDate;
            var arriveDate;
            var duration;
            var flightNumber;
            var airline;
            var price;
            for (var i = 0; i < this.results["trips"]["tripOption"].length; i++) {
            	var flight = [];
            	for (var j = 0; j < this.results["trips"]["tripOption"][i]["slice"][0]["segment"].length; j++) {
            		console.log(i);
	                origin = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["origin"];
	                destination = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["destination"];
	                departTime = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["departureTime"].substring(11,16);
	                arriveTime = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["arrivalTime"].substring(11,16);
	                departDate = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["departureTime"].substring(0,10);
	                arriveDate = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["arrivalTime"].substring(0,10);
	                duration = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["duration"];
	                flightNumber = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["flight"]["carrier"];
	                flightNumber = flightNumber + this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["flight"]["number"];
	                price = this.results["trips"]["tripOption"][i]["pricing"][0]["saleTotal"].substring(3);
	                if (j > 0) {
	                	this.flights[i].duration += duration;
	                	this.flights[i].legs.push(this.newFlight(origin, destination, departTime, arriveTime, departDate, arriveDate, duration, flightNumber, price, null, false, false));
	                } else {
	                	this.flights.push(this.newFlight(origin, destination, departTime, arriveTime, departDate, arriveDate, duration, flightNumber, price, flight, false, false));
	                }
            	}
            }
        } else {
            this.results = [];
        }
        console.log(this.flights)
        return this.flights;
    }
    
    this.populateReturnsList = function(successResponse) {
    	this.flights = [];
        if (successResponse) {
            this.results = successResponse;
            var origin;
            var destination;
            var departTime;
            var arriveTime;
            var departDate;
            var arriveDate;
            var duration;
            var flightNumber;
            var airline;
            var price;
            for (var i = 0; i < this.results["trips"]["tripOption"].length; i++) {
            	var flight = [];
            	for (var j = 0; j < this.results["trips"]["tripOption"][i]["slice"][0]["segment"].length; j++) {
	            		if (this.results["trips"]["tripOption"][i]["slice"][1]["segment"][j] != undefined) {
		                origin = this.results["trips"]["tripOption"][i]["slice"][1]["segment"][j]["leg"][0]["origin"];
		                destination = this.results["trips"]["tripOption"][i]["slice"][1]["segment"][j]["leg"][0]["destination"];
		                departTime = this.results["trips"]["tripOption"][i]["slice"][1]["segment"][j]["leg"][0]["departureTime"].substring(11,16);
		                arriveTime = this.results["trips"]["tripOption"][i]["slice"][1]["segment"][j]["leg"][0]["arrivalTime"].substring(11,16);
		                departDate = this.results["trips"]["tripOption"][i]["slice"][1]["segment"][j]["leg"][0]["departureTime"].substring(0,10);
		                arriveDate = this.results["trips"]["tripOption"][i]["slice"][1]["segment"][j]["leg"][0]["arrivalTime"].substring(0,10);
		                duration = this.results["trips"]["tripOption"][i]["slice"][1]["segment"][j]["duration"];
		                flightNumber = this.results["trips"]["tripOption"][i]["slice"][1]["segment"][j]["flight"]["carrier"];
		                flightNumber = flightNumber + this.results["trips"]["tripOption"][i]["slice"][1]["segment"][j]["flight"]["number"];
		                price = this.results["trips"]["tripOption"][i]["pricing"][0]["saleTotal"].substring(3);
		                if (j > 0) {
		                	this.flights[i].duration += duration;
		                	this.flights[i].legs.push(this.newFlight(origin, destination, departTime, arriveTime, departDate, arriveDate, duration, flightNumber, price, null, true, false));
		                } else {
		                	this.flights.push(this.newFlight(origin, destination, departTime, arriveTime, departDate, arriveDate, duration, flightNumber, price, flight, true, false));
		                }
            		}
            	}
            }
        } else {
            this.results = [];
        }
        console.log(this.flights)
        return this.flights;
    }
    
    this.getFlightResultsTESTING = function() {
    	return $http.get("/json/exampleresponse.json") 
            .then(function(response){console.log(response.data);return response.data}, function(){console.log(response)});
    }
    
    this.getFlightResults = function(formData) {
        if (formData.class == "Coach") {
            formData.class = "COACH";
        } else if (formData.class == "Premium Coach") {
            formData.class = "PREMIUM_COACH";
        } else if (formData.class == "Business") {
            formData.class = "BUSINESS";
        } else {
            formData.class = "FIRST";
        }
        if (formData.refundable == "Yes") {
            formData.refundable = true;
        } else {
            formData.refundable = false;
        }
        if (formData.returnDate == undefined) {
            return $http({
                method: "POST",
                url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBAYG_5X7FRSYs7NM1-VfmXV-U_ne4m5J4",
                 headers: {
                    'Content-type': 'application/json'
                },
                data:
                        {
                          "request": {
                            "passengers": {
                              "kind": "qpxexpress#passengerCounts",
                              "adultCount": formData.numberAdults,
                              "childCount": formData.numberChildren,
                              "infantInLapCount": 0,
                              "infantInSeatCount": 0,
                              "seniorCount": 0
                            },
                            "slice": [
                              {
                                "kind": "qpxexpress#sliceInput",
                                "origin": formData.departureCity.substring(0,4),
                                "destination": formData.arrivalCity.substring(0,4),
                                "date": formData.departureDate,
                                "maxStops": formData.stops
                              }
                            ],
                            "saleCountry": "US",
                            "ticketingCountry": "US",
                            "refundable": formData.refundable,
                            "solutions": 100
                          }
                        }
            
            }) 
                .then(function(response){console.log(response.data);return response.data}, function(){console.log(response)});
        } else if (formData.returnDate != undefined) {
        	return $http({
                method: "POST",
                url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBAYG_5X7FRSYs7NM1-VfmXV-U_ne4m5J4",
                 headers: {
                    'Content-type': 'application/json'
                },
                data:
                        {
                          "request": {
                            "passengers": {
                              "kind": "qpxexpress#passengerCounts",
                              "adultCount": formData.numberAdults,
                              "childCount": formData.numberChildren,
                              "infantInLapCount": 0,
                              "infantInSeatCount": 0,
                              "seniorCount": 0
                            },
                            "slice": [
                              {
                                "kind": "qpxexpress#sliceInput",
                                "origin": formData.departureCity.substring(0,4),
                                "destination": formData.arrivalCity.substring(0,4),
                                "date": formData.departureDate,
                                "maxStops": formData.stops
                              },
                                {
                                  "kind": "qpxexpress#sliceInput",
                                  "origin": formData.arrivalCity.substring(0,4),
                                  "destination": formData.departureCity.substring(0,4),
                                  "date": formData.returnDate,
                                  "maxStops": formData.stops
                                }
                              ],
                            "saleCountry": "US",
                            "ticketingCountry": "US",
                            "refundable": formData.refundable,
                            "solutions": 100
                          }
                        }
            
            }) 
                .then(function(response){console.log(response.data);return response.data}, function(){console.log(response)});
        }
    }
    
    this.filterDuration = function(flights) {
    	flights.sort(function(a,b) {
    		return a.duration - b.duration;
    	});
    }
    
    this.filterPrice = function(flights) {
    	flights.sort(function(a,b) {
    		console.log(a.price);
    		return a.price - b.price;
    	});
    }
    
    this.filterStops = function(flights) {
    	flights.sort(function(a,b) {
    		return a.legs.length - b.legs.length;
    	});
    }
    
    this.filterEarly = function(flights) {
    	var subflights = [];
    	for (var i = 0; i < flights.length; i++) {
    		if (parseInt(flights[i].departureTime.substring(0,3)) >= 6 && parseInt(flights[i].departureTime.substring(0,3)) < 10) {
    			subflights.push(flights[i]);
    		}
    	}
    	return subflights;
    }
    
    this.filterMidday = function(flights) {
    	var subflights = [];
    	for (var i = 0; i < flights.length; i++) {
    		if (parseInt(flights[i].departureTime.substring(0,3)) >= 10 && parseInt(flights[i].departureTime.substring(0,3)) < 14) {
    			subflights.push(flights[i]);
    		}
    	}
    	return subflights;
    }
    
    this.filterAfternoon = function(flights) {
    	var subflights = [];
    	for (var i = 0; i < flights.length; i++) {
    		if (parseInt(flights[i].departureTime.substring(0,3)) >= 14 && parseInt(flights[i].departureTime.substring(0,3)) < 18) {
    			subflights.push(flights[i]);
    		}
    	}
    	return subflights;
    }
    
    this.filterEvening = function(flights) {
    	var subflights = [];
    	for (var i = 0; i < flights.length; i++) {
    		if (parseInt(flights[i].departureTime.substring(0,3)) >= 18 && parseInt(flights[i].departureTime.substring(0,3)) < 22) {
    			subflights.push(flights[i]);
    		}
    	}
    	return subflights;
    }
    
    this.filterOvernight = function(flights) {
    	var subflights = [];
    	for (var i = 0; i < flights.length; i++) {
    		if (parseInt(flights[i].departureTime.substring(0,3)) >= 22 && parseInt(flights[i].departureTime.substring(0,3)) < 6) {
    			subflights.push(flights[i]);
    		}
    	}
    	return subflights;
    }
}]);
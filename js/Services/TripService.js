App.factory('TripService', ['$http','$q', function($http, $q){
//Scope is not available in factory or service. Its only available for controller. 
	//as Service is not loaded as part of html. Its independent.
	var factory = {
			bflight : bflight ,
	};

	return factory;


	function bflight(user) {
		var deferred = $q.defer();
		console.log("in flight service");
		console.log(user);
		$http.post('/bookedFlight', user)
		.then(
				function (response) {
					console.log("Trip Service Success");
					deferred.resolve(response.data);
					console.log(response.data);
				},
				function(errResponse){
					console.log('Error while validating the credentials');
					// the following line rejects the promise 
					deferred.reject(errResponse);
				}

		);
		return deferred.promise;
	}

}]);

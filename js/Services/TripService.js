App.factory('TripService', ['$http','$q', function($http, $q){

	var factory = {
			deleteReservation : deleteReservation ,
	};

	return factory;


	function deleteReservation(data) {
        var deferred = $q.defer();
        console.log("in update resrevtaion method");
        console.log(data);
        $http.put('/deleteBooking', data)
            .then(
            function (response) {
            	console.log("Response after call");
            	console.log(response);
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting flight');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

}]);

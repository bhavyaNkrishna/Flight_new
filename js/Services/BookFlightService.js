App.factory('BookFlightService', ['$http', '$q', function($http, $q){

    var factory = {
    		bookFlight: bookFlight
        
    };

    return factory;
    
    
    function bookFlight(flight) {
        var deferred = $q.defer();
        console.log("in flight service");
        $http.post('/insertflight', flight)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while inserting flight');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    

}]);

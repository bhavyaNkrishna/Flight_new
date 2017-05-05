App.factory('BookFlightService', ['$http', '$q', function($http, $q){

    var factory = {
    		bookFlight: bookFlight       
    };

    return factory;
    
    
    function bookFlight(data) {
        var deferred = $q.defer();
        console.log("in flight service");
        console.log(data);
        $http.post('/insertflight', data)
            .then(
            function (response) {
            	console.log("Response after call");
            	console.log(response);
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

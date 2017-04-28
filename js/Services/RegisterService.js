App.factory('RegisterService', ['$http', '$q', function($http, $q){

    var factory = {
    		createUser: createUser
        
    };

    return factory;
    
    
    function createUser(user) {
        var deferred = $q.defer();
        console.log("in service");
        $http.post('/insert', user)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while inserting user');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    

}]);

App.factory('AuthService', ['$rootScope','$cookieStore','$http', '$q','SessionService', function($rootScope,$cookieStore,$http, $q,SessionService){

	var userName = "";

	var factory = {
			loginUser: loginUser,
			setCredentials : setCredentials,
			clearCredentials : clearCredentials,
	};

	return factory;

	
	function loginUser(user) {
		
		var deferred = $q.defer();
		
		$http.post('/verifyUser', user) //Call goes to server.js file method
		.then(
				function (response) {
					console.log(response);
	                // promise is fulfilled
					deferred.resolve(response.data);

				},
				function(errResponse){
					console.log('Error while validating the credentials');
	                // the following line rejects the promise 
					deferred.reject(errResponse);
				}
		);
        // promise is returned
		return deferred.promise;
	}

	
	 function setCredentials(username) {
		 console.log("in set credentials");
         $rootScope.globals = {
             currentUser: {
                 username: username,
             }
         };
         SessionService.setCookieData(username);
     }
		
	 function clearCredentials() {
         $rootScope.globals = {};
         SessionService.clearCookieData();
	 }
	 
	 function Userlog() {
       console.log("in auth service");
	 }
}]);
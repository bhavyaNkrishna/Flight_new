
'use strict';

App.controller('LoginController', function($scope,$cookieStore ,AuthService, $route, $rootScope,$location) {
	$scope.data = {};
	$scope.errorMessage = false;

	$rootScope.pageTitle = $route.current.title;
	$scope.moduleTitle = "Login to Site";


	$scope.login = function() {
		console.log("in method");


		var user = {
				"uname": "",
				"pword" : ""
		};
		
		user.uname = $scope.data.email;
		user.pword = $scope.data.password;
		
		console.log( $scope.data.email);
		console.log(user.pword);
		
		AuthService.loginUser(user).then(
				function(data) {
					if(data.error===1){
						$scope.errorMessage="Username and Password does not match";
					} else {
						$scope.errorMessage= false;
					
						AuthService.setCredentials(user.uname);
						
						
						$location.path("/");
					}
					console.log("In Controller : ");
					console.log(data);
				},
				function(errResponse){
					console.error('Error while validating credentials');
				}
		);
	}
	
});
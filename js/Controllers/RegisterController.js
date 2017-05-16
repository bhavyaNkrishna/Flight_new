
'use strict';

App.controller('RegisterController', function($scope, RegisterService, md5, $route, $rootScope,$location) {
	$scope.data = {};
	$scope.successMessage = false;
	$scope.errorMessage = false;
	
	$scope.data.password = '';
	
	$scope.data.passwordConfirm = '';

	$rootScope.pageTitle = $route.current.title;
	$scope.moduleTitle = "Login to Site";


	$scope.register = function() {
		console.log("in registration controller");

		var user = {
				"uname": "",
				"uemail": "",
				"pword" : "",
				"pwordCon" : ""
		};

		user.uname = $scope.data.uname;
		user.uemail = $scope.data.uemail;
		 console.log($scope.data.password);		
		 var hashPassword = md5.createHash($scope.data.password);
		 console.log(hashPassword);
		user.pword = hashPassword;  
		 console.log($scope.data.passwordConfirm);
		 var hashConfirmPassword = md5.createHash($scope.data.passwordConfirm);
		 console.log(hashConfirmPassword);
		user.pwordCon = hashConfirmPassword; 

		RegisterService.createUser(user) 
		.then(
 				function(data) {
					if(data.error===1){
						$scope.successMessage= false;
						$scope.errorMessage="User not registered Click on SignUp to register";

					} else {
						$scope.errorMessage= false;
						$scope.successMessage="Registered Sucessfully  Click here to login  ";

						$location.path("/registration");
					}
					console.log("In Controller : ");
					console.log(data);
				},
				function(errResponse){
					console.error('Error while validating credentials');
				}
		);
	};
});
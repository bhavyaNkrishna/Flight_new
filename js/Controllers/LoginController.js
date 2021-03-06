
'use strict';

App.controller('LoginController', function($scope,$cookieStore, md5, SharedData ,AuthService, $route, $rootScope,$location) {
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
		console.log(user.uname + "from Login function");
		var hashPword = md5.createHash($scope.data.password);
		user.pword = hashPword;

		console.log( $scope.data.email);
		console.log(user.pword);

		AuthService.loginUser(user).then(
				function(data) {
					if(data.error===1){
						$scope.errorMessage="Username and Password does not match";
					} else {
						$scope.errorMessage= false;
						console.log(user.uname + "in login controller");
						AuthService.setCredentials(user.uname);
						//SharedData.setUname($scope.data.email);
						SharedData.setUname(user.uname);
						console.log("Testing get username " + SharedData.getUname());
						//$rootScope.uname = $scope.data.email;
						//console.log("root scope");
						//console.log($rootScope.uname);
						console.log("Previous " + $rootScope.previousLocation);
						$location.path($rootScope.previousLocation);
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
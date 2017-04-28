
'use strict';

App.controller('LogoutController', function($scope,$cookieStore ,AuthService, $route, $rootScope,$location) {
	$scope.data = {};
	$scope.errorMessage = false;

	$rootScope.pageTitle = $route.current.title;
	$scope.moduleTitle = "Logout Site";

	// at the bottom of your controller
	var init = function () {
			console.log("in logout method");
		    AuthService.clearCredentials();
	};
	// and fire it after definition
	init();
});
'use strict';
var App = angular.module('myApp', ['ngRoute','angular-md5','ngCookies']);

App.controller('HomeController', function($scope,$cookieStore,SharedData,AuthService,SessionService,$rootScope,$location) {
	

	if(!SessionService.getCookieData()) {
		$rootScope.loginbutton = true;
		$rootScope.logoutbutton = false;
	} else {
		$rootScope.loginbutton = false;
		$rootScope.logoutbutton = true;
		SharedData.setUname(SessionService.getCookieData());
	}
	// at the bottom of your controller
	$scope.logout = function() {
		    AuthService.clearCredentials();
		    $rootScope.loginbutton = true;
			$rootScope.logoutbutton = false;
	};
});
/*Routeprovider is used to route the request to the it's own template url i.e. custom html and it's controller
 * class.
 * 
 * 
 * */
App.config(['$routeProvider', function ($routeProvider) { 
	$routeProvider
	.when("/", {
		templateUrl : "views/search.html",
		controller : "MainController"
	})
	.when("/results", {
		templateUrl : "results.html",
		controller : "ResultsController"
	})
	.when("/login", {
		templateUrl : "views/login.html",
		controller : "LoginController"
	})
	.when("/registration", {
		templateUrl : "views/registration.html",
		controller : "RegisterController"
	})
	.when("/review", {
		templateUrl : "views/review.html",
		controller : "ReviewController",
		resolve: {
			authLogin: ["$q", "SessionService", function($q, SessionService) {
				var userName = SessionService.getCookieData();
				if (userName) {
					return $q.when(userName);
				} else {
					return $q.reject({ authenticated: false });
				}
			}]
		}
	})
	.when("/trips", {
		templateUrl : "views/trips.html",
		controller : "TripsController",
		resolve: {
			authLogin: ["$q", "SessionService", function($q, SessionService) {
				var userName = SessionService.getCookieData();
				if (userName) {
					return $q.when(userName);
				} else {
					return $q.reject({ authenticated: false });
				}
			}]
		}
	})
	.when("/bookingForm", {
		templateUrl : "views/bookingForm.html",
		controller : "ReviewController",
		resolve: {
			authLogin: ["$q", "SessionService", function($q, SessionService) {
				var userName = SessionService.getCookieData();
				if (userName) {
					return $q.when(userName);
				} else {
					return $q.reject({ authenticated: false });
				}
			}]
		}
	})
	.when("/thankYou", {
		templateUrl : "views/thankYou.html",
		controller : "ReviewController",
		resolve: {
			authLogin: ["$q", "SessionService", function($q, SessionService) {
				var userName = SessionService.getCookieData();
				if (userName) {
					return $q.when(userName);
				} else {
					return $q.reject({ authenticated: false });
				}
			}]
		}
	})
	.otherwise({
		redirectTo: "/"
	});

}]);

App.run(["$rootScope", "$location","SessionService", function ($rootScope, $location,SessionService) {

	$rootScope.$on("$routeChangeSuccess", function (userInfo) {
		//$rootScope.loginbutton = false;
		//$rootScope.logoutbutton = true;
		if(!SessionService.getCookieData()) {
			$rootScope.loginbutton = true;
			$rootScope.logoutbutton = false;
		} else {
			$rootScope.loginbutton = false;
			$rootScope.logoutbutton = true;
		}
	});

	$rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
		if (eventObj.authenticated === false) {
				$rootScope.loginbutton = true;
				$rootScope.logoutbutton = false;
			$location.path("/login");
		}
	});
	
	$rootScope.$on('$locationChangeStart', function (event, current, previous) {
	        console.log("Previous URL" +previous);
	        var hashIndex = previous.indexOf('#');
	        var oldRoute = previous.substr(hashIndex + 2);
	        $rootScope.previousLocation = oldRoute;
});
}]);



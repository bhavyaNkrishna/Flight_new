'use strict';
var App = angular.module('myApp', ['ngRoute','ngCookies']);

/*Routeprovider is used to route the request to the it's own template url i.e. custom html and it's controller
 * class.
 * 
 * 
 * */
App.config(['$routeProvider', function ($routeProvider) { 
	$routeProvider
	.when("/", {
		templateUrl : "views/search.html",
		controller : "MainController",
		resolve: {
			authLogin: ["$q", "SessionService", function($q, SessionService) {
				var userName = SessionService.getCookieData();
				console.log("in auth");
				if (userName) {
					return $q.when(userName);
				} else {
					return $q.reject({ authenticated: false });
				}
			}]
		}
	})
	.when("/results", {
		templateUrl : "results.html",
		controller : "ResultsController"
	})
	.when("/login", {
		templateUrl : "views/login.html",
		controller : "LoginController"
	})
	.when("/logout", {
		templateUrl : "views/logout.html",
		controller : "LogoutController"
	})
	.when("/registration", {
		templateUrl : "views/registration.html",
		controller : "RegisterController"
	})
	.when("/review", {
		templateUrl : "views/review.html",
		controller : "ReviewController"
	})
	.otherwise({
		redirectTo: "/"
	});

}]);

App.run(["$rootScope", "$location", function ($rootScope, $location) {

	$rootScope.$on("$routeChangeSuccess", function (userInfo) {
		console.log("Called");
		console.log(userInfo);
	});

	$rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
		if (eventObj.authenticated === false) {
			$location.path("/login");
		}
	});
}]);



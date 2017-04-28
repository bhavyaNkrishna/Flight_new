App.factory('SessionService', ['$rootScope','$cookieStore','$http', '$q', function($rootScope,$cookieStore,$http, $q){

	var userName = "";

	var factory = {
			setCookieData :setCookieData,
			getCookieData :getCookieData,
			clearCookieData :clearCookieData,

	};

	return factory;
	 
	 function setCookieData(username) {
			userName = username;
			$cookieStore.put("userName", username);
		}
	
	 function getCookieData(){
			userName = $cookieStore.get("userName");
			return userName;
	}
	 
	 function clearCookieData() {
			userName = "";
			$cookieStore.remove("userName");
		}
}]);
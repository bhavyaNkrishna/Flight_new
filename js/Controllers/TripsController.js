App.controller('TripsController', function($scope, FlightService, SessionService, SharedData, $location) {
	
	if(!SessionService.getCookieData()) {
		$scope.loginbutton = true;
		$scope.logoutbutton = false;
	} else {
		$scope.loginbutton = false;
		$scope.logoutbutton = true;
	}
	
	$scope.print = function() {
		
		var myElement = document.getElementById( 'itineraries' );
		console.log(myElement.innerHTML);
		var itinerary = { content:  myElement.innerHTML};
		
		// open the PDF in a new window
		 pdfMake.createPdf(itinerary).open();

		 // print the PDF
		 //pdfMake.createPdf(itinerary).print();

		 // download the PDF
		 //pdfMake.createPdf(itinerary).download('C:\Users\Kris\Desktop\itinerary.pdf');
	}
	
});
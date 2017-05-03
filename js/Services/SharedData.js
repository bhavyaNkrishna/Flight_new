App.service('SharedData', function () {
    var departureFlights = [];
    var returnFlights = [];
    var flights = [];
    var form = [];
    var departureFlight = [];
    var returnFlight = [];

    return {
        //Getter and Setter function for sharing data between controller
    	getFlights: function() {
    		return flights;
    	},
    	setFlights: function(value) {
    		flights = value;
    	},
        getDepartureFlights: function() {
            return departureFlights;
        },
        setDepartureFlights: function(value) {
            departureFlights = value;
        },
        getReturnFlights: function() {
            return returnFlights;
        },
        setReturnFlights: function(value) {
            returnFlights = value;
        },
        getForm: function() {
            return form;
        },
        setForm: function(value) {
            form = value;
        },
        getDepartureFlight: function() {
            return departureFlight;
        },
        setDepartureFlight: function(value) {
        	departureFlight = value;
        },
        getReturnFlight: function() {
            return returnFlight;
        },
        setReturnFlight: function(value) {
            console.log(value);
            returnFlight = value;
        }
    };
});
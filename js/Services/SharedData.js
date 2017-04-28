App.service('SharedData', function () {
    var flights = [];
    var form = [];

    return {
        //Getter and Setter function for sharing data between controller
        getFlights: function() {
            return flights;
        },
        setFlights: function(value) {
            console.log(value);
            flights = value;
        },
        getForm: function() {
            return form;
        },
        setForm: function(value) {
            form = value;
        }
    };
});
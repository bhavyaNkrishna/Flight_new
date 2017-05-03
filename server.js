
var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");

var app = express();
app.use('/',express.static('./'));

app.use(bodyParser.json()); 

//app.use(express.static(__dirname + "/public"));

//LOGGER
var log4js = require('log4js');
var log = log4js.getLogger("server");


var pool = mysql.createPool({
	connectionLimit : 100,
	host: "127.0.0.1",
	user: "root",
	password: "Password123",
	database: "synechron_db",
	port: "3306"
});


//connection.connect();

pool.getConnection(function (err, connection) {
	if (!err) {
		log.info('Database is connected ... ');
		connection.release();
	} else {
		log.error('Error connecting database ... ');
	}
});


app.post('/verifyUser', function (req, res) {
	var uname = req.body.uname;
	var pword = req.body.pword;
	log.info(req);
	var data = {
			"error": 1,
			"user": ""
	};
	pool.getConnection(function (err, connection) {
		connection.query('select * from user_details where username = ? and password=?',[uname,  pword], function (err, rows, fields){
			if (rows!==undefined) {
				if( rows.length !== 0 && !err) {
					data.error = 0;
					data.user = rows;
					res.json(data);
				} else if (rows.length === 0) {
					data.error = 1;
					res.json(data);
				}
			}  else {				
				data.error = 1;
				res.json(data);
				log.error('Error while performing Query: ' + err);
			}
		});
	});
});

app.post('/autocomplete', function (req, res) {
	var term1 = req.body.term + "%";
	var term2 = "%" + req.body.term + "%";
	var data = {
			"value": ""
	};
	pool.getConnection(function (err, connection) {

		connection.query('select code, name from airports where city like ? or name like ? or state like ?',[term1, term2, term2], function (err, rows, fields){
			log.info(rows);

			if (rows!==undefined) {
				if( rows.length !== 0 && !err) {
					for (var i = 0; i < rows.length; i++) {
						data.value = rows[i]["code"] + " - " + rows[i]["name"];
					}
					res.json(data);
				} else if (rows.length === 0) {
					data.error = 1;
					res.json(data);
				}
			}  else {				
				data.error = 1;
				res.json(data);
				log.error('Error while performing Query: ' + err);
			}
		});

	});

});


app.post('/insert', function (req, res) {

	var uname = req.body.uname;
	var uemail = req.body.uemail;
	var pword = req.body.pword;
	var pwordCon = req.body.pwordCon;

	log.info(req);

	var data = {
			"error": 1,
			"user": ""
	};

	log.info(pwordCon);
	log.info('POST Request :: /insert: ');

	if (!!uname && !!uemail && !!pword && !!pwordCon) {
		pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO user_details SET username = ?, password = ?, email = ?,confirmpassword = ?",
					[uname,  pword, uemail, pwordCon], function (err, rows, fields) {
				if (!!err) {
					data.user = "Error Adding data";
					log.error(err);
				} else {
					data.error = 0;
					data.user = "User Added Successfully";
					log.info("Added: " + [uname, uemail]);
				}
				res.json(data);
			});
		});
	} else {
		data.users = "Please provide all required data (i.e : name, password)";
		res.json(data);
	}
});


app.post('/insertflight', function (req, res) {

	var arrivalCity = req.body.arrivalCity;
	var arrivalDate = req.body.arrivalDate;
	var departureCity = req.body.departureCity;
	var departureDate = req.body.departureDate;
	var flightNumber = req.body.flightNumber;
	var price = req.body.price;
	var uname = req.body.uname;

	log.info(req);

	var flight = {
			"error": 1,
			"flight": ""
	};

	//log.info(pwordCon);
	log.info('POST Request :: /insertflight: ');

	if (!!arrivalCity && !!arrivalDate && !!departureCity && !!departureDate  && !!flightNumber  && !!price && !!uname ) {
		pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO user SET arrivalCity = ?, arrivalDate = ?, departureCity = ?,departureDate = ?,flightNumber = ?,price = ?,uname = ?",
					[arrivalCity,  arrivalDate, departureCity,departureDate,flightNumber,price, uname], function (err, rows, fields) {
				if (!!err) {
					flight.flightDetails = "Error Adding data";
					log.error(err);
				} else {
					flight.error = 0;
					flight.flightDetails = "flight detail Added Successfully";
					//log.info("Added: " + [uname, uemail]);
				}
				res.json(flight);
			});
		});
	} else {
		flight.users = "Please provide all required data (i.e : name, password)";
		res.json(flight);
	}
});

var server = app.listen(8084);
//app.listen(8085);



var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var async = require('async');

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

	var arrivalCity = req.body.flight.arrivalCity;
	var arrivalDate = req.body.flight.arrivalDate;
	var departureCity = req.body.flight.departureCity;
	var departureDate = req.body.flight.departureDate;
	var flightNumber = req.body.flight.flightNumber;
	var price = req.body.flight.price;
	var duration = req.body.flight.duration;
	var arrivalTime = req.body.flight.arrivalTime;
	var departureTime = req.body.flight.departureTime;
	var legs = req.body.flight.legs.slice();
	var returnFlight =  req.body.flight.returnFlight;
	var oneway = req.body.flight.oneway;
	var uname = req.body.uname;

	var userId ;

	log.info(req);

	log.info('leg details');
	log.info('uname is ');
	log.info(req.body.uname);

	/*for(var i=0;i<req.body.legs.length;i++){

		log.info(req.body.leg.flightNumber);
	}*/

	//log.info(req.body.legs.flightNumber);

	var responseData = {
			"error": 1,
			"flight": ""
	};

	//log.info(pwordCon);
	log.info('POST Request :: /insertflight: ');

	//if (!!arrivalCity && !!arrivalDate && !!departureCity && !!departureDate && !!departureTime && !!arrivalTime && !!duration && !!flightNumber && !!price ) {
	log.info("inside inf");
	pool.getConnection(function (err, connection) {

		async.waterfall([
			//UserId
			function(callback) {
				connection.query('SELECT user_id FROM user_details WHERE username = ?',        
						uname, function(err, rows, fields) {
					//log.info(results);
					//log.info("Row");
					log.info(rows);
					if (!!err) {
						responseData.flight = "Error selecting data";
						log.error(err);
						callback(err);
					} else {
						responseData.error = 0;
						responseData.flight = "Selected Userid Successfully";
						log.info("Added: ");
						callback(null,rows[0].user_id);
					}
				});
			},
			//Reservation
			function(userID,callback){
				log.info("in second function");
				log.info(price);
				connection.query('INSERT INTO reservation_details  SET User_ID = ?, IsReserved = ?, Reservation_Price = ?',        
						[userID, false , price], function(err, results, fields) {
					//log.info(results);
					//log.info("Row");
					//log.info(rows);
					if (!!err) {
						responseData.flight = "Error selecting data";
						log.error(err);
						callback(err);
					} else {
						responseData.error = 0;
						responseData.flight = "Selected Userid Successfully";
						log.info("Added: ");
						callback(null,userID,results.insertId);
					}
				});
			},
			//flight
			function(userID,reservationID,callback){
				log.info("in third function");
				//log.info(userID + " " + reservationID);
				var initialId = "";
				connection.query('INSERT INTO flight_details  SET Flight_Number = ?, Arrival_City = ?, Arrival_Date = ? ,Departure_Date = ?,Departure_City =?, Arrival_Time =?,Departure_Time=?,Flight_Duration=?',  
						[flightNumber, arrivalCity , arrivalDate,departureDate,departureCity,arrivalTime,departureTime,duration], function(err, results, fields) {

					log.info(results);
					if (!!err) {
						responseData.flight = "Error selecting data";
						log.error(err);
						callback(err);
					} else {
						responseData.error = 0;
						responseData.flight = "Selected Userid Successfully";
						log.info("Added Third intial flight: ");
						initialId = results.insertId;
						callback(null,userID,reservationID,initialId);
					}
				});


			},
			//Leg Details
			function(userID,reservationID,initialId,callback) {
				var legAndStopMap = [];
				if(!!legs) {
					var i=0;
					async.each(legs,function(leg,legCallback){
						connection.query('INSERT INTO flight_details  SET Flight_Number = ?, Arrival_City = ?, Arrival_Date = ? ,Departure_Date = ?,Departure_City =?, Arrival_Time =?,Departure_Time=?,Flight_Duration=?',  
								[leg.flightNumber,leg.arrivalCity , leg.arrivalDate, leg.departureDate,leg.departureCity,leg.arrivalTime,leg.departureTime,leg.duration], function(err, results, fields) {

							log.info(results);
							if (!!err) {
								responseData.flight = "Error selecting data";
								log.error(err);
								legCallback(err);
							} else {
								responseData.error = 0;
								responseData.flight = "Selected Userid Successfully";
								log.info("Added: legs data ");
								legAndStopMap.push({id:results.insertId,stop:++i});
								log.info("after legs" + legAndStopMap.length+ " : "+legs.length);
								legCallback();
							}
						});
					},function(err) {
						log.info("completed");
						callback(null,userID,reservationID,initialId,legAndStopMap);
					});
				} else {
					callback(null,userID,reservationID,initialId,legAndStopMap);

				}
					 
			},
			//Leg and Stop Details
			function(userID,reservationID,initialId,legAndStopMap,callback){
				log.info("in fourth function");
				var id;
				var stop;
				log.info(legAndStopMap);
				log.info("the leg details are leg id" +legAndStopMap[id]);
				log.info("the leg details are stop number" +legAndStopMap[stop]);
				if(!legAndStopMap){
					connection.query('INSERT INTO leg_details  SET Reservation_ID = ?, Initial_Flight_ID = ?',  
								[reservationID,initialId], function(err, results, fields) {

							log.info(results);
							if (!!err) {
								responseData.flight = "Error selecting data";
								log.error(err);
								callback(err);
							} else {
								responseData.error = 0;
								responseData.flight = "Selected Userid Successfully";
								log.info("Added: into legDetails table with initial id ");
								//legAndStopMap.push({id:results.insertId,stop:++i});
								//log.info("after legs" + legAndStopMap.length+ " : "+legs.length);
								callback(null);
							}
						});
				}
				else{
					async.each(legs,function(leg,callback){
						var i=0;
						connection.query('INSERT INTO leg_details  SET Reservation_ID = ?, Flight_Leg_ID = ?, Stop_Number = ?',  
								[reservationID,legAndStopMap, leg.arrivalDate, leg.departureDate,leg.departureCity,leg.arrivalTime,leg.departureTime,leg.duration], function(err, results, fields) {

							log.info(results);
							if (!!err) {
								responseData.flight = "Error selecting data";
								log.error(err);
								callback(err);
							} else {
								responseData.error = 0;
								responseData.flight = "Selected Userid Successfully";
								log.info("Added: legs data ");
								legAndStopMap.push({id:results.insertId,stop:++i});
								log.info("after legs" + legAndStopMap.length+ " : "+legs.length);
								callback();
							}
						});
					},function(err) {
						log.info("completed");
						callback(null,userID,reservationID,initialId,legAndStopMap);
					});
					
					
				}
			}

			], function(err,result) {
			log.info("in final function");
		});


		//log.info("outside");
		//log.info(userId);
		/*connection.query('INSERT INTO reservation_details  SET User_ID = ?, SubmittedDate = ?, IsReserved = ?,Reservation_Price = ?',        
							[uname,  submittedDate , false , price], function(err, rows) {
						if (!!err) {
							data.user = "Error Adding data";
							log.error(err);
						} else {
							data.error = 0;
							data.user = "User Added Successfully";
							log.info("Added: " + [uname, uemail]);
						}
					});

					function insertToFlight(flight, callback) {
					connection.query('INSERT INTO flight_details  SET Flight_Number = ?, Arrival_City = ?, Arrival_Date = ?,Departure_Date = ? ,'+
							'Departure_City = ?,Arrival_Time = ?,Departure_Time = ?,Flight_Duration = ?',        
							[flightNumber,arrivalCity, arrivalDate, departureDate, departureCity, arrivalTime,departureTime,duration], function(err, rows) {
						if (!!err) {
							data.user = "Error Adding data";
							log.error(err);
						} else {
							data.error = 0;
							data.user = "User Added Successfully";
							log.info("Added: " + [uname, uemail]);
						}
					});	*/				

		//}
	});
	//}
});

var server = app.listen(8084);
//app.listen(8085);



var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var async = require('async');
var cron = require('node-cron');

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
	password: "mypassword",
	database: "synechron_db",
	dateStrings:true,
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
	/*var task=cron.schedule('* * * * *', function() {
		connection.query('delete from reservation_details where IsReserved=0 and NOW() >= SubmittedDate +  INTERVAL 24 hour',function (err, rows, fields){
			if(!err) {
				log.info('cron job started');
			}
			else {
				log.error('Error while performing Query:' +err);
			}
		});
	});
	task.start();*/
});


app.post('/verifyUser', function (req, res) {
	var uname = req.body.uname;
	log.info("username check " + uname);
	var pword = req.body.pword;
	//log.info(req);
	var data = {
			"error": 1,
			"user": {}
	};
	pool.getConnection(function (err, connection) {
		connection.query('select * from user_details where username = ? and password=?',[uname,  pword], function (err, rows, fields){
			if (rows!==undefined) {
				if( rows.length !== 0 && !err) {
					data.error = 0;
					data.user = {userid:rows.user_id, username:rows.username};
					log.info(rows);
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


app.post('/bookedFlight', function (req, res) {
	var uname = req.body.uname;
	var resData = [];
	var data = {
			"error": 1,
			"cronerror":1,
				"fldata": [],
			
	};
	log.info(uname);
	log.info("entered");
	pool.getConnection(function (err, connection) {
		/*connection.query('select r.Reservation_ID from synechron_db.reservation_details r JOIN synechron_db.user_details u on u.user_id=r.User_ID where u.username=?',uname, function (err, results, fields){
		log.info(results);

            if (!err) {
            	log.info("here");
					for(var i in results){
						log.info(i);
						connection.query('select r.Reservation_ID,f.Flight_ID,f.Flight_Number,f.Arrival_City,f.Arrival_Date,f.Departure_Date,f.Departure_City,' +
								+ 'f.Arrival_Time,f.Departure_Time,f.Flight_Duration,f.Return_Flight,r.IsReserved, r.Reservation_Price' + 
								+ 'from synechron_db.flight_details f JOIN synechron_db.leg_details l JOIN synechron_db.reservation_details r' + 
								+ 'ON f.Flight_ID = l.Initial_Flight_ID and l.Reservation_ID = r.Reservation_ID where r.IsReserved=0 and l.Reservation_ID=? union' +
								+ 'select r.Reservation_ID,f.Flight_ID,f.Flight_Number,f.Arrival_City,f.Arrival_Date,f.Departure_Date,f.Departure_City,' +
								+ 'f.Arrival_Time,f.Departure_Time,f.Flight_Duration,f.Return_Flight,r.IsReserved, r.Reservation_Price' + 
								+ 'from synechron_db.flight_details f JOIN synechron_db.leg_details l JOIN synechron_db.reservation_details r' + 
								+ 'ON f.Flight_ID = l.Flight_Leg_ID and l.Reservation_ID = r.Reservation_ID where r.IsReserved=0 and r.Reservation_ID=?' +
								+ 'union select r.Reservation_ID,f.Flight_ID,f.Flight_Number,f.Arrival_City,f.Arrival_Date,f.Departure_Date,f.Departure_City,' +
								+ 'f.Arrival_Time,f.Departure_Time,f.Flight_Duration,f.Return_Flight,r.IsReserved, r.Reservation_Price' + 
								+ 'from synechron_db.flight_details f JOIN synechron_db.leg_details l JOIN synechron_db.reservation_details r' + 
								+ 'ON f.Flight_ID = l.Initial_Flight_ID and l.Reservation_ID = r.Reservation_ID where r.IsReserved=1 and l.Reservation_ID=? union' +
								+ 'select r.Reservation_ID,f.Flight_ID,f.Flight_Number,f.Arrival_City,f.Arrival_Date,f.Departure_Date,f.Departure_City,' +
								+ 'f.Arrival_Time,f.Departure_Time,f.Flight_Duration,f.Return_Flight,r.IsReserved, r.Reservation_Price' + 
								+ 'from synechron_db.flight_details f JOIN synechron_db.leg_details l JOIN synechron_db.reservation_details r' + 
								+ 'ON f.Flight_ID = l.Flight_Leg_ID and l.Reservation_ID = r.Reservation_ID where r.IsReserved=1 and r.Reservation_ID=?',[results[i].Reservation_ID,results[i].Reservation_ID,results[i].Reservation_ID,results[i].Reservation_ID], function (rows){
						    log.info(rows);
							if (rows!==undefined) {
								if( rows.length !== 0 && !err) {
									data.error = 0;
									for(var i in rows){
							         data.fldata.push({resid:rows[i].Reservation_ID,flightid:rows[i].Flight_ID, flightno:rows[i].Flight_Number, arrcity:rows[i].Arrival_City,arrdate:rows[i].Arrival_Date,depdate:rows[i].Departure_Date,
							         depcity:rows[i].Departure_City,arrtime:rows[i].Arrival_Time, deptime:rows[i].Departure_Time, flightdur:rows[i].Flight_Duration,
							         round:rows[i].Return_Flight,isr:rows[i].IsReserved,price:rows[i].Reservation_Price});
										return res.json(data); 
									}
								}else if (rows.length === 0) {
									data.error = 1;
									return res.json(data);
								}
						    } else {

								data.error = 1;
								return res.json(data);
								log.error('Error while performing Query: ' + err);
							}
						});
					}
			}
			else{
				log.info("error");
			}
				else if (rows.length === 0) {
					data.error = 1;
					//res.json(data);
				}
			} else {

				data.error = 1;
				//res.json(data);
				log.error('Error while performing Query: ' + err);
			}
			});*/
		async.waterfall([
			function(callback) {
					log.info("USERNAME IS " + uname);
					connection.query('select r.Reservation_ID from synechron_db.reservation_details r JOIN synechron_db.user_details u on u.user_id=r.User_ID where u.username=?', 
							[uname], function(err, rows, fields) {
						log.info(rows);
						if (!!err) {
							data.error = "Error selecting data from user details table";
							log.error(err);
							callback(err);
						} else {
							data.error = 0;
							log.info("Added into first else ");
							callback(null,rows);
						}
					});
			},
			function(resData, callback){
			async.each(resData, function(resd,callback){
				log.info("in second function");
				data.fldata = [];
					connection.query('select r.Reservation_ID,f.Flight_ID,f.Flight_Number,f.Arrival_City,f.Arrival_Date,f.Departure_Date,f.Departure_City,f.Arrival_Time,f.Departure_Time,f.Flight_Duration,f.Return_Flight,r.IsReserved, r.Reservation_Price from synechron_db.flight_details f JOIN synechron_db.leg_details l JOIN synechron_db.reservation_details r ON f.Flight_ID = l.Initial_Flight_ID and l.Reservation_ID = r.Reservation_ID where r.IsReserved=0 and r.Reservation_ID=? union select r.Reservation_ID,f.Flight_ID,f.Flight_Number,f.Arrival_City,f.Arrival_Date,f.Departure_Date,f.Departure_City, f.Arrival_Time,f.Departure_Time,f.Flight_Duration,f.Return_Flight,r.IsReserved, r.Reservation_Price from synechron_db.flight_details f JOIN synechron_db.leg_details l JOIN synechron_db.reservation_details r ON f.Flight_ID = l.Flight_Leg_ID and l.Reservation_ID = r.Reservation_ID where r.IsReserved=0 and r.Reservation_ID=? union select r.Reservation_ID,f.Flight_ID,f.Flight_Number,f.Arrival_City,f.Arrival_Date,f.Departure_Date,f.Departure_City, f.Arrival_Time,f.Departure_Time,f.Flight_Duration,f.Return_Flight,r.IsReserved, r.Reservation_Price from synechron_db.flight_details f JOIN synechron_db.leg_details l JOIN synechron_db.reservation_details r ON f.Flight_ID = l.Initial_Flight_ID and l.Reservation_ID = r.Reservation_ID where r.IsReserved=1 and r.Reservation_ID=? union select r.Reservation_ID,f.Flight_ID,f.Flight_Number,f.Arrival_City,f.Arrival_Date,f.Departure_Date,f.Departure_City, f.Arrival_Time,f.Departure_Time,f.Flight_Duration,f.Return_Flight,r.IsReserved, r.Reservation_Price from synechron_db.flight_details f JOIN synechron_db.leg_details l JOIN synechron_db.reservation_details r ON f.Flight_ID = l.Flight_Leg_ID and l.Reservation_ID = r.Reservation_ID where r.IsReserved=1 and r.Reservation_ID=? order by Flight_ID', [resd.Reservation_ID, resd.Reservation_ID, resd.Reservation_ID, resd.Reservation_ID], function(err, results, fields) {
						if (!!err) {
							data.error = "Error Inserting data into reservation details table";
							log.info(data.error);
							callback(err);
						} else {
							data.error = 0;
							log.info("Added into else block ");
							log.info(resd.Reservation_ID);
							/*data.fldata.push({resid:results[i].Reservation_ID,flightid:results[i].Flight_ID, flightno:results[i].Flight_Number, arrcity:results[i].Arrival_City,arrdate:results[i].Arrival_Date,depdate:results[i].Departure_Date,
						         depcity:results[i].Departure_City,arrtime:results[i].Arrival_Time, deptime:results[i].Departure_Time, flightdur:results[i].Flight_Duration,
						         round:results[i].Return_Flight,isr:results[i].IsReserved,price:results[i].Reservation_Price});*/
                              data.fldata.push(results);
  							callback();
						}
						//res.json(data);
					}
                   );
				},function(err){
				    // All tasks are done now
				    //doSomethingOnceAllAreDone();
					callback(null);
				  });
			}
		],function(err,result) {
			log.info("in final function");
			res.json(data);
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
//update the reservation table with id

app.put('/updateFlight', function (req, res) {
	var reservationId = req.body.reservationId;
	log.info(reservationId);
	var data = {
			"error": 1,
			"id": ""
	};
	log.info('PUT Request :: /update: ');
	if (!!reservationId) {
		pool.getConnection(function (err, connection) {
			connection.query("UPDATE reservation_details SET IsReserved = ? WHERE Reservation_ID=?",[true,  reservationId], function (err, rows, fields) {
				if (!!err) {
					data.id = "Error Updating reservation";
					log.error(err);
				} else {
					data.error = 0;
					data.id = "Updated reservation sucessfully";
				}
				res.json(data);
			});
		});
	} else {
		data.id = "Please provide all required data (i.e :reservation id)";
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
	var legs;
	if(!!req.body.flight.legs) {
		legs = req.body.flight.legs.slice();
	}

	var returnFlight =  req.body.flight.returnFlight;
	var oneway = req.body.flight.oneway;
	var uname = req.body.uname;
	var reservationId = req.body.reservationId;

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
			"errorMsg" : "",
			"reservationId": ""
	};

	//log.info(pwordCon);
	log.info('POST Request :: /insertflight: ');

	//if (!!arrivalCity && !!arrivalDate && !!departureCity && !!departureDate && !!departureTime && !!arrivalTime && !!duration && !!flightNumber && !!price ) {
	log.info("inside inf");
	pool.getConnection(function (err, connection) {

		log.info("reservation conditions");
		log.info(reservationId);
		log.info(!reservationId);
		log.info(!!reservationId);

		async.waterfall([
			//UserId
			function(callback) {
				if(!reservationId) {
					log.info("USERNAME IS " + uname);
					log.info("ONEWAY IS " + oneway);
					log.info("DEPARTURE CITY IS" + departureCity);
					connection.query('SELECT user_id FROM user_details WHERE username = ?',        
							[uname], function(err, rows, fields) {
						//log.info(results);
						//log.info("Row");
						log.info(rows);
						if (!!err) {
							responseData.errorMsg = "Error selecting data from user details table";
							log.error(err);
							callback(err);
						} else {
							responseData.error = 0;
							log.info("Added: ");
							callback(null,rows[0].user_id);
						}
					});
				} else {
					callback(null,0);
				}
			},
			//Reservation
			function(userID,callback){
				log.info("in second function");
				log.info(price);
				if(!reservationId) {
					connection.query('INSERT INTO reservation_details  SET User_ID = ?, IsReserved = ?, Reservation_Price = ?',        
							[userID, false , price], function(err, results, fields) {
						//log.info(results);
						//log.info("Row");
						//log.info(rows);
						if (!!err) {
							responseData.errorMsg = "Error Inserting data into reservation details table";
							log.error(err);
							callback(err);
						} else {
							responseData.error = 0;
							log.info("Added: ");
							responseData.reservationId = results.insertId;
							callback(null,results.insertId);
						}
					});
				} else {
					callback(null,reservationId);
					responseData.reservationId = reservationId;
				}
			},

			//flight
			function(reservationID,callback){
				log.info("in third function");
				//log.info(userID + " " + reservationID);
				var initialId = "";
				connection.query('INSERT INTO flight_details  SET Flight_Number = ?, Arrival_City = ?, Arrival_Date = ? ,Departure_Date = ?,Departure_City =?, Arrival_Time =?,Departure_Time=?,Flight_Duration=? ,Return_Flight = ? ' ,  
						[flightNumber, arrivalCity , arrivalDate,departureDate,departureCity,arrivalTime,departureTime,duration,returnFlight], function(err, results, fields) {

					log.info(results);
					if (!!err) {
						responseData.errorMsg = "Error Inserting data into flight details table";
						log.error(err);
						callback(err);
					} else {
						responseData.error = 0;
						log.info("Added Third intial flight: ");
						initialId = results.insertId;
						callback(null,reservationID,initialId);
					}
				});


			},
			//Leg Details
			function(reservationID,initialId,callback) {
				var legAndStopMap = [];
				if(!!legs) {
					var i=0;
					async.each(legs,function(leg,legCallback){
						connection.query('INSERT INTO flight_details  SET Flight_Number = ?, Arrival_City = ?, Arrival_Date = ? ,Departure_Date = ?,Departure_City =?, Arrival_Time =?,Departure_Time=?,Flight_Duration=?,Return_Flight=?',  
								[leg.flightNumber,leg.arrivalCity , leg.arrivalDate, leg.departureDate,leg.departureCity,leg.arrivalTime,leg.departureTime,leg.duration,leg.returnFlight], function(err, results, fields) {

							log.info(results);
							if (!!err) {
								responseData.errorMsg = "Error Inserting data into flight details table";
								log.error(err);
								legCallback(err);
							} else {
								responseData.error = 0;
								log.info("Added: legs data ");
								legAndStopMap.push({id:results.insertId,stop:++i});
								log.info("after legs" + legAndStopMap.length+ " : "+legs.length);
								legCallback();
							}
						});
					},function(err) {
						log.info("completed");
						callback(null,reservationID,initialId,legAndStopMap);
					});
				} else {
					callback(null,reservationID,initialId,legAndStopMap);

				}

			},
			//Leg and Stop Details
			function(reservationID,initialId,legAndStopMap,callback){
				log.info("in fourth function");
				var id;
				var stop;
				log.info(legAndStopMap);

				log.info("the leg details are leg id" +legAndStopMap[0].id);
				log.info("the leg details are stop number" +legAndStopMap[0].stop);
				if(!legAndStopMap){
					connection.query('INSERT INTO leg_details  SET Reservation_ID = ?, Initial_Flight_ID = ?',  
							[reservationID,initialId], function(err, results, fields) {

						log.info(results);
						if (!!err) {
							responseData.errorMsg = "Error Inserting data into leg details table";
							log.error(err);
							callback(err);
						} else {
							responseData.error = 0;
							log.info("Added: into legDetails table with initial id ");
							//legAndStopMap.push({id:results.insertId,stop:++i});
							//log.info("after legs" + legAndStopMap.length+ " : "+legs.length);
							callback(null);
						}
					});
				}
				else{
					async.each(legAndStopMap,function(legAndStopMap,callback){
						var i=0;
						log.info("inside else block");
						connection.query('INSERT INTO leg_details  SET Reservation_ID = ?,Initial_Flight_ID = ?, Flight_Leg_ID = ?, Stop_Number = ?',  
								[reservationID,initialId,legAndStopMap.id,legAndStopMap.stop], function(err, results, fields) {

							log.info(results);
							if (!!err) {
								responseData.errorMsg = "Error Inserting data into leg details table";
								log.error(err);
								callback(err);
							} else {
								responseData.error = 0;
								log.info("Added: legs data in leg details table");
								//legAndStopMap.push({id:results.insertId,stop:++i});
								//log.info("after legs" + legAndStopMap.length+ " : "+legs.length);
								callback();
							}
						});
					},function(err) {
						log.info("completed fourth function");
						callback(null);
					});

				}
			}

			], function(err,result) {
			log.info("in final function");
			res.json(responseData);
		});

	});
	//}
});

var server = app.listen(8086);
//app.listen(8085);


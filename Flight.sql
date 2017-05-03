SET SESSION FOREIGN_KEY_CHECKS=0;

/* Drop Tables */

DROP TABLE IF EXISTS Leg_Details;
DROP TABLE IF EXISTS Flight_Details;
DROP TABLE IF EXISTS Reservation_Details;





/* Create Tables */

CREATE TABLE Flight_Details
(
	Flight_ID int unsigned NOT NULL AUTO_INCREMENT,
	Flight_Number varchar(10) NOT NULL,
	Arrival_City varchar(20) NOT NULL,
	Arrival_Date date,
	Departure_Date date,
	Departure_City varchar(20) NOT NULL,
	Arrival_Time varchar(10) NOT NULL,
	Departure_Time varchar(10) NOT NULL,
	Flight_Duration varchar(10) NOT NULL,
	Round_Trip boolean NOT NULL,
	Origin_Flight boolean NOT NULL,
	PRIMARY KEY (Flight_ID)
);


CREATE TABLE Leg_Details
(
	Leg_ID int unsigned NOT NULL AUTO_INCREMENT,
	Reservation_ID int unsigned NOT NULL,
	Initial_Flight_ID int unsigned NOT NULL,
	Flight_Leg_ID int unsigned,
	Stop_Number int unsigned,
	PRIMARY KEY (Leg_ID)
);


CREATE TABLE Reservation_Details
(
	Reservation_ID int unsigned NOT NULL AUTO_INCREMENT,
	User_ID int unsigned NOT NULL,
	SubmittedDate datetime NOT NULL,
	IsReserved boolean NOT NULL,
	Reservation_Price decimal(10,4) unsigned NOT NULL,
	PRIMARY KEY (Reservation_ID)
);

/* Create Foreign Keys */

ALTER TABLE Leg_Details
	ADD FOREIGN KEY (Initial_Flight_ID)
	REFERENCES Flight_Details (Flight_ID)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE Leg_Details
	ADD FOREIGN KEY (Flight_Leg_ID)
	REFERENCES Flight_Details (Flight_ID)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE Leg_Details
	ADD FOREIGN KEY (Reservation_ID)
	REFERENCES Reservation_Details (Reservation_ID)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE Reservation_Details
	ADD FOREIGN KEY (User_ID)
	REFERENCES  user_details (user_id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;




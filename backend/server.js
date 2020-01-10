var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const queries = require('./queries'); 
const cors = require('cors');

const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.get('/appointments', queries.getApts); 
app.post('/appointments', queries.addApt); 
app.put('/appointments/:id', queries.editApt); 
app.delete('/appointments/:id', queries.removeApt); 

// set port
app.listen(port, function () {
    console.log(`Node app is running on port ${port}`);
});
 
module.exports = app;


/*

CREATE TABLE IF NOT EXISTS appointments (
	petName text, 
	petOwner text, 
	aptDate varchar (30) default TO_CHAR(current_timestamp, 'yyyy-mm-dd hh:mi:ss AM') , 
	aptNotes text,
	id SERIAL PRIMARY KEY
);

DELETE FROM appointments;
 
INSERT INTO appointments (petName, petOwner, aptDate, aptNotes) 
VALUES (
	'Spot',
	'Constance Smith',
	'2017-07-24 08:30 pm',
	'This German Shepherd is having some back pain'
),
(
	'Goldie',
	'Barot Bellingham',
	'2017-07-22 3:50 pm',
	'This Goldfish has some weird spots in the belly'
),
(
	'Mitten',
	'Hillary Goldwyn',
	'2017-07-21 9:15 pm',
	'Cat has excessive hairballs'
),
(
	'Buffy',
	'Hassum Harrod',
	'2017-07-20 3:30 pm',
	'This Chihuahua has not eaten for three days and is lethargic'
);

SELECT * FROM appointments;

*/
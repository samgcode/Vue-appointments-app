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
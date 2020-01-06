var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const queries = require('./queries'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

 
// Retrieve all users 
app.get('/users', queries.getUsers);

// Retrieve user with id 
app.get('/user/:id', queries.getUser);
 
// Add a new user  
app.post('/user', queries.addUser);
 
//  Update user with id
app.put('/user', queries.editUser);
 
//  Delete user
app.delete('/user/:id', queries.removeUser);
 
// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;
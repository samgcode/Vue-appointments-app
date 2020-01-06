const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'my_database',
    port: 54320,
});

const getApts = (req, res) => {
    pool.query('SELECT * FROM appointments', (err, results) => {
        if(err) {
            throw err;
        }
        res.status(200).json(results.rows);
    });
}

module.exports = {
    getApts,
};
















































// var mysql = require('mysql');

// // connection configurations
// var dbConn = mysql.createConnection({
//     host: 'localhost',
//     user: 'node_user',
//     password: 'l3tm31n',
//     database: 'testdb'
// });
  
// // connect to database
// dbConn.connect(); 

// const getUsers = (req, res) => {
//     dbConn.query('SELECT * FROM users', function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'users list.' });
//     });
// };

// const getUser = (req, res) => {
  
//     let user_id = req.params.id;
  
//     if (!user_id) {
//         return res.status(400).send({ error: true, message: 'Please provide user_id' });
//     }
  
//     dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results[0], message: 'users list.' });
//     });
  
// };

// const addUser = (req, res) => {
  
//     let user = req.body.user;
  
//     if (!user) {
//         return res.status(400).send({ error:true, message: 'Please provide user' });
//     }
  
//     dbConn.query("INSERT INTO users SET ? ", { user: user }, function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
//     });
// };

// const editUser = (req, res) => {
  
//     let user_id = req.body.user_id;
//     let user = req.body.user;
  
//     if (!user_id || !user) {
//         return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
//     }
  
//     dbConn.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
//     });
// };

// const removeUser = (req, res) => {
  
//     let user_id = req.body.user_id;
  
//     if (!user_id) {
//         return res.status(400).send({ error: true, message: 'Please provide user_id' });
//     }
//     dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
//     });
// }; 

// module.exports = {
//     getUsers,
//     getUser,
//     addUser,
//     editUser,
//     removeUser,
// };
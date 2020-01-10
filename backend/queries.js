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
        for(var i = 0; i < results.rows.length; i++) {
            results.rows[i] = domainAppointment(results.rows[i]);
        }
        res.status(200).json(results.rows);
    });
}

const domainAppointment = (row) => {
    return {
        petName: row.petname,
        petOwner: row.petowner,
        aptDate: row.aptdate,
        aptNotes: row.aptnotes,
        id: row.id
    }
}

const addApt = (req, res) => {
    const { petName, petOwner, aptDate, aptNotes } = req.body;
  
    pool.query('INSERT INTO appointments (petName, petOwner, aptDate, aptNotes) VALUES ($1, $2, $3, $4)',
    [petName, petOwner, aptDate, aptNotes],
    (error, results) => {
      if(error) {
        throw error;
      }
      res.status(201).send(`Appointment added for: ${petName}`);
    });
}

const editApt = (req, res) => {
    const id = req.params.id;
    const { petName, petOwner, aptDate, aptNotes } = req.body;

    pool.query('UPDATE appointments SET petName = $1, petOwner = $2, aptDate = $3, aptNotes = $4 WHERE id = $5',
    [petName, petOwner, aptDate, aptNotes, id],
    (error) => {
        if(error) {
            throw error;
        }
        res.status(200).send(`Appointment updated with id: ${id}`);
    });
}


const removeApt = (req, res) => {
    const id = req.params.id;

    pool.query('DELETE FROM appointments WHERE id = $1', [id],
    (error, results) => {
        if(error) {
            throw error;
        }
        res.status(200).send(`Appointment removed with id: ${id}`);
    });
}

module.exports = {
    getApts,
    addApt,
    editApt,
    removeApt,
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
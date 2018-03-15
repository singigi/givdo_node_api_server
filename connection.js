var mysql = require('mysql');

var db_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'password',
    database: 'givdo'
});

db_connection.connect(function(err) {
   if (err) throw err
   console.log('Connected to Givdo database.')
})

module.exports = db_connection;

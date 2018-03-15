var express = require('express');
//var methodOverride = require('method-override');
var connection = require('./connection');
var bodyParser = require('body-parser');
var morganLogger = require ('morgan');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morganLogger('dev'));
//app.use(methodOverride);
app.use(cors());

/*app.get('/users', function(req, res){
    var sql = 'SELECT * FROM users';
    connection.query(sql, function(err, rows){
       if(err){
           res.json({"Error": true, "Message":"Sql error"});
       }else{
           res.json({"Error": false, "Message": "Success", "Users" : rows});
       }
    });
})*/

app.get('/users', function (req, res) {
    var sql = 'SELECT * FROM users';
    connection.query(sql, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });


// Create local development server and listen on port 3000
var server = app.listen(3000,  "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Givdo server listening at http://%s:%s", host, port)
  
  });


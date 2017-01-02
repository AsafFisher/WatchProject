var express = require('express');
var mysql = require("mysql");
var router = express.Router();




/* GET home page . */
router.get('/', function(req, res, next) {
  updateInitStatus(res);
});
router.post('/send',function (req,res,next) {
  console.log(req.body.Status);
  setStatus(res,req)


});
router.post('/getstatus', function(req, res, next) {
    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "test_database"
  });
  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
  con.query('select * from test_table where  id=(select max(id) from test_table);', function (err, rows) {
        if (err) {
          console.log(err);
          return;
        }//rows[0].isOn
        res.send(JSON.stringify({"success": rows[0].isOn, "status":200}));
	});
	con.end(function(err) {
      // The connection is terminated gracefully
      // Ensures all previously enqueued queries are still
      // before sending a COM_QUIT packet to the MySQL server.
    });
   });
});


function updateInitStatus(res){
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "test_database"
  });


  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
      con.query('select * from test_table where  id=(select max(id) from test_table);', function (err, rows) {
        if (err) {
          console.log(err);
          return;
        }
        var lstatus = 0;
        if(rows[0].isOn==0)
          res.render('index', { title: 'Express', status: "off" });
        if(rows[0].isOn==1)
          res.render('index', { title: 'Express', status: "on" });
      });
    con.end(function(err) {
      // The connection is terminated gracefully
      // Ensures all previously enqueued queries are still
      // before sending a COM_QUIT packet to the MySQL server.
    });


  });
}
function setStatus(res,req){
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "test_database"
  });


  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established '+req.body.Status);
    con.query('insert into test_table (isOn)values('+req.body.Status+');', function (err, rows) {
      if (err) {
        console.log(err);
        return;
      }
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123456789",
        database: "test_database"
      });
      con.query('select * from test_table where  id=(select max(id) from test_table);', function (err, rows) {
        if (err) {
          console.log(err);
          return;
        }
        res.send(JSON.stringify({"success": rows[0].isOn, "status": 200}));

      });
    });
    con.end(function(err) {
      // The connection is terminated gracefully
      // Ensures all previously enqueued queries are still
      // before sending a COM_QUIT packet to the MySQL server.
    });


  });
}
module.exports = router;

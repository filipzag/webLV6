var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path');
const session = require('express-session');
var async = require('async');


/* GET home page. */
router.get('/', function(req, res,next) {
  
  

 
 res.render(path.join(__dirname + '/../views/index'),{});



});

//////////////////////////////////////// PRIKAŽI SVE PROJEKTE////////////////////////

router.get('/showProjects', function(req, res,next) {
  



    var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'LV6'
});

 connection.connect();

 var sql = `SELECT * FROM projects`;
connection.query(sql, function (err, data) {
    if (err) {
        res.send( 'some error occured');
    } else {
       res.render('projects',{data:data});
    }
});

});

//////////////////////////////////////////////// UPRAVLJANJE PROJEKTIMA/////////////////////////////////////////////////////////

router.post('/handleProjects', function(req, res,next) {
  

var id = req.body.id;
var action = req.body.action;

    var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'LV6'
});

 connection.connect();

 

if(action == 'Uredi'){

var sql = `SELECT * FROM projects WHERE ID = ?`;
connection.query(sql,[id], function (err, data) {
    if (err) {
        res.send( 'some error occured');
    } else {
   
      res.render('edit',{data:data});
    }
});






}else if(action == 'Obriši'){


var sql = `DELETE FROM projects WHERE ID = ?`;
connection.query(sql,[id], function (err, data) {
    if (err) {
        res.send( 'some error occured');
    } else {
   
      res.send('Deleted from database');
    }
});



}













});

///////////////////////////////// UPDATE projekta/////////////////////////////////////////

router.post('/updateProject', function(req, res,next) {
  var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'LV6'
});
   var id = req.body.id;
   var naziv = req.body.naziv;
   var opis = req.body.opis;
   var cijena = req.body.cijena;
   var poslovi = req.body.poslovi;
   var start = req.body.pocetak;
   var end = req.body.kraj;


connection.connect();

var sql = `UPDATE projects 
            SET
               naziv=?, opis=?, cijena=?, obavljeno=?, start_date=?, end_date=?
            
            WHERE id=?`;
connection.query(sql, [naziv, opis, cijena, poslovi, start , end,id], function (err, data) {
    if (err) {
        res.send( 'some error occured');
    } else {
       res.send('successfully inserted into db');
    }
});

});





/////////////////////////////////////////////// UNESI PROJEKT U BAZU /////////////////////////////////////
router.post('/insertProject', function(req, res,next) {
	var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'LV6',
  multipleStatements: true
});
  
   var naziv = req.body.naziv;
   var opis = req.body.opis;
   var cijena = req.body.cijena;
   var poslovi = req.body.poslovi;
   var start = req.body.pocetak;
   var end = req.body.kraj;
   var sess=req.session;
   var loggedinEmail=req.session.email;
  var loggedinId;

connection.connect();






var sql1 = `SELECT * FROM users WHERE email = ?`;
connection.query(sql1, [loggedinEmail], function (err, data) {
    if (err) {
        res.send( 'some error occured in first query');
    } else{
  
      loggedinId=data[0].id;

 console.log(loggedinId);
    }
});

function insert(){
var sql2 = "INSERT INTO `projects`(`id`, `naziv`, `opis`, `cijena`, `obavljeno`, `start_date`, `end_date`, `voditelj_id`,`arhiviran`) VALUES (?,?,?,?,?,?,?,?,?)";
console.log(loggedinId);

var inserts =  ['',naziv, opis, cijena, poslovi, start , end, loggedinId, 0];
sql2 = mysql.format(sql2, inserts);
console.log(sql2);
connection.query(sql2, function (err, data) {
    if (err) {
        res.send( 'ERROR WITH DATABASE!');
        console.log( ['',naziv, opis, cijena, poslovi, start , end, loggedinId]);

         console.log(err.code); // 'ECONNREFUSED'
  console.log(err); // true
    } else {
       res.send('successfully inserted into db');
    }
});





}


setTimeout(insert, 2500);


 

  


});





















module.exports = router;

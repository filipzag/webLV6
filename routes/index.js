var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path');


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
  database: 'LV6'
});
  
   var naziv = req.body.naziv;
   var opis = req.body.opis;
   var cijena = req.body.cijena;
   var poslovi = req.body.poslovi;
   var start = req.body.pocetak;
   var end = req.body.kraj;


connection.connect();

var sql = `INSERT INTO projects 
            (
               id, naziv, opis, cijena, obavljeno, start_date, end_date
            )
            VALUES
            (
                ?,?, ?, ?, ?, ?, ?
            )`;
connection.query(sql, ['',naziv, opis, cijena, poslovi, start , end], function (err, data) {
    if (err) {
        res.send( 'some error occured');
    } else {
       res.send('  successfully inserted into db');
    }
});

});





















module.exports = router;

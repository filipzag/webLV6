var express = require('express');
var router = express.Router();
var path = require('path');
const bcrypt = require('bcrypt');
var mysql = require('mysql');
const session = require('express-session');

/* GET users listing. */
router.get('/userRegister', function(req, res, next) {
  res.render(path.join(__dirname + '/../views/register'),{});
});


router.post('/registerUserHandle', function(req, res,next) {

	var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'LV6'
});
  
   var email = req.body.email;
   var password = req.body.password;
   var hashed;
   var sess=req.session;


if(sess.email == null){
connection.connect();
sess.email=email;
var sql = `INSERT INTO users 
            (
               id, email, password
            )
            VALUES
            (
                ?,?, ?
            )`;


bcrypt.hash(password, 10, function(err, hash) {
connection.query(sql, ['',email, hash], function (err, data) {






    if (err) {
        res.send( 'some error occured');
    } else {
    	sess.email=email;

       res.render('choice');

    }
});

});
}else {

	res.render('choice');
}


});

//////////////////////////////////////////7
router.get('/viewMyprojects', function(req, res, next) {



	var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'LV6',
    multipleStatements: true
											});
  
  
   var sess=req.session;


	if(sess.email == null){

 		 res.render(path.join(__dirname + '/../views/login'),{});

	}else{


					connection.connect();


					var sql1 = `SELECT id FROM users 
					WHERE
					email=?`;



					connection.query(sql, [sess.email], function (err, data) {


					if (err) {

					   res.send( 'Some error occured');

					} else {


										var sql2 = `SELECT * FROM projects WHERE id=?`;

										connection.query(sql,data[0].id,function (err, data2) {

											 if (err) {

													 res.send( 'some error occured');

											} else {

													 res.render('projects',{data2:data});
												}
																




																                 				});
							}


			}

		
       

    }
});









 


///////////////////////////////////////////////////////////////////////////////////
router.get('/login', function(req, res, next) {

sess=req.session;

if(sess.email==null){
  res.render(path.join(__dirname + '/../views/login'),{});
}else{

	res.render('choice');
}
});

////////////////////////////////////////////////////////////////////////

router.post('/loginUserHandle', function(req, res,next) {

	var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'LV6',

});
  
   var email = req.body.email;
   var password = req.body.password;
   var hashed;
   var sess=req.session;


if(sess.email == null){
connection.connect();


var sql = `SELECT password FROM users 
           WHERE
            email=?`;



connection.query(sql, [email], function (err, data) {






    if (err) {
        res.send( 'Some error occured');
    } else {
    	
    	bcrypt.compare(password, data[0].password).then(function(result) {


    if(result){

		sess.email=email;

    	res.render('choice');


}else{



	res.send('Wrong password!');
}
});
       

    }
});


}else {

	res.render('choice');
}


});





module.exports = router;

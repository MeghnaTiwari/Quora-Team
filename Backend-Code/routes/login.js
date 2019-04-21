//Signup.js - Signup route module
var express = require('express');
var router = express.Router();

//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
const secret = "secret";


//Kafka
var kafka = require('../kafka/client');

var logincheck = [
    {"finalstatus" : false, "facultyfnd" : false, "pwdvalidity" : false}
  ]

//Route to handle Post Request Call
router.post('/',function(req,res){


    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);


  kafka.make_request('login', req.body, function(err, result){
    
    console.log('In results Signup');
    console.log('Results: ', result);
    

    if(result){ 
        logincheck.filter(function(user){
            user.pwdvalidity = true;
            user.finalstatus = true;
         })           
        console.log("Logged in successfully.");
        console.log(result);
        req.session.user = true;

            // Create token if the password matched and no error was thrown
            // this token verified against each and every call user make 

            var token = jwt.sign({sjsuid:result.sjsuid}, secret, {
              expiresIn: 10080 // in seconds
          });
          console.log(token);


          var Result = {
            logincheck : logincheck,
            Token : token
        }
          
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });
        console.log(JSON.stringify(Result));
        res.end(JSON.stringify(Result));
       // res.end('logging in successful!');
    }
    else if(result == null){
        console.log("Login issue.");
        res.writeHead(210, {
            'Content-type': 'text/plain'
        });
        res.end('Dupplicate user!');
    }

    if(err){
        console.log("Unable to fetch user details. Error in Signup.", err);
        res.writeHead(400, {
            'Content-type': 'text/plain'
        });
        res.end('Error in fetching user details!');            
    }
  });
});

module.exports = router;
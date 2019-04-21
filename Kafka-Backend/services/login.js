var Model = require('../DataBaseConnection');
var bcrypt = require('bcrypt-nodejs');
var mongooseTypes = require('mongoose').Types;
var mysql = require('mysql'); 


var logincheck = [
    {"finalstatus" : false, "facultyfnd" : false, "pwdvalidity" : false}
  ]

function handle_request(message, callback){
    console.log('Inside Kafka Backend Login/SignIn');
    console.log('Message: ', message);

        //Mysql database connection
        var connection = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "GHE@ta91",
          database : "Luckycmpe273"
        });

// this process will avoid SQL injection attack
let sql = "SELECT emaild,password FROM userDetails WHERE emailid = ?";

connection.query(sql,message.emailid, function (error, results, fields) {
  
  if (error){
    console.log(error);
  }
  else{
    if (!bcrypt.compareSync(message.password, user.password)) {                
      console.log('Invalid Credentials!');
      //res.end(JSON.stringify(logincheck));     
      callback(null, null);           
  }
  else{
      console.log("Valid Credentials");
      callback(null, user);
     }
    }
  }); 
}

exports.handle_request = handle_request;
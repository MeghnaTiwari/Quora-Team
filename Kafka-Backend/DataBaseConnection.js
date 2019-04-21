const mongoose = require('mongoose');
var Schema = mongoose.Schema;//issue coming
//const db = require('db');
//var mongo = require('mongodb');
//const MongoClient = require('mongodb').MongoClient

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/HomeAway');

//mongoose.connect('mongodb://localhost:27017/Canvas');
//mongodb+srv://canvas:canvas@cluster0-llr4m.mongodb.net/test?retryWrites=true
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-llr4m.mongodb.net/Canvas?retryWrites=true');

//mongoose.connect('mongodb+srv://cluster0-vpjpa.mongodb.net/Canvas');



// todo workaround for HMR. It remove old model before added new ones
Object.keys(mongoose.connection.models).forEach(key => {
    delete mongoose.connection.models[key];
  });
  mongoose.Promise = global.Promise;
  
  //mongoose.connect('mongodb+srv://Lucky:Lucky@canvaslucky-llr4m.mongodb.net/test?retryWrites=true');


var userDetails = mongoose.model('userDetails', {

_id: mongoose.Schema.Types.ObjectId,

firstName:{type:String},
lastName:{type:String},
email:{type:String},
city:{type:String},
state:{type:String},
zipCode:{type:Number},
ProfileImage:{typw:String},
status:{type:Boolean},
    
});

var credentials = mongoose.model('credentials', {

    education : [
    {
        school : { type: String }, 
        concentration : { type: String }, 
        degree : { type: String }, 
        year : { type: String },    
    }
    ],
    employment : [
        {
            position : { type: String }, 
            company : { type: String }, 
            startYear : { type: String }, 
            endYear : { type: String },    
      }
    ],
    topics : [{
        type: String
    }],

    userDetails: [{ user: { type: Schema.Types.ObjectId, ref: "userDetails" } }],

});


module.exports = {
    userDetails,
    credentials
};


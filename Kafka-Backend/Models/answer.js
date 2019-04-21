const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var credentquestionials = new Schema ({

    _id: mongoose.Schema.Types.ObjectId,

    answer: {userid:{ type: Schema.Types.ObjectId, ref: "userDetails" }},
    answerOwner:{type:String},
    isAnnonymous:{type:Boolean},
    upVote:[{ user: { type: Schema.Types.ObjectId, ref: "userDetails" } }],
    downVote:[{ user: { type: Schema.Types.ObjectId, ref: "userDetails" } }],
    comment:[{userid:{ type: Schema.Types.ObjectId, ref: "userDetails" } , comment:{type:String}}],
    answerDate: {type:Date}
        
    });

    module.exports = mongoose.model("question",question);
 const mongoose = require('mongoose');
 const user = require('./users')

 const Schema = mongoose.Schema;

 const MessageSchema = new Schema({
     message:{
         type:String[{}],
         trim:true,
         required:true
     },
     messageFrom:{
        type: user._id,
        trim:true,
        required:true
     },
     messageTo:{
         type:user._id,
         trim:true,
         required:true
     }
 });

 module.exports = mongoose.model('Messages',MessageSchema);
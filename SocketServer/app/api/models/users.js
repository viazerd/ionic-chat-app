const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Defining the Schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    last_login:{
        type:Date,
    },
    status:{
        type:Boolean 
    }
});

//Hashing user password before pushing into database

UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
    });

module.exports = mongoose.model('User',UserSchema);
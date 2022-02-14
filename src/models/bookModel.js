const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    book_id:{
        type:String,
        require : true,
        unique:true
    },


    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
module.exports = mongoose.model("book", bookSchema);
bookSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});


const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
      type: String,
      index : true, 
      required: true,
      unique: true,
    },
    id: {
        type: String,
        index : true, 
        required: true,
        unique: true,
    }, 
    password:{
      type: String,
      validate : [

        function(password) {
        
        return password.length >= 4;
        
        },
        
        'Password should be longer'
      ]
    },
});

module.exports = mongoose.model('User', userSchema);
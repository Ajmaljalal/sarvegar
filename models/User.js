const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema({
    googleId: String,
    credits: {
        type: Number,
        default: 0
    },
    name: String,
    email: String, 
    imageURL: String  
});


mongoose.model('user', userSchema);

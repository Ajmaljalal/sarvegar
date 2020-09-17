const mongoose = require('mongoose');
const{ Schema } = mongoose;

const recipietSchema = new Schema({
    email: String,
    responded:{
        type: Boolean,
        default: false
    }
});

module.exports = recipietSchema;
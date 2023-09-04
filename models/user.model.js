const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

// CREATING MODEL
module.exports = mongoose.model('User', userSchema);
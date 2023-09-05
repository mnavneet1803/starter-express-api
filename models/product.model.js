const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    user_phone: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    deal: {
        type: String,
        enum : ['done','pending','close'],
        default: 'done'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

// CREATING MODEL
module.exports = mongoose.model('Product', productSchema);
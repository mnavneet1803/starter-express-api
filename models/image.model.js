const mongoose = require("mongoose");

const { Schema } = mongoose;

const imageSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

// CREATING MODEL
module.exports = mongoose.model('Image', imageSchema);
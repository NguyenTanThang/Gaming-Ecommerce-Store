const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImgURL: {
        type: String,
        required: true
    },
    productDescription: String,
    created_date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("products", schema);
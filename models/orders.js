const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    created_date: {
        type: Date,
        default: Date.now()
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    items: {
        type: Array,
        required: true,
    },
    total: {
        type: Number,
        required: true
    },
    payment_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("orders", schema);
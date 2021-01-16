const mongoose = require('mongoose');

const itemModel = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    purchase: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    collection: "items",
    timestamps: true
});

module.exports = mongoose.model("Item", itemModel);

const mongoose = require('mongoose');

const purchaseModel = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    items: {
        type: [mongoose.Schema.Types.ObjectId],
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, {
    collection: "purchases",
    timestamps: true
});

module.exports = mongoose.model("Purchase", purchaseModel);

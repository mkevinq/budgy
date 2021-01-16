const mongoose = require('mongoose');

const purchaseModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: String
    }
}, {
    collection: "purchases",
    timestamps: true
});

module.exports = mongoose.model("Purchase", purchaseModel);

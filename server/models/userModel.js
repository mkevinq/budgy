const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
}, {
    collection: "users",
    timestamps: true
});

module.exports = mongoose.Model('User', userSchema);

const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true,
}

const item = mongoose.Schema({
    _id: requiredString,
    name: requiredString,
    type: requiredString,
    dropsAt: {
        type: Array,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    category: String,
    stats: Object,
})

module.exports = mongoose.model('items', item)
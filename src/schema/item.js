import { Schema } from 'mongoose';

const requiredString = {
    type: String,
    required: true,
};

const item = new Schema({
    name: requiredString,
    type: requiredString,
    dropsAt: {
        type: Array,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    category: String,
    stats: Object,
});

module.exports = mongoose.model('items', item);

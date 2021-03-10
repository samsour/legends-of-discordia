import mongoose from 'mongoose';

const requiredString = {
    type: String,
    required: true,
};

// eslint-disable-next-line new-cap
const itemSchema = mongoose.Schema({
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

/**
 * @type mongoose.Model
 */
export default mongoose.model('items', itemSchema);

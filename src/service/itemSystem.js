const mongo = require('./mongo');
const itemSchema = require('./schemas/item');

module.exports = (client) => { };

module.exports.addItem = async (type, name, value, dropsAt) => {
    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running findOneAndUpdate()');

            const result = await itemSchema.findOneAndUpdate(
                {
                    name,
                },
                {
                    _id: Math.random(),
                    name,
                    type,
                    dropsAt,
                    value,
                },
                {
                    upsert: true,
                    new: true,
                },
            );

            return result.name;
        } finally {
            mongoose.connection.close();
        }
    });
};

module.exports.getAllItems = async (type) => {
    return await mongo().then(async (mongoose) => {
        try {
            const items = await itemSchema.find({ type });
            return items.map((item) => item.name);
        } finally {
            mongoose.connection.close();
        }
    });
};

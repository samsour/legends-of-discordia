const mongoose = require('mongoose');
const { mongoPath, mongoDbName, mongoUser, mongoPassword } = require('./config.json');

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: mongoDbName,
        user: mongoUser,
        pass: mongoPassword
    });
    return mongoose;
} 
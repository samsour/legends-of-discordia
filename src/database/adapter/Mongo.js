import mongoose from 'mongoose';

export default async () => {
    try {
        await mongoose.connect(process.env.MONGO_PATH, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.MONGO_DB_NAME,
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASSWORD,
        });
    } catch (error) {
        console.log('1621847075 MongoDB connection error:');
        console.error(error);
    }
    return mongoose;
};

import mongoose from 'mongoose';

export default async () => {
    await mongoose.connect(process.env.MONGO_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.MONGO_DB_NAME,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASSWORD,
    });
    return mongoose;
};

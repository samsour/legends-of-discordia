import mongoose from 'mongoose';
import * as Sentry from '@sentry/node';

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
        Sentry.captureException(error);
    }
    return mongoose;
};

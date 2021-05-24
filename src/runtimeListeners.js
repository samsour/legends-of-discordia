import mongoose from 'mongoose';
import * as Sentry from '@sentry/node';
import DatabaseConnectionFactory from './factory/DatabaseConnectionFactory.js';

export const listen = () => {
    process.on('SIGINT', () => {
        if (process.env.ENVIRONMENT === 'production') {
            Sentry.captureMessage('1621850311 node process exited via: SIGINT');
        }

        DatabaseConnectionFactory.shutDown().then(() => {
            process.exit(0);
        });
    });

    process.on('exit', () => {
        if (process.env.ENVIRONMENT === 'production') {
            Sentry.captureMessage('1621850660 node process exited via: exit');
        }
        DatabaseConnectionFactory.shutDown().then(() => {
            process.exit(0);
        });
    });

    process.on('uncaughtException', (error) => {
        Sentry.captureException(error);
    });

    process.on('unhandledRejection', (event) => {
        Sentry.captureEvent(event);
    });

    mongoose.connection.on('error', (error) => {
        Sentry.captureException(error);
    });
}

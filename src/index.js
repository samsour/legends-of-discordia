import dotenv from 'dotenv';
import DiscordClient from './client/Client.js';
import DatabaseConnectionFactory from './factory/DatabaseConnectionFactory.js';
import { listen } from './runtimeListeners.js';
import * as Sentry from '@sentry/node';

// read .env vars into 'process.env'
dotenv.config();


// initialize sentry logging
Sentry.init({
    dsn: `https://${process.env.SENTRY_KEY}@${process.env.SENTRY_ACCOUNT_ID}.ingest.sentry.io/5780113`,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});


// listen to runtime events
listen();


// setup database connection
DatabaseConnectionFactory.connect()
    .catch((error) => {
        Sentry.captureEvent(error);
    });


try {
    // setup application
    const discordClient = new DiscordClient();

    discordClient.login(process.env.TOKEN);
} catch (error) {
    Sentry.captureException(error);
}

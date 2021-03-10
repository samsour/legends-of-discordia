import DiscordClient from './client.js';
import CommandRegistry from './command/registry.js';
import dotenv from 'dotenv';
import DatabaseConnectionFactory from './database/databaseConnectionFactory.js';

// read .env vars into 'process.env'
dotenv.config();

// setup database connection
DatabaseConnectionFactory.connect();

// setup application
new CommandRegistry();
const discordClient = new DiscordClient();

discordClient.login(process.env.TOKEN);

// If the Node process ends, close the Database connection
process.on('SIGINT', () => {
    DatabaseConnectionFactory.shutDown().then( () => {
        console.log('Database disconnected on app termination');
        process.exit(0);
    });
});

import dotenv from 'dotenv';
import DiscordClient from './client/Client.js';
import DatabaseConnectionFactory from './factory/DatabaseConnectionFactory.js';

// read .env vars into 'process.env'
dotenv.config();

// setup database connection
DatabaseConnectionFactory.connect()
    .catch(() => {
        process.exit(1);
    });


// setup application
const discordClient = new DiscordClient();

discordClient.login(process.env.TOKEN);

// If the Node process ends, close the Database connection
process.on('SIGINT', () => {
    DatabaseConnectionFactory.shutDown().then( () => {
        console.log('Database disconnected on app termination');
        process.exit(0);
    });
});

process.on('unhandledRejection', error => {
    console.log('1621519081 Unhandled rejection error:', error);
});

// TODO:
mongoose.connection.on('error',(error)=>{
    if (count >= 5){
        console.log('Mongo ERROR');
        console.error(error);
        process.exit(1);
    }
    else{
        setTimeout(handleDisconnect,1000);
    }
});

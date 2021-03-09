import mongodb from './adapter/mongo.js';

export default class DatabaseFactory {
    static connection;

    static async connect() {
        if (DatabaseFactory.connection === undefined) {
            DatabaseFactory.connection = await mongodb();
        }
        return DatabaseFactory.connection;
    }

    static async shutDown() {
        if (DatabaseFactory.connection === undefined) {
            return Promise.resolve();
        }
        return DatabaseFactory.connection.connection.close();
    }
}

import mongodb from './adapter/mongo.js';

export default class DatabaseFactory {
    /**
     * @type {Mongoose|undefined}
     */
    static connection = undefined

    /**
     * @return {Promise<Mongoose>}
     */
    static async connect() {
        if (DatabaseFactory.connection === undefined) {
            DatabaseFactory.connection = await mongodb();
        }
        return DatabaseFactory.connection;
    }

    /**
     * @return {Promise<void>}
     */
    static async shutDown() {
        if (DatabaseFactory.connection === undefined) {
            return Promise.resolve();
        }
        return DatabaseFactory.connection.connection.close();
    }
}

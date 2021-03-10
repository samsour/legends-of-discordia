import mongodb from './../database/adapter/Mongo.js';

export default class DatabaseConnectionFactory {
    /**
     * @type {Mongoose|undefined}
     */
    static connection = undefined

    /**
     * @return {Promise<Mongoose>}
     */
    static async connect() {
        if (DatabaseConnectionFactory.connection === undefined) {
            DatabaseConnectionFactory.connection = await mongodb();
        }
        return DatabaseConnectionFactory.connection;
    }

    /**
     * @return {Promise<void>}
     */
    static async shutDown() {
        if (DatabaseConnectionFactory.connection === undefined) {
            return Promise.resolve();
        }
        return DatabaseConnectionFactory.connection.connection.close();
    }
}

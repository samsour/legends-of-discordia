import { expect } from '@jest/globals';
import DatabaseConnectionFactory from '../../../src/factory/DatabaseConnectionFactory.js';
import ItemFactory from '../../../src/factory/ItemFactory.js';
import mongoose from 'mongoose';

describe('ItemFactory', () => {
    beforeEach(async () => {
        await DatabaseConnectionFactory.connect();
    });

    afterEach(async () => {
        mongoose.connection.db.dropDatabase()
            .catch(() => {
                process.exit(1);
            });
    });

    test('.create() creates Item', async () => {
        const item = await ItemFactory.create(
            'weapon', 'Eisernes Großschwer', 123, 'Weirdzard Forest', 'my category',
            { range: 1, speed: 0.5, dmg: 32 },
        );

        expect(item.id).toBeDefined();
        expect(item.name).toEqual('Eisernes Großschwer 123');
    });

    test('.create() creates second Item', async () => {
        const item = await ItemFactory.create(
            'weapon', 'MeepMeep Zeep', 123, 'Gormlin Stones', 'my category',
            { range: 2, speed: 0.3, dmg: 13 },
        );

        expect(item.id).toBeDefined();
        expect(item.name).toEqual('MeepMeep Zeep 123');
    });
});

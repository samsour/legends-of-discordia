import { expect } from '@jest/globals';
import DatabaseConnectionFactory from '../../../src/factory/DatabaseConnectionFactory.js';
import ItemFactory from '../../../src/factory/ItemFactory.js';
import mongoose from 'mongoose';

describe('ItemFactory', () => {
    beforeAll(async () => {
        await DatabaseConnectionFactory.connect();
    });

    afterEach(async () => {
        await mongoose.connection.db.dropDatabase();
    });

    test('.create() creates Item', async () => {
        const item = await ItemFactory.create(
            'weapon', 'Eisernes Großschwer', 1234, ['goblins', 'ogars'], 'my category',
            { range: 1, speed: 0.5, dmg: 32 },
        );

        expect(item.id).toBeDefined();
        expect(item.type).toEqual('weapon');
        expect(item.name).toEqual('Eisernes Großschwer');
        expect(item.value).toEqual(1234);
        expect(Array.from(item.dropsAt)).toEqual(['goblins', 'ogars']);
        expect(item.category).toEqual('my category');
        expect(item.stats).toEqual({ range: 1, speed: 0.5, dmg: 32 });
    });
});

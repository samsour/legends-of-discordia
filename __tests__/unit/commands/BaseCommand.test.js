import { expect } from '@jest/globals';
import BaseCommand from '../../../src/commands/BaseCommand.js';
import NotImplementedError from '../../../src/error/NotImplementedError.js';

describe('BaseCommand', () => {
    test('.constructor() sets config object', () => {
        const baseCommand = new BaseCommand(['lorem', 'i'], {additional: 'options', lorem: 'ipsum'});

        expect(baseCommand.config).toEqual({
            'additional': 'options',
            'aliases': [
                'lorem',
                'i'
            ],
            'expectedArgs': '',
            'lorem': 'ipsum',
            'maxArgs': null,
            'minArgs': 0,
            'permissionError': 'You do not have permission to run this command.',
            'permissions': [],
            'requiredRoles': []
        });
    });

    test('.execute() throws NotImplementedException', () => {
        const baseCommand = new BaseCommand();
        expect(() => baseCommand.execute()).toThrowError(NotImplementedError);
    });
});

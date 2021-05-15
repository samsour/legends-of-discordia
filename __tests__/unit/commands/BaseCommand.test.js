import BaseCommand from '../../../src/commands/BaseCommand.js';
import NotImplementedError from '../../../src/error/NotImplementedError.js';


describe('BaseCommand', () => {
    test('.execute() throws NotImplementedException', () => {
        const baseCommand = new BaseCommand();
        expect(() => baseCommand.execute()).toThrowError(NotImplementedError);
    });
});

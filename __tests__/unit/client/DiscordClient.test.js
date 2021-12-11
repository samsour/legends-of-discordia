import { expect } from '@jest/globals';
import { jest } from '@jest/globals'
import { Message } from '../../__mocks__/Message';
import DiscordClient from './../../../src/client/DiscordClient.js';

describe('DiscordClient', () => {
    let client;

    beforeEach(() => {
        const ClientMock = jest.createMockFromModule('../../../node_modules/discord.js/src/client/Client.js');
        client = new DiscordClient(ClientMock);
    });

    test('.constructor() sets discord.js client listeners', () => {
        expect(client._client.on).toHaveBeenNthCalledWith(1, 'ready', expect.any(Function));
        expect(client._client.on).toHaveBeenNthCalledWith(2, 'message', expect.any(Function));
    });

    test('._handleMessage() early returns if incomming message does not start with COMMAND_PREFIX', () => {
        const message = new Message([], [], 'test with no prefix');

        client._handleMessage(message);

        expect(client._commandRegistry.getCommands).toHaveBeenCalledTimes(0);
    });

    test('._handleMessage() calls commandRegistry to fetch valid commands and calls command.execute() without extra arguments', () => {
        const message = new Message([], [], '!test');

        const command = {
            config: {
                aliases: ['test'],
                permissions: [],
                requiredRoles: ['USE_VAD'],
            },
            execute: jest.fn(),
        };

        client._commandRegistry.getCommands = jest.fn().mockReturnValueOnce(
            (new Map).set('test', command)
        );

        client._handleMessage(message);

        expect(client._commandRegistry.getCommands).toHaveBeenCalledTimes(1);
        expect(command.execute).toHaveBeenCalledTimes(1);
        expect(command.execute).toHaveBeenCalledWith(message, []);
    });

    test('._handleMessage() calls commandRegistry to fetch valid commands and calls command.execute() with params', () => {
        const message = new Message([], [], '!test with params');

        const command = {
            config: {
                aliases: ['test'],
                permissions: [],
                requiredRoles: ['USE_VAD'],
            },
            execute: jest.fn(),
        };

        client._commandRegistry.getCommands = jest.fn().mockReturnValueOnce(
            (new Map).set('test', command)
        );

        client._handleMessage(message);

        expect(client._commandRegistry.getCommands).toHaveBeenCalledTimes(1);
        expect(command.execute).toHaveBeenCalledTimes(1);
        expect(command.execute).toHaveBeenCalledWith(message, ['with', 'params']);
    });

    test('._handleMessage() calls commandRegistry to fetch valid commands and calls command.lorem() via alias with params', () => {
        const message = new Message([], [], '!t lorem with params');

        const command = {
            config: {
                aliases: ['test', 't'],
                permissions: [],
                requiredRoles: ['USE_VAD'],
            },
            lorem: jest.fn(),
        };

        client._commandRegistry.getCommands = jest.fn().mockReturnValueOnce(
            (new Map).set('t', command)
        );

        client._handleMessage(message);

        expect(client._commandRegistry.getCommands).toHaveBeenCalledTimes(1);
        expect(command.lorem).toHaveBeenCalledTimes(1);
        expect(command.lorem).toHaveBeenCalledWith(message, ['with', 'params']);
    });
});

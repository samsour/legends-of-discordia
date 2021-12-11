import CommandRegistry from '../../../src/client/CommandRegistry';
import { expect } from '@jest/globals';
import { Message } from '../../__mocks__/Message.js';

describe('CommandRegistry', () => {
    let registry;

    beforeEach(() => {
        registry = new CommandRegistry();
    });

    test('.readCommands() reads directory and builds Map with classes', async () => {
        await registry.readCommands();

        // add new commands here and increase expected size
        expect(registry._commands.has('Shop')).toEqual(true);
        expect(registry._commands.has('BaseCommand')).toEqual(false);
        expect(registry._commands.size).toEqual(1);
    });

    describe('.getCommands()', () => {
        test('returns empty Map with invalid command permission', () => {
            registry._commands = (new Map()).set('test', function() {
                return {
                    config: {
                        permissions: ['INVALID_LOREM_IPSUM'],
                    }
                };
            });

            let message = new Message();
            expect(registry.getCommands(message)).toEqual(new Map());
        });

        test('returns empty Map with valid command permission but nothing else set', () => {
            registry._commands = (new Map()).set('test', function() {
                return {
                    config: {
                        permissions: ['MANAGE_EMOJIS'],
                    }
                };
            });

            let message = new Message();
            expect(registry.getCommands(message)).toEqual(new Map());
        });

        test('returns Map containing test-command with sufficient guild roles', () => {
            registry._commands = (new Map()).set('test', function() {
                return {
                    config: {
                        aliases: ['test'],
                        permissions: [],
                        requiredRoles: ['MANAGE_EMOJIS'],
                    }
                };
            });

            let message = new Message([{ name: 'MANAGE_EMOJIS', id: 1}]);
            expect(registry.getCommands(message).has('test')).toEqual(true);
        });

        test('returns empty Map with insufficient guild roles and insufficient member roles', () => {
            registry._commands = (new Map()).set('test', function() {
                return {
                    config: {
                        aliases: ['test'],
                        permissions: [],
                        requiredRoles: ['USE_VAD'],
                    }
                };
            });

            let message = new Message([{ name: 'MANAGE_EMOJIS', id: 1}]);
            expect(registry.getCommands(message).has('test')).toEqual(false);
        });

        test('returns Map containing test-command with insufficient guild roles and sufficient member roles', () => {
            registry._commands = (new Map()).set('test', function() {
                return {
                    config: {
                        aliases: ['test'],
                        permissions: [],
                        requiredRoles: ['MANAGE_EMOJIS'],
                    }
                };
            });

            let message = new Message([], ['MANAGE_EMOJIS']);
            expect(registry.getCommands(message).has('test')).toEqual(true);
        });

        test('returns Map containing test-command with sufficient guild roles and sufficient member roles', () => {
            registry._commands = (new Map()).set('test', function() {
                return {
                    config: {
                        aliases: ['test'],
                        permissions: [],
                        requiredRoles: ['MANAGE_EMOJIS'],
                    }
                };
            });

            let message = new Message([{ name: 'MANAGE_EMOJIS', id: 1}], ['MANAGE_EMOJIS']);
            expect(registry.getCommands(message).has('test')).toEqual(true);
        });

        test('returns Map containing same command with all aliases as separate keys', () => {
            const command = {
                config: {
                    aliases: ['test', 't', 'te'],
                    permissions: [],
                    requiredRoles: ['MANAGE_EMOJIS'],
                }
            };

            registry._commands = (new Map()).set('test', function() {
                return command;
            });

            let message = new Message([{ name: 'MANAGE_EMOJIS', id: 1}], ['MANAGE_EMOJIS']);

            expect(registry.getCommands(message).get('test')).toEqual(command);
            expect(registry.getCommands(message).get('t')).toEqual(command);
            expect(registry.getCommands(message).get('te')).toEqual(command);
        });
    });

    describe('_validateCommandPermissionNames()', () => {
        test('default set of valid permissions', () => {
            // this is just so we notice if list of valid commands changes
            expect(registry._validPermissions).toEqual([
                'CREATE_INSTANT_INVITE',
                'KICK_MEMBERS',
                'BAN_MEMBERS',
                'ADMINISTRATOR',
                'MANAGE_CHANNELS',
                'MANAGE_GUILD',
                'ADD_REACTIONS',
                'VIEW_AUDIT_LOG',
                'PRIORITY_SPEAKER',
                'STREAM',
                'VIEW_CHANNEL',
                'SEND_MESSAGES',
                'SEND_TTS_MESSAGES',
                'MANAGE_MESSAGES',
                'EMBED_LINKS',
                'ATTACH_FILES',
                'READ_MESSAGE_HISTORY',
                'MENTION_EVERYONE',
                'USE_EXTERNAL_EMOJIS',
                'VIEW_GUILD_INSIGHTS',
                'CONNECT',
                'SPEAK',
                'MUTE_MEMBERS',
                'DEAFEN_MEMBERS',
                'MOVE_MEMBERS',
                'USE_VAD',
                'CHANGE_NICKNAME',
                'MANAGE_NICKNAMES',
                'MANAGE_ROLES',
                'MANAGE_WEBHOOKS',
                'MANAGE_EMOJIS',
            ]);
        });

        test('finds no invalid permission (single item)', () => {
            expect(registry._validateCommandPermissionNames(['CREATE_INSTANT_INVITE'])).toEqual(true);
        });

        test('finds no invalid permission (multiple items)', () => {
            expect(registry._validateCommandPermissionNames(['CREATE_INSTANT_INVITE', 'VIEW_GUILD_INSIGHTS', 'SPEAK', 'CHANGE_NICKNAME'])).toEqual(true);
        });

        test('finds invalid permission (no items)', () => {
            expect(registry._validateCommandPermissionNames([])).toEqual(true);
        });

        test('finds invalid permission (single items)', () => {
            expect(registry._validateCommandPermissionNames(['Invalid permission name'])).toEqual(false);
        });

        test('finds invalid permission (multiple items)', () => {
            expect(registry._validateCommandPermissionNames(['lorem ipsum', 'DOLOR_SIT', 'LOREM'])).toEqual(false);
        });

        test('finds invalid permission (in between list of valid ones)', () => {
            expect(registry._validateCommandPermissionNames(['ADMINISTRATOR', 'MANAGE_CHANNELS', 'DOLOR_SIT_AMET', 'VIEW_GUILD_INSIGHTS'])).toEqual(false);
        });
    });
});

import { eventEmitter, Event } from '../Event.js';
import fs from 'fs';
import path from 'path';
import Command from './Command.js';

export default class CommandRegistry {

	/**
	 * @type {Array[Command]}
	 */
	commands = [];

	/**
	 *
	 */
	constructor() {
		eventEmitter.on(Event.DISCORD.READY, () => {
			this.readCommands('../command');
		});
	}

	/**
	 * 
	 * @param {FileSystemDirectoryEntry|string} directory 
	 */
	readCommands(directory) {
		const __dirname = path.dirname(new URL(import.meta.url).pathname);
		const files = fs.readdirSync(path.join(__dirname, directory));

		for (const file of files) {
			const statsObject = fs.lstatSync(path.join(__dirname, directory, file));

			if (statsObject.isDirectory()) {
				readCommands(path.join(directory, file));
			} else if (file !== Command) {
				const command = import(path.join(__dirname, directory, file));
				// TODO: Create class instances of each command dynamically
				// this.commands.push(new this[command]());
			}
		}
	}
}

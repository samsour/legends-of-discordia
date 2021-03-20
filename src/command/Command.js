export default class Command {
	/**
	 * @type {Array<string>}
	 */
	constructor({client, ...options }) {
		this.config = {
			aliases,
			expectedArgs: '',
			permissionError: 'You do not have permission to run this command.',
			minArgs: 0,
			maxArgs: null,
			permissions: [],
			requiredRoles: [],
			...options
		}
	}
}

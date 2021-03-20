export default class Command {
	constructor({aliases, ...options }) {
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

	execute({args}) {
		console.log(`Command run: "${this.config.aliases[0]}" with ${args}`);
	}
}

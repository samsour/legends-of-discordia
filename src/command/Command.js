export default class Command {


	// TODO: Provide global variables for command config/options

	// commands = [];
	// minArgs = 0;
	// maxArgs = null;
	// expectedArgs = '';
	// requiredRoles = [];
	// permissions = [];
	// permissionError = 'You do not have permission to run this command.';

	constructor({client, ...options }) {
		this.config = {
			commands,
			expectedArgs: '',
			permissionError: 'You do not have permission to run this command.',
			minArgs: 0,
			maxArgs: null,
			permissions: [],
			requiredRoles: [],
			execute,
			...options
		}

		// Ensure the command and aliases are in an array
		if (typeof this.config.commands === 'string') {
			this.config.commands = [this.config.commands];
		}

		console.log(`Registering command "${this.config.commands[0]}"`);

		// Ensure the permissions are in an array and are all valid
		if (this.config.permissions.length) {
			if (typeof this.config.permissions === 'string') {
				this.config.permissions = [this.config.permissions];
			}

			_validatePermissions(this.config.permissions);
		}

		this.register(client)
	}

	execute() {
		console.log(`Executing function ${this.commands[0]}`);
	}

	register(client) {
		// Listen for messages
		
	}

	_validatePermissions(permissions) {
		for (const permission of permissions) {
			if (!this._validPermissions.includes(permission)) {
				throw new Error(`Unknown permission node "${permission}"`);
			}
		}
	};
}

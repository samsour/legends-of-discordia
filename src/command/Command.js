export default class Command {
	/**
	 * @type {Array<string>}
	 */
	_validPermissions = [
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
	]

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

	exectute() {
		console.log(`Executing function ${this.commands[0]}`);
	}

	register(client) {
		// Listen for messages
		client.on('message', (message) => {
			const { member, content, guild } = message;

			for (const alias of this.config.commands) {
				const command = `${prefix}${alias.toLowerCase()}`;

				if (
					content.toLowerCase().startsWith(`${command} `) ||
					content.toLowerCase() === command
				) {
					// A command has been ran

					// Ensure the user has the required permissions
					for (const permission of this.config.permissions) {
						if (!member.hasPermission(permission)) {
							message.reply(permissionError);
							return;
						}
					}

					// Ensure the user has the required roles
					for (const requiredRole of this.config.requiredRoles) {
						const role = guild.roles.cache.find(
							(role) => role.name === requiredRole,
						);

						if (!role || !member.roles.cache.has(role.id)) {
							message.reply(
								`You must have the "${requiredRole}" role to use this command.`,
							);
							return;
						}
					}

					// Split on any number of spaces
					const args = content.split(/[ ]+/);

					// Remove the command which is the first index
					args.shift();

					// Ensure we have the correct number of args
					if (
						args.length < this.config.minArgs ||
						(this.config.maxArgs !== null && args.length > this.config.maxArgs)
					) {
						message.reply(
							`Incorrect syntax! Use ${process.env.PREFIX}${alias} ${this.config.expectedArgs}`,
						);
						return;
					}

					// Handle the custom command code
					execute(message, args, args.join(' '), client);

					return;
				}
			}
		});
	}

	_validatePermissions(permissions) {
		for (const permission of permissions) {
			if (!this._validPermissions.includes(permission)) {
				throw new Error(`Unknown permission node "${permission}"`);
			}
		}
	};
}

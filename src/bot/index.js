const Discord = require('discord.js')
const path = require('path')
const { registerCmds } = require('register-cmd-discord')

const MessageController = require('./events/MessageController')

class Bot {
	constructor() {
		this.bot = new Discord.Client()

		this.start()
	}

	async start() {
		await this.login()
		this.registerCommands()
		this.registerEvents()
	}

	registerCommands() {
		const pathCommands = path.resolve(__dirname, 'commands');
		const { cmds, als } = registerCmds(
			pathCommands,
			new Discord.Collection(),
			new Discord.Collection()
		);

		this.bot.commands = cmds;
		this.bot.aliases = als;
	}

	registerEvents()  {
		new MessageController(this.bot)
	}

	async login() {
		await this.bot.login(process.env.TOKEN)
	}
}

module.exports = Bot
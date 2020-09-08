class Say {
	constructor() {
		this.config = {
			name: 'say',
			aliases: [],
			help:
				'Com esse comando você pode falar pelo meu nome.',
			requiredPermissions: ['MANAGE_MESSAGES'],
		};
		this.run = async ({ msg, args, prefix }) => {
			msg.reply('teste')
		};
	}
}

module.exports = new Say();

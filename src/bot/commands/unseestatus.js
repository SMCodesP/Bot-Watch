const db = require('quick.db');

class UnseeStatus {
	constructor() {
		this.config = {
			name: 'unseestatus',
			aliases: [],
			help:
				'Com esse comando você pode remover um usuário de alerta da sua lista de alert status, com isso você não receberá mais avisos quando usuário ficar online',
			requiredPermissions: ['MANAGE_MESSAGES'],
		};
		this.run = async ({ msg, args, prefix }) => {

			if (args.length === 0) {
				return msg.reply(`você deve mencionar um usuário válido, por favor utilize o comando dessa forma » \`${prefix}${this.config.name} {@member/user_id}\`\n\n${prefix}${this.config.name} ${msg.author}\n${prefix}${this.config.name} ${msg.author.id}`)
			}

			const mentionMember =
				msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);

			if (!mentionMember) {
				return msg.reply(`você deve mencionar um usuário válido, por favor utilize o comando dessa forma » \`${prefix}${this.config.name} {@member/user_id}\`\n\n${prefix}${this.config.name} ${msg.author}\n${prefix}${this.config.name} ${msg.author.id}`)
			}

			const listViewers = db.get(`user_viewed.${mentionMember.user.id}.users.${msg.author.id}`)

			if (!listViewers) {
				msg.reply('você não está observando esse usuário, por favor digite um usuário que você está observando no momento.')
				return;
			} else {
				db.delete(`user_viewed.${mentionMember.user.id}.users.${msg.author.id}`)
			}

			msg.reply(`você removeu o viewer status do usuário ${mentionMember} com sucesso!`)
		};
	}
}

module.exports = new UnseeStatus();

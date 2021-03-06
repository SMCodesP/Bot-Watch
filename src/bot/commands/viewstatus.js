const db = require('quick.db');

class ViewStatus {
	constructor() {
		this.config = {
			name: 'viewstatus',
			aliases: [],
			help:
				'Com esse comando você pode adicionar um usuário na sua visualização de status, ou seja sempre que um usuário passar do status offline para online/idle/dnd você será avisado.',
			requiredPermissions: [],
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
				db.set(`user_viewed.${mentionMember.user.id}.users.${msg.author.id}`, msg.channel.id)
			} else {
				msg.reply('você já está observando esse usuário, por favor digite um usuário novo ou excluia esse usuário.')
				return;
			}

			msg.reply(`agora você está observando o status do usuário ${mentionMember} com sucesso!`)
		};
	}
}

module.exports = new ViewStatus();

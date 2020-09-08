const db = require('quick.db');

class StatusController {
	constructor(bot) {
		bot.on('presenceUpdate', async (oldPresence, newPresence) => {
			const { guild, user, status } = newPresence;

			if ((!oldPresence || oldPresence.status === 'offline') && status !== 'offline') {
				const listViewers = db.get(`user_viewed.${user.id}.users`)

				if (listViewers) {
					Object.entries(listViewers).forEach((viewer) => {
						const channel = guild.channels.cache.get(viewer[1])

						channel.send(`<@${viewer[0]}>, o usuário ${user.tag} mudou o status de offline para ${newPresence.status}`)
					})
				}
			}
		});
	}
}

module.exports = StatusController;

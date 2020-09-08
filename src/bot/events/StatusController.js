const db = require('quick.db');

class StatusController {
	constructor(bot) {
		bot.on('presenceUpdate', async (oldPresence, newPresence) => {
			const { guild, user, status } = newPresence;
			const oldStatus = (!oldPresence) ? 'offline' : oldPresence.status

			if (status !== 'offline') {
				const listViewers = db.get(`user_viewed.${user.id}.users`)

				if (listViewers) {
					Object.entries(listViewers).forEach((viewer) => {
						console.log(viewer[1])
						const channel = guild.channels.cache.get(viewer[1])

						if (channel) {
							channel.send(`<@${viewer[0]}>, o usuário ${user.tag} mudou o status de ${} para ${newPresence.status}`)
						}
					})
				}
			}
		});
	}
}

module.exports = StatusController;

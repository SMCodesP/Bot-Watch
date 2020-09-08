class StatusController {
	constructor(bot) {
		bot.on('presenceUpdate', async (oldPresence, newPresence) => {
			const { guild, user, member, status } = newPresence;
			if (user.id !== '360247173356584960') return;
			if ((!oldPresence || oldPresence.status === 'offline') && status !== 'offline') {
				const channel = guild.channels.cache.get('622951594547347469')

				channel.send(`<@360247173356584960>, o usuário ${user.tag} mudou o status de offline para ${newPresence.status}`)
			}
		});
	}
}

module.exports = StatusController;

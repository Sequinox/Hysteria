const sql = require('sqlite3').verbose()
const path = require('path');
const songPath = path.resolve(__dirname, '..', 'songs.db');
module.exports = {
  name: 'invite',
  description: 'Invite Hysteria to your server!',
  arguments: 'none',
  run(msg, args, client) {
		let invite = client.generateInvite('ADMINISTRATOR').then(link => msg.channel.send(`Use this link to invite me to your server! ${link}`));
  }
}

module.exports = {
  name: 'invite',
  aliases: [],
  description: 'Invite Hysteria to your server!',
  arguments: 'none',
  run (msg, args, client) {
    const invite = client.generateInvite('ADMINISTRATOR').then(link => msg.channel.send(`Use this link to invite me to your server! ${link}`))
    msg.channel.send(invite)
  }
}

const modules = require('../helpers/modules')

module.exports = {
  name: 'avatar',
  aliases: [],
  description: 'Grab the avatar of a given user. Leave blank to grab your own avatar.',
  arguments: '@mention',
  run (msg, args) {
    const embed = new modules.Discord.RichEmbed()
      .setColor('#3dfc89')
    if (args[0] === undefined) {
      embed.setImage(msg.author.avatarURL)
      embed.setAuthor(`${msg.author.username}'s avatar`, msg.author.avatarURL)
      msg.channel.send(embed)
    } else if (args[0] !== undefined && args[0] !== 'help') {
      const mention = msg.mentions.users.first().displayAvatarURL
      let user = msg.mentions.users.first()
      user = user.username
      embed.setImage(mention)
      embed.setAuthor(`${user}'s avatar`, mention)
      msg.channel.send(embed)
    }
  }
}

// TODO: Grab avatars of people outside of server

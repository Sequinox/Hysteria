const Discord = require('discord.js');
module.exports = {
  name: 'avatar',
  description: 'Grab the avatar of a given user. Leave blank to grab your own avatar.',
  arguments: '@mention',
  run(msg, args) {
    let embed = new Discord.RichEmbed()
      .setColor('#3dfc89')
    if (args[0] === undefined) {
      embed.setImage(msg.author.avatarURL)
      embed.setAuthor(`${msg.author.username}'s avatar`, msg.author.avatarURL)
      msg.channel.send(embed);
    } else if (args[0] != undefined && args[0] != 'help') {
      let mention = msg.mentions.users.first().displayAvatarURL;
      let user = msg.mentions.users.first();
      user = user.username;
      embed.setImage(mention);
      embed.setAuthor(`${user}'s avatar`, mention);
      msg.channel.send(embed);
    }
  }
}

// TODO: Grab avatars of people outside of server

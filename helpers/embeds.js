let Discord = require('discord.js');

module.exports = {
  throwError(msg, args, error) {
    let argErrorEmbed = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setTitle('Error!')
      .setDescription(error)

    msg.channel.send(argErrorEmbed);
  },
  help(msg, cmd) {
    let helpEmbed = new Discord.RichEmbed()
      .setAuthor(`${cmd.name.charAt(0).toUpperCase() + cmd.name.substring(1)} : Help`, 'https://img.icons8.com/carbon-copy/2x/question-mark.png')
      .setColor('#3dfc89')
      .addField('Description', cmd.description)
      .addField('Arguments', cmd.arguments)
		msg.channel.send(helpEmbed);
  }
}

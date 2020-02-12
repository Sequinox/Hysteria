const modules = require('../helpers/modules')

const embed = new modules.Discord.RichEmbed()
  .setColor('#663300')

module.exports = {
  name: 'grill',
  description: 'Grill.',
  arguments: 'none',
  run (msg, args, client) {

	embed.setDescription(`${msg.author.username} has smoked those meats.`);
	embed.setFooter(`Dont forget that SWEET baby rays!`);
	embed.setImage('https://i.imgur.com/3nlAsPU.jpg');
	msg.channel.send(embed);

  }
}

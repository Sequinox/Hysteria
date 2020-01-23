const Discord = require('discord.js');

module.exports = {
  name: 'botinfo',
  description: 'Information for Hysteria.',
  arguments: 'none',
  run(msg, args, client) {
    let embed = new Discord.RichEmbed()
      .setColor('#3dfc89')
      .setAuthor('Hysteria : v0.1 - Click to contribute!', 'https://cdn.discordapp.com/avatars/667222783549374474/9acafc12428c1cf4c94cad5df1328915.png?size=2048', 'https://github.com/Sequinox/Hysteria')
      .setThumbnail('https://cdn.discordapp.com/avatars/667222783549374474/9acafc12428c1cf4c94cad5df1328915.png?size=2048')
      .setTitle('Your all purpose Rush bot! Crafted with love by Hysterrics. ♥')
      .setDescription('A few notes about Hysteria:')
      .addField('Hysteria is open-source.', 'This bot is made by the community, for the community. Feel free to contribute!')
      .addField('Hysteria is in development.', 'This bot is nowhere near complete. Expect errors!')
      .setFooter('With special thanks to NameUndisclosed for gathering massive amounts of song information and to James and Chersith for putting it all together.')
    msg.channel.send(embed);
  }
}

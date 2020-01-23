const Discord = require('discord.js');
const momentTz = require('moment-timezone');

module.exports = {
  name: 'times',
  description: 'Returns a list of several timezones.',
  arguments: 'Coming soon!',
  run(msg, args, client) {
    let timezones = ['America/North_Dakota/New_Salem', 'America/New_York', 'America/Los_Angeles', 'America/Boise', 'America/St_Johns', 'Europe/Stockholm', 'Europe/Dublin', 'Asia/Kolkata', 'Asia/Qatar', 'America/Halifax', 'America/Anchorage', 'Pacific/Honolulu', 'America/Miquelon'];
    let embed = new Discord.RichEmbed()
      .setColor('#3dfc89')
      .setAuthor("Here's a list of the current times around the world:")
      .setThumbnail("http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/clock-icon.png")
      .addField("HAST (Hawaii-Aleutian Standard Time)", momentTz().tz("Pacific/Honolulu").format('MMMM Do YYYY, h:mm a'))
      .addField("AKST (Alaska Standard Time)", momentTz().tz("America/Anchorage").format('MMMM Do YYYY, h:mm a'))
      .addField("PST (Pacific Standard Time)", momentTz().tz("America/Los_Angeles").format('MMMM Do YYYY, h:mm a'))
      .addField("MST (Mountain Standard Time)", momentTz().tz("America/Boise").format('MMMM Do YYYY, h:mm a'))
      .addField("CST (Central Standard Time)", momentTz().tz("America/North_Dakota/New_Salem").format('MMMM Do YYYY, h:mm a'))
      .addField("EST (Eastern Standard Time)", momentTz().tz("America/New_York").format('MMMM Do YYYY, h:mm a'))
      .addField("AST (Atlantic Standard Time)", momentTz().tz("America/Halifax").format('MMMM Do YYYY, h:mm a'))
      .addField("NST (Newfoundland Standard Time)", momentTz().tz("America/St_Johns").format('MMMM Do YYYY, h:mm a'))
      .addField("PMST (Pierre & Miquelon Standard Time)", momentTz().tz("America/Miquelon").format('MMMM Do YYYY, h:mm a'))
      .addField("GMT (Greenwich Mean Time)", momentTz().tz("Europe/Dublin").format('MMMM Do YYYY, h:mm a'))
      .addField("CET (Central European Time)", momentTz().tz("Europe/Stockholm").format('MMMM Do YYYY, h:mm a'))
      .addField("KSA (Arabia Standard Time)", momentTz().tz("Asia/Qatar").format('MMMM Do YYYY, h:mm a'))
      .addField("IST (Indian Standard Time)", momentTz().tz("Asia/Kolkata").format('MMMM Do YYYY, h:mm a'))
      .setFooter("Don't see your timezone? Ping Hysterrics to get yours added!")
		msg.channel.send(embed);
  }
}

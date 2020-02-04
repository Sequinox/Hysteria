const modules = require('../helpers/modules')

module.exports = {
  name: 'times',
  description: 'Returns a list of several timezones.',
  arguments: 'mention',
  run (msg, args, client) {
    const embed = new modules.Discord.RichEmbed()
      .setColor(modules.color.randomColor())
      .setThumbnail('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/clock-icon.png')
    if (args[0] === undefined) {
      modules.time.getTimes(msg)
    } else {
      const user = msg.mentions.members.first()
      const timezones = ['PST (UTC - 8:00)', 'MST (UTC - 7:00)', 'CST (UTC - 6:00)', 'EST (UTC - 5:00)', 'AST (UTC - 4:00)', 'NST (UTC - 3:30)', 'GMT (UTC)', 'CET (UTC +1:00)', 'EET (UTC + 2:00)', 'IST (UTC +5:30)']
      for (let i = 0; i < timezones.length; i++) {
        if (user.roles.some(role => role.name === timezones[i])) {
          embed.setTitle(`Current time in ${timezones[i]}`)
            .setDescription(modules.momentTz().tz(modules.time.timezoneList[timezones[i]]).format('MMMM Do YYYY, h:mm a'))
            .setFooter(`Checking time for ${user.displayName} who lives in ${timezones[i]}`)
          msg.channel.send(embed)
        }
      }
    }
  }
}

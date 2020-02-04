const modules = require('../helpers/modules')
const userPath = modules.path.resolve(__dirname, '../databases', 'users.db')

module.exports = {
  name: 'fm',
  description: 'Grab information from last.fm.',
  arguments: 'last.fm user',
  run (msg, args, client) {
    const embed = new modules.Discord.RichEmbed()
      .setColor(modules.color.randomColor())
    const db = new modules.sql.Database(userPath, modules.sql.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(`SQL ERROR: ${err.message}`)
      }
    })
    const lastfm = new modules.LastFM('c31eeb95bb18e4adf49a42ef3c92d36c', '0df50f6de311ccdb787216cc548b1269', 'Hysteria')
    if (args[0] !== undefined) {
      // return lastfm info of args
    } else {
      db.get(`SELECT * FROM users WHERE userid = ${msg.author.id}`, function (err, row) {
        if (err) {
          console.log(err)
        }
        lastfm.userGetRecentTracks({
          user: row.lastfm,
          limit: 1,
          extended: 1
        }).then(data => {
          embed.setAuthor(`${row.lastfm} is listening to...`, '', `https://www.last.fm/user/${row.lastfm}`)
          const image = data.recenttracks.track[0].image[3]
          if (data.recenttracks.track[0].loved === 1) {
            embed.setFooter(`${row.lastfm} ❤️'s ${data.recenttracks.track[0].name}!`)
          }
          const filter = (reaction, user) => {
            return ['ℹ️'].includes(reaction.emoji.name) && user.id === msg.author.id
          }
          if (data.recenttracks.track.length === 1) {
            // In the event that the requested user isn't listening to anything
            embed.addField('Last scrobbled', data.recenttracks.track[0].name, true)
            embed.addField('Last artist', data.recenttracks.track[0].artist.name, true)
            embed.setThumbnail(image['#text'])
            msg.channel.send(embed).then(sentMsg => {
              sentMsg.react('ℹ️').then(() => {
                sentMsg.awaitReactions(filter, {
                  max: 1,
                  time: 60000,
                  errors: ['time']
                }).then(collected => {
                  const reaction = collected.first()
                  if (reaction.emoji.name === 'ℹ️') {
                    modules.lastfmHelper.generateInfoEmbed(msg)
                  }
                })
              })
            })
          } else if (data.recenttracks.track.length === 2) {
            // In the event that the request user is listening to something
            embed.addField('Currently scrobbling', data.recenttracks.track[0].name, true)
            embed.addField('by', data.recenttracks.track[0].artist.name, true)
            embed.addBlankField()
            embed.addField('Last scrobbled', data.recenttracks.track[1].name, true)
            embed.addField('by', data.recenttracks.track[1].artist.name, true)
            embed.setThumbnail(image['#text'])
            msg.channel.send(embed).then(sentMsg => {
              sentMsg.react('ℹ️').then(() => {
                sentMsg.awaitReactions(filter, {
                  max: 1,
                  time: 60000,
                  errors: ['time']
                }).then(collected => {
                  const reaction = collected.first()
                  if (reaction.emoji.name === 'ℹ️') {
                    modules.lastfmHelper.generateInfoEmbed(msg)
                  }
                })
              })
            })
          }
        })
      })
    }
  }
}

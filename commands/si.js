const modules = require('../helpers/modules')
const songPath = modules.path.resolve(__dirname, '../databases', 'songs.db')

module.exports = {
  name: 'si',
  aliases: [],
  description: 'Fetch the info for any Rush song.',
  arguments: 'song',
  run (msg, args) {
    const db = new modules.sql.Database(songPath, modules.sql.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(`SQL ERROR: ${err.message}`)
      }
    })
    const song = args.join(' ')
    if (args.length === 0) {
      msg.channel.send('You must enter a Rush song!')
    } else {
      db.get(`SELECT * FROM songs WHERE songName LIKE "%${song}%" LIMIT 1`, function (err, row) {
        if (err) {
          console.log(err)
        }
        const embed = new modules.Discord.RichEmbed()
          .setAuthor(`Results for ${row.songName}`, 'https://images-na.ssl-images-amazon.com/images/I/619kZBokm-L._AC_SX355_.jpg', `https://www.youtube.com/watch?v=${row.ID}`)
          .setColor('#3dfc89')
          .addField('Album', row.album, true)
          .addField('Lyrics', row.lyrics, true)
          .addField('Music', row.music, true)
          .addField('Length', row.length, true)
          .addField('Single?', row.single, true)
          .addField('Played Live?', row.playedLive, true)
        msg.channel.send(embed)
      })
    }
  }
}

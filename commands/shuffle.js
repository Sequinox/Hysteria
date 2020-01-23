const Discord = require('discord.js');
const albumArt = require('album-art');
const sql = require('sqlite3').verbose();
const path = require('path');
const songPath = path.resolve(__dirname, '../databases', 'songs.db');
module.exports = {
  name: 'shuffle',
  description: 'Returns a random Rush song.',
  arguments: 'none',
  run(msg, args) {
		console.log(songPath);
    let db = new sql.Database(songPath, sql.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(`SQL ERROR: ${err.message}`);
      }
    });
    db.get(`SELECT ID, songName, album from songs ORDER BY random() LIMIT 1`, function(err, row) {
      albumArt('Rush', {album: row.album, size: 'mega'}).then(function(res) {
        let embed = new Discord.RichEmbed()
          .setColor('#3dfc89')
          .setTitle(`${row.songName} : ${row.album}`)
          .setDescription(`https://www.youtube.com/watch?v=${row.ID}`)
					.setImage(res)
        msg.channel.send(embed);
      });
    });
  }
}

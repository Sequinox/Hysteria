const modules = require('../helpers/modules');
const songPath = modules.path.resolve(__dirname, '../databases', 'songs.db');

module.exports = {
  name: 'shuffle',
  description: 'Returns a random Rush song.',
  arguments: 'none',
  run(msg, args) {
		let embed = new modules.Discord.RichEmbed()
			.setColor(modules.color.randomColor())

    let db = new modules.sql.Database(songPath, modules.sql.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(`SQL ERROR: ${err.message}`);
      }
    });
    db.get(`SELECT ID, songName, album from songs ORDER BY random() LIMIT 1`, function(err, row) {
			//Removing the (year) from the album name. Returns an array, so it has to be joined into a string later
			let album = row.album.split(" ");
			album.pop();
			embed
				.setTitle(`${row.songName} : ${row.album}`)
				.setDescription(`https://www.youtube.com/watch?v=${row.ID}`)

			//First two songs don't have album art, so don't try to grab album art that doesn't exist
			if(row.album === 'N/A 1973'){
				msg.channel.send(embed);
			} else {
				modules.albumArt('Rush', {album: album.join(" "), size: 'mega'}).then(function(res) {
					embed.setImage(res)
					msg.channel.send(embed);
				});
			}
    });
  }
}

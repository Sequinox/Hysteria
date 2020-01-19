const Discord = require('discord.js');
const sql = require('sqlite3').verbose()
const path = require('path');
const dbHandler = require('../helpers/userDatabaseHandler');

let embed = new Discord.RichEmbed()
.setColor('#4D4D4D')

module.exports = {
  name: 'f',
  description: 'Pay your respects.',
  arguments: 'mention',
  run(msg, args, client){
    dbHandler.updateRespects(msg.author.id);

    let dummyValue = 1;
		let userRespects = 1;
    let updateScript = `UPDATE users
                        SET RespectsPaid = ?
                        WHERE RespectsPaid = ?`;
    const dbPath = path.resolve(__dirname, '..', 'users.db');
    let db = new sql.Database(dbPath, sql.OPEN_READWRITE, (err) => {
      if(err){
        console.error(`SQL ERROR: ${err.message}`);
      }
    });

    db.get('SELECT RespectsPaid FROM users WHERE userID = "total"', (err, rows) => {
      dummyValue = rows.RespectsPaid;
      let data = [dummyValue + 1, dummyValue];
      db.run(updateScript, data, function(err){
        let output = 0;
        db.get('SELECT RespectsPaid FROM users WHERE userID = "total"', (err, row) => {
          output = row.RespectsPaid;
					db.get('SELECT RespectsPaid FROM users WHERE userID = ?', msg.author.id, (err, row) => {
						userRespects = row.RespectsPaid;
						if(args[0] === undefined && args[0] != 'help'){
							embed.setDescription(`${msg.author.username} has paid their respects.`)
							embed.setFooter(`Total respects paid: ${output} ; Respects paid by ${msg.author.username}: ${userRespects}`)
							msg.channel.send(embed);
						} else if(args[0] != 'help') {
							embed.setDescription(`${msg.author.username} has paid their respects for ${args[0]}`)
							embed.setFooter(`Total respects paid: ${output} ; Respects paid by ${msg.author.username}: ${userRespects}`)
							msg.channel.send(embed);
						}
					});
        });
      });
    });
  }
}

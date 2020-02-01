const modules = require('../helpers/modules');

let embed = new modules.Discord.RichEmbed()
  .setColor('#4D4D4D')

module.exports = {
  name: 'f',
  description: 'Pay your respects.',
  arguments: 'mention',
  run(msg, args, client) {
		args = args.join(" ");
    modules.dbHandler.updateRespects(msg.author.id);

    let dummyValue = 1;
    let userRespects = 1;
    let updateScript = `UPDATE users
                        SET RespectsPaid = ?
                        WHERE RespectsPaid = ?`;
    const dbPath = modules.path.resolve(__dirname, '../databases', 'users.db');
    let db = new modules.sql.Database(dbPath, modules.sql.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(`SQL ERROR: ${err.message}`);
      }
    });

    db.get('SELECT RespectsPaid FROM users WHERE userID = "total"', (err, rows) => {
      dummyValue = rows.RespectsPaid;
      let data = [dummyValue + 1, dummyValue];
      db.run(updateScript, data, function(err) {
        let output = 0;
        db.get('SELECT RespectsPaid FROM users WHERE userID = "total"', (err, row) => {
          output = row.RespectsPaid;
          db.get('SELECT RespectsPaid FROM users WHERE userID = ?', msg.author.id, (err, row) => {
            userRespects = row.RespectsPaid;
            if (args[0] === undefined && args[0] != 'help') {
              embed.setDescription(`${msg.author.username} has paid their respects.`)
              embed.setFooter(`Total respects paid: ${output} ; Respects paid by ${msg.author.username}: ${userRespects}`)
              msg.channel.send(embed);
            } else if (args[0] != 'help') {
              embed.setDescription(`${msg.author.username} has paid their respects for ${args}`)
              embed.setFooter(`Total respects paid: ${output} ; Respects paid by ${msg.author.username}: ${userRespects}`)
              msg.channel.send(embed);
            }
          });
        });
      });
    });
  }
}

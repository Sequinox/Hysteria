const modules = require('../helpers/modules')
const userPath = modules.path.resolve(__dirname, '../databases', 'users.db')

module.exports = {
  name: 'fmset',
  description: 'Set your last.fm username.',
  arguments: 'last.fm user',
  run (msg, args, client) {
    const db = new modules.sql.Database(userPath, modules.sql.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(`SQL ERROR: ${err.message}`)
      }
    })

    if (args[0] === undefined) {
      msg.channel.send('You must enter your last.fm username!')
    } else {
      db.get(`SELECT * FROM users WHERE userID = ${msg.author.id}`, function (err, row) {
        if (err) {
          console.log(err)
        }
        if (typeof row === 'undefined') {
          db.run(`INSERT INTO users (userID) VALUES ("${msg.author.id}")`, function (err) {
            if (err) {
              console.log(err)
            }
            db.run(`UPDATE users SET lastfm = "${args[0]}" WHERE userID = ${msg.author.id}`, function (err) {
              if (err) {
                console.log(err)
              }
              msg.channel.send('Username updated!')
            })
          })
        } else {
          db.run(`UPDATE users SET lastfm = "${args[0]}" WHERE userID = ${msg.author.id}`, function (err) {
            if (err) {
              console.log(err)
            }
           msg.channel.send('Username updated!')
          })
        }
      })
    }
  }
}

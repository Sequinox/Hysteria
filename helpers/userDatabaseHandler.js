const sql = require('sqlite3').verbose()
const path = require('path')
const userPath = path.resolve(__dirname, '../databases', 'users.db')
const guildPath = path.resolve(__dirname, '../databases', 'guilds.db')

let currentValue = 0

module.exports = {
  updateRespects (user) {
    const db = new sql.Database(userPath, sql.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(`SQL ERROR: ${err.message}`)
      }
    })
    db.get('SELECT userID FROM users WHERE EXISTS (SELECT userID FROM users WHERE userID = ?)', user, function (err, row) {
      if (err) {
        console.log(err)
      }
      if (typeof row === 'undefined') {
        db.run('INSERT INTO users (userID) VALUES (?)', user, function (err) {
          if (err) {
            console.log(err)
          }
        })
      } else {
        db.get('SELECT RespectsPaid FROM users WHERE userID = ?', user, (err, rows) => {
          if (err) {
            console.log(err)
          }
          currentValue = rows.RespectsPaid
          const data = [currentValue + 1, user]
          db.run('UPDATE users SET RespectsPaid = ? WHERE userID = ?', data, function (err) {
            if (err) {
              console.log(err)
            }
          })
        })
      }
    })
  },
  addGuild (guild) {
    const db = new sql.Database(guildPath, sql.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(`SQL ERROR: ${err.message}`)
      }
    })
    db.run(`CREATE TABLE IF NOT EXISTS "${guild}" (author TEXT, message TEXT, msgID INTEGER, stars INTEGER, timestamp TEXT, channelID TEXT, imageURL TEXT)`, function (err) {
      if (err) {
        console.log(err)
      }
    })
  },
  addStar (guild, author, message, msgID, timestamp, channelID, imageURL) {
    const db = new sql.Database(guildPath, sql.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(`SQL ERROR: ${err.message}`)
      }
    })
    db.get(`SELECT stars FROM "${guild}" WHERE msgID = ${msgID}`, function (err, row) {
      if (err) {
        console.log(err)
      }
      if (typeof row === 'undefined') {
        db.run(`INSERT INTO "${guild}" VALUES ("${author}", "${message}", "${msgID}", 1, "${timestamp}", "${channelID}", "${imageURL}")`, function (err) {
          if (err) {
            console.log(err)
          }
        })
      } else {
        db.run(`UPDATE "${guild}" SET stars = stars + 1 WHERE msgID = "${msgID}"`, function (err) {
          if (err) {
            console.log(err)
          }
        })
      }
    })
  },
  removeStar (guild, msgID) {
    const db = new sql.Database(guildPath, sql.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(`SQL ERROR: ${err.message}`)
      }
    })
    db.run(`UPDATE "${guild}" SET stars = stars - 1 WHERE msgID = "${msgID}"`, function (err) {
      if (err) {
        console.log(err)
      }
      db.get(`SELECT stars FROM "${guild}" WHERE msgID = "${msgID}"`, function (err, row) {
        if (err) {
          console.log(err)
        }
        if (row.stars === 0) {
          db.run(`DELETE FROM "${guild}" WHERE msgID = "${msgID}"`, function (err, row) {
            if (err) {
              console.log(err)
            }
          })
        }
      })
    })
  }
}

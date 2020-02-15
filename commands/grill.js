/* eslint-disable no-path-concat */

// Good luck trying to read any of this
// I'm sorry.

const modules = require('../helpers/modules')
const fs = require('fs')

const embed = new modules.Discord.RichEmbed()
  .setColor('#663300')

module.exports = {
  name: 'grill',
  description: 'Grill.',
  arguments: 'mention',
  run (msg, args, client) {
    const dbPath = modules.path.resolve(__dirname, '../databases', 'users.db')
    const db = new modules.sql.Database(dbPath, modules.sql.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(`SQL ERROR: ${err.message}`)
      }
    })

    if (args[0] === undefined) {
      embed.setDescription(`${msg.author.username} has smoked those meats.`)
      embed.setFooter('Dont forget that SWEET baby rays!')
      embed.setImage('https://images-na.ssl-images-amazon.com/images/I/81YSZkz4wzL._AC_SX522_.jpg')
      msg.channel.send(embed)
    } else {
      // In the event someone tries to grill themself
      if (msg.mentions.users.first().username === msg.author.username) {
        msg.channel.send('You can\'t grill yourself!')
      } else {
        const mention = msg.mentions.users.first().displayAvatarURL
        // Incrementing a user's "timesGrilled" stat
        db.get(`SELECT timesGrilled FROM users WHERE userID = ${msg.mentions.users.first().id}`, (err, row) => {
          if (err) {
            console.log(err)
          } else {
            if (typeof row === 'undefined') {
              db.run(`INSERT INTO users (userID) VALUES (${msg.mentions.users.first().id})`, (err) => {
                if (err) {
                  console.log(err)
                } else {
                  // This is fucking stupid
                  msg.channel.send('Whoops, this user didn\'t have an entry in the database, but they do now. Run the command again!')
                }
              })
            } else {
              // All of this needs to be made into a function
              const timesGrilled = row.timesGrilled + 1
              db.run(`UPDATE users SET timesGrilled = ${timesGrilled} WHERE userID = ${msg.mentions.users.first().id}`, (err) => {
                if (err) {
                  console.log(err)
                } else {
                  const canvas = modules.Canvas.createCanvas(522, 473)
                  const ctx = canvas.getContext('2d')

                  modules.Canvas.loadImage('./grill.jpg').then((image) => {
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
                    modules.Canvas.loadImage(mention).then((img) => {
                      ctx.drawImage(img, 100, 60, 200, 200)
                      ctx.fillStyle = 'rgba(255, 155, 25, 0.30)'
                      ctx.fillRect(100, 60, 200, 200)
                      // Image is first rendered into the commands folder
                      const out = fs.createWriteStream(__dirname + '/grilled.png')
                      const stream = canvas.createPNGStream()
                      stream.pipe(out)
                      out.on('finish', () => {
                        embed.setDescription(`${msg.mentions.users.first().username} has just been GRILLED by ${msg.author.username}!`)
                        embed.setFooter(`${msg.mentions.users.first().username} has been grilled ${row.timesGrilled} times!`)
                        msg.channel.send(embed)
                        msg.channel.send({
                          files: [{
                            attachment: modules.path.resolve(__dirname + '/grilled.png'),
                            name: 'file.jpg'
                          }]
                        })
                      })
                    })
                  })
                }
              })
            }
          }
        })
      }
    }
  }
}

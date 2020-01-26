const Discord = require('discord.js');
const color = require('../helpers/colorPicker.js');
const LastFM = require('lastfm-node-client');
const moment = require('moment')
const sql = require('sqlite3').verbose();
const path = require('path');
const userPath = path.resolve(__dirname, '../databases', 'users.db')

module.exports = {
  generateInfoEmbed(msg, args) {
    let embed = new Discord.RichEmbed()
      .setColor(color.randomColor());
    const lastfm = new LastFM('c31eeb95bb18e4adf49a42ef3c92d36c', '0df50f6de311ccdb787216cc548b1269', 'Hysteria');
    let db = new sql.Database(userPath, sql.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(`SQL ERROR: ${err.message}`);
      }
    });
    db.get(`SELECT * FROM users WHERE userid = ${msg.author.id}`, function(err, row) {
      lastfm.userGetInfo({
        user: row.lastfm
      }).then(info => {
        lastfm.userGetTopTracks({
          user: row.lastfm,
          limit: 1
        }).then(track => {
          lastfm.userGetTopArtists({
            user: row.lastfm,
            limit: 1
          }).then(artist => {
            lastfm.userGetTopAlbums({
              user: row.lastfm,
              limit: 1
            }).then(album => {
              let image = info.user.image[3];
              let registered = info.user.registered;
              embed.setTitle(`Last.fm stats for ${info.user.name}`)
              embed.setURL(info.user.url)
              embed.setThumbnail(image['#text']);
              embed.addField('Scrobbles', info.user.playcount);
              embed.addField('Favorite track', `${track.toptracks.track[0].name} by ${track.toptracks.track[0].artist.name}`)
              embed.addField('Favorite artist', artist.topartists.artist[0].name)
              embed.addField('Favorite album', `${album.topalbums.album[0].name} by ${album.topalbums.album[0].artist.name}`)
              embed.setFooter(`Account registered on ${moment.unix(registered['#text']).format('MMMM Do YYYY, h:mm a')}`)
              msg.channel.send(embed);
            })
          })
        });
      });
    });
  },
  grabUserInfo(msg, args) {
    let embed = new Discord.RichEmbed()
      .setColor(color.randomColor());
    const lastfm = new LastFM('c31eeb95bb18e4adf49a42ef3c92d36c', '0df50f6de311ccdb787216cc548b1269', 'Hysteria');
    lastfm.userGetInfo({
      user: args[0]
    }).then(info => {
      lastfm.userGetTopTracks({
        user: args[0],
        limit: 1
      }).then(track => {
        lastfm.userGetTopArtists({
          user: args[0],
          limit: 1
        }).then(artist => {
          lastfm.userGetTopAlbums({
            user: args[0],
            limit: 1
          }).then(album => {
            let image = info.user.image[3];
            let registered = info.user.registered;
            embed.setTitle(`Last.fm stats for ${info.user.name}`)
            embed.setURL(info.user.url)
            embed.setThumbnail(image['#text']);
            embed.addField('Scrobbles', info.user.playcount);
            embed.addField('Favorite track', `${track.toptracks.track[0].name} by ${track.toptracks.track[0].artist.name}`)
            embed.addField('Favorite artist', artist.topartists.artist[0].name)
            embed.addField('Favorite album', `${album.topalbums.album[0].name} by ${album.topalbums.album[0].artist.name}`)
            embed.setFooter(`Account registered on ${moment.unix(registered['#text']).format('MMMM Do YYYY, h:mm a')}`)
            msg.channel.send(embed);
          })
        })
      });
    });
  }
}

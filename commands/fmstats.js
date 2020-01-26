const Discord = require('discord.js');
const color = require('../helpers/colorPicker.js');
const LastFM = require('lastfm-node-client');
const moment = require('moment')
const sql = require('sqlite3').verbose();
const path = require('path');
const userPath = path.resolve(__dirname, '../databases', 'users.db')
const lastfmHelper = require('../helpers/lastfm.js')

module.exports = {
  name: 'fmstats',
  description: 'Grab information about a last.fm user',
  arguments: 'last.fm user',
  run(msg, args, client) {
    if (args[0] === undefined) {
			lastfmHelper.generateInfoEmbed(msg);
    } else {
			lastfmHelper.grabUserInfo(msg, args);
		}
  }
}

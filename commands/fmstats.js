const modules = require('../helpers/modules')

module.exports = {
  name: 'fmstats',
  aliases: [],
  description: 'Grab information about a last.fm user',
  arguments: 'last.fm user',
  run (msg, args, client) {
    if (args[0] === undefined) {
      modules.lastfmHelper.generateInfoEmbed(msg)
    } else {
      modules.lastfmHelper.grabUserInfo(msg, args)
    }
  }
}

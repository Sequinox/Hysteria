const modules = require('../helpers/modules');
const userPath = modules.path.resolve(__dirname, '../databases', 'users.db')

module.exports = {
  name: 'fmstats',
  description: 'Grab information about a last.fm user',
  arguments: 'last.fm user',
  run(msg, args, client) {
    if (args[0] === undefined) {
			modules.lastfmHelper.generateInfoEmbed(msg);
    } else {
			modules.lastfmHelper.grabUserInfo(msg, args);
		}
  }
}

const modules = require('../helpers/modules');

module.exports = {
  name: 'ping',
  description: 'Returns the response time of the bot.',
  arguments: 'none',
  run(msg, args, client) {
    if (args[0] === undefined) {
      let pingEmbed = modules.generateEmbed('Pong!', '', '', `Response time: ${Math.floor(client.ping)} ms`, [], [], false, '#3dfc89', `Previous pings : ${client.pings}`);
      msg.channel.send(pingEmbed);
    }
  }
}

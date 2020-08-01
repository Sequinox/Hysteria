const modules = require('../helpers/modules')

module.exports = {
  name: 'ping',
  aliases: [],
  description: 'Returns the response time of the bot.',
  arguments: 'none',
  run (msg, args, client) {
    if (args[0] === undefined) {
      const pingEmbed = modules.generateEmbed('Pong!', '', '', `Response time: ${Math.floor(client.ping)} ms`, [], [], false, '#3dfc89', `Previous pings : ${client.pings}`)
      msg.channel.send(pingEmbed)
    }
  }
}

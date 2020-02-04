const modules = require('../helpers/modules')

const clbot = new modules.Cleverbot()
clbot.configure({
  botapi: 'CC1vubgwY60Qku1dJW1Yt8qQrVw'
})

module.exports = {
  name: 'cleverbot',
  description: 'Talk to da homie.',
  arguments: 'Whatever you wanna say to him.',
  run (msg, args, client) {
    if (args[0] === 'help') return
    clbot.write(args.join(' '), function (response) {
      msg.channel.send(response.output)
    })
  }
}

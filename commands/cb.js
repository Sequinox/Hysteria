const Cleverbot = require('cleverbot-node');
const clbot = new Cleverbot;
clbot.configure({botapi: "CC1vubgwY60Qku1dJW1Yt8qQrVw"});
module.exports = {
  name: 'cleverbot',
  description: 'Talk to da homie.',
  arguments: 'Whatever you wanna say to da homie.',
  run(msg, args, client){
    if(args[0] === 'help') return;
    clbot.write(args.join(" "), function (response){
      msg.channel.send(response.output);
    })
  }
}

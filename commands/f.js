const generateEmbed = require('better-embed');
const data = require('./data.json');
const fs = require('fs');

module.exports = {
  name: 'f',
  description: 'Pay your respects.',
  arguments: 'mention',
  run(msg, args, client){
    let respectsPaid = fs.readFileSync('./data.json');
    respectsPaid = JSON.parse(respectsPaid);
    let dataToWrite = respectsPaid.respectsPaid;
    dataToWrite++
    let dataToWriteObj = JSON.stringify({
      "respectsPaid": dataToWrite
    });
    fs.writeFileSync('./data.json', dataToWriteObj);




    if(args[0] === undefined && args[0] != 'help'){
      let embed = generateEmbed('', '', '', `${msg.author.username} has paid their respects.`, [], [], false, '#4D4D4D', `Total respects paid: ${respectsPaid.respectsPaid}`);
      msg.channel.send(embed);
    } else if(args[0] != 'help') {
      let embed = generateEmbed('', '', '', `${msg.author.username} has paid their respects for ${args[0]}`, [], [], false, '#4D4D4D', `Total respects paid: ${respectsPaid.respectsPaid}`);
      msg.channel.send(embed);
    }
  }
}

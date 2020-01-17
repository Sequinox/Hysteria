const Discord = require('discord.js');
const client = new Discord.Client();
const parser = require('discord-command-parser');
const generateEmbed = require('better-embed');
const Cleverbot = require('cleverbot-node');
const fs = require('fs');
const token = require('./token.json');

const prefix = 'm,';

const clbot = new Cleverbot;
clbot.configure({botapi: "CC1vubgwY60Qku1dJW1Yt8qQrVw"});

// I stole this code lol ---------------------
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
// -------------------------------------------------


// Code to run once bot is ready
client.on('ready', () => {
  console.log(`${client.readyAt} : Logged in as ${client.user.tag}!`);
  client.user.setActivity('you.', { type: 'WATCHING' })
    .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
    .catch(console.error);
});
client.on('messageDelete', msg => {
  console.log(`A message has been deleted in ${msg.channel}: ${msg.cleanContent}`)
});

// Code to run once a message is sent
client.on('message', msg => {
  if(msg.author.bot) return;
  if(msg.channel.type === 'dm'){
    clbot.write(msg.content, function(response) {
      msg.channel.send(response.output);
    });
  }
  let parsed = parser.parse(msg, prefix, [false]);
  let args = parsed.arguments;
  let command = parsed.command.toLowerCase();
  if (!parsed.success) return;
  try {
    if(args[0] === 'help'){
      let commandName = client.commands.get(command).name;
      let parsedCommandName = commandName.charAt(0).toUpperCase() + commandName.substring(1);
      let description = client.commands.get(command).description;
      let arguments = client.commands.get(command).arguments;
      let helpEmbed = new Discord.RichEmbed()
        .setAuthor(`${parsedCommandName} : Help`, 'https://img.icons8.com/carbon-copy/2x/question-mark.png')
        .setColor('#3dfc89')
        .addField('Description', description)
        .addField('Arguments', arguments)

      msg.channel.send(helpEmbed);
    }
  } catch(err){
    msg.channel.send('Error!');
    console.log(`Error parsing argument: ${args} \nError: ${err}`);
  }
  try {
    switch(command){
      case 'ping':
        client.commands.get('ping').run(msg, args, client);
        break;
      case 'avatar':
        client.commands.get('avatar').run(msg, args, client);
        break;
      case 'cleverbot':
        client.commands.get('cleverbot').run(msg, args, client);
        break;
      case 'f':
        client.commands.get('f').run(msg, args, client);
        break;
      default:
        msg.channel.send('huh?');
    }
  } catch(err) {
    msg.channel.send('Error!');
    console.log(`Error running command: ${command} \nError: ${err}`);
  }
});


client.login(token.token);

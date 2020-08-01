const modules = require('./helpers/modules')
const client = new modules.Discord.Client()
const error = modules.chalk.bold.red

const prefix = 'm,'

const clbot = new modules.Cleverbot()
clbot.configure({
  botapi: 'CC1vubgwY60Qku1dJW1Yt8qQrVw'
})

// I stole this code lol ---------------------
client.commands = new modules.Discord.Collection()
const commandFiles = modules.fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}
// -------------------------------------------------

// Code to run once bot is ready
client
  .on('ready', () => {
    console.log(`${modules.chalk.green.underline(client.readyAt)} : Logged in as ${client.user.tag}!`)
    client.user.setActivity('you. m,botinfo', {
      type: 'LISTENING'
    })
  })
  .on('guildCreate', guild => {
    modules.dbHandler.addGuild(guild.id)
  })
  .on('messageDelete', msg => {
    console.log(`A message has been deleted in ${msg.channel}: ${msg.cleanContent}`)
  })
  .on('guildMemberRemove', member => {
    if (member.guild.id === '265257036512493578') {
      client.channels.get('265257184022102018').send(`${member.displayName} has decided they dislike Rush and has returned to the Netherworld!`)
    }
  })

// Code to run once a message is sent
client.on('message', msg => {
  // Kinda hacky way to bypass prefix for ONLY the fm command so long as its in music-of-the-spheres
  if (msg.content === 'fm' && msg.channel.id === '265457421927841793') {
    console.log('running')
    const fm = client.commands.get('fm')
    fm.run(msg, '', client)
  }
  if (msg.author.bot) return

  // DM Cleverbot functionality
  if (msg.channel.type === 'dm') {
    clbot.write(msg.content, function (response) {
      msg.channel.send(response.output)
    })
  }

  // Parses message into an object
  const parsed = modules.parser.parse(msg, prefix, [false])
  if (!parsed.success) return

  const args = parsed.arguments // An array of every argument passed
  const command = parsed.command.toLowerCase() // This is the command that the user wants to run, whether is exists or not.

  // Finally, actually run the command
  try {
    const cmd = client.commands.get(command)
    // Help functionality
    const helpEmbed = new Discord.RichEmbed()
    if (command === 'help') {
      const commandsList = client.commands.array()
      for (let i = 0; i < commandsList.length; i++) {
        helpEmbed.setColor(0x3dfc89)
        helpEmbed.setAuthor('Here is a list of commands. Run m,help <command> for more info on each command.', 'https://p7.hiclipart.com/preview/575/670/335/computer-icons-information-download-information.jpg')
        helpEmbed.addField(commandsList[i].name, commandsList[i].description)
      }
      msg.channel.send(helpEmbed)
      return
    }
    if (args[0] === 'help') {
      modules.embeds.help(msg, cmd)
    } else if (args[0] !== 'help') {
      try {
        cmd.run(msg, args, client)
      } catch (err) {
        modules.embeds.throwError(msg, args, 'There was an error running the command. If you entered a command that was supposed to work, contact a developer.')
        console.log(error(`Error running command: ${command} \nError: ${err}`))
      }
    }
  } catch (err) {
    modules.embeds.throwError(msg, args, 'Cannot pull help for an unrecognized command.')
    console.log(error(`Error running help command: ${args} \nError: ${err}`))
  }
})

const token = require('./token.json')
const { Discord } = require('./helpers/modules')
client.login(token.devToken)

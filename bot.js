const Discord = require('discord.js');
var fs = require("fs");

const client = new Discord.Client();

var authenticationContent = fs.readFileSync("auth.json");
var authentication = JSON.parse(authenticationContent);

client.on('ready', () => {
  console.log('I am booted up and ready to serve passenger sir!');
});

client.on('message', message => {
  //message.react('🤔');

  if (message.content === 'illy buda') {
    message.channel.send('hehe');
  }
});

client.on("guildMemberAdd", member => {
  console.log(`User "${member.user.username}" has joined "${member.guild.name}"`);
  member.addRole('234927057920983041')
    .then(console.log(`"${member.user.username}" now has the "Guest" role "${member.guild.roles}"`))
    .catch(console.error);
});

client.login(authentication.token);
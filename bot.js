const Discord = require('discord.js');
var fs = require("fs");

const client = new Discord.Client();

var authenticationContent = fs.readFileSync("auth.json");
var authentication = JSON.parse(authenticationContent);

const prefix = "!";
let allowedRoles = "Devs";

client.on('ready', () => {
  console.log('I am booted up and ready to serve passenger sir!');
});

client.on('message', message => {
  if (message.content.startsWith(prefix + 'role')) {
    let roleArgs = message.content.split(" ");

    if (roleArgs.length < 2 || roleArgs[1] == '--help' || roleArgs[1] == '-h') {
      message.channel.send('These are the roles you are allowed to join: \n'+
        allowedRoles+
        '\n'+
        'You can join a role by typing: \n'+
        '`!role <roleName>`'
      );

      return;
    }

    let role = message.guild.roles.find("name", roleArgs[1]);

    if (!role || role === null) {
      message.channel.send('I\'m sorry! I couldn\'t find a role by that name!');

      return;
    }

    if (allowedRoles.indexOf(role.name) === -1) {
      message.channel.send('Doesn\'t look like you are allowed to join that role! You can always check what roles you are allowed to join by typing `!role --help` or `!role -h`!');

      return;
    }

    message.member.addRole(role)
      .then(console.log(`"${message.member.user.username}" has been added to the role ${role.name}"`))
      .catch(console.error);

    message.channel.send('You\'ve been added to the role: ' + role.name);
  }

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
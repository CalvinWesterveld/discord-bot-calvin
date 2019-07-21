// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

const config = require("./config.json");

const serverStats = {
	guildID: '600455433471393812',
	totalUsersID: '600455252759805967',
	memberCountID: '600455338868604938',
};

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setPresence({ game: { name: 'ShadowWarriors Clan', type: 0 } });
});

client.on('guildMemberAdd', member => {
	if (member.guild.id !== serverStats.guildID) return;
	client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
	client.channels.get(serverStats.memberCountID).setName(`Total Members : ${member.guild.members.filter(m => !m.user.bot).size}`);
});

client.on('guildMemberRemove', member => {
	if (member.guild.id !== serverStats.guildID) return;
	client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
	client.channels.get(serverStats.memberCountID).setName(`Total Members : ${member.guild.members.filter(m => !m.user.bot).size}`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setPresence({ game: { name: 'ShadowWarriors Clan', type: 0 } });
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setPresence({ game: { name: 'ShadowWarriors Clan', type: 0 } });
});



client.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'welcome');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | name : ', `${member}`)
        .addField(':microphone2: | Welcome!', `Welcome to the server, ${member}`)
        .addField(':id: | User :', "**[" + `${member.id}` + "]**")
        .addField(':family_mwgb: | Your are the member', `${member.guild.memberCount}`)
        .addField("Name", `<@` + `${member.id}` + `>`, true)
        .addField('Server', `${member.guild.name}`, true )
        .setFooter(`**${member.guild.name}**`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

client.on('guildMemberAdd', member => {

    console.log(`${member}`, "has joined" + `${member.guild.name}`)

});

client.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', 'welcome');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField('Name:', `${member}`)
        .addField('Has Let the Server', ';(')
        .addField('Bye Bye :(', 'We will all miss you!')
        .addField('The server now as', `${member.guild.memberCount}` + " members")
        .setFooter(`**${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

client.on('guildMemberRemove', member => {
    console.log(`${member}` + "has left" + `${member.guild.name}` + "Sending leave message now")
    console.log("Leave Message Sent")
});


client.on('messageUpdate', (omsg, nmsg) => {
    if (omsg.type != 'text') return;

    const channel = client.guilds.get(nmsg.guild.id).channels.find(channel => channel.name.toLowerCase().match(/staff-loggs/))
    const adminRole = nmsg.guild.roles.find(role => role.name.toLowerCase().match(/management/)).id
    const notAllowed = [ 'http://', 'discord.gg', 'cancer', 'kanker', 'tyfus', 'fuck', 'kut', 'aids', 'jezus', 'godver' ]

    if (!nmsg.member.roles.has(adminRole) && notAllowed.some(word => nmsg.content.includes(word))) {
        nmsg.delete()
        channel.send({
            "embed": {
                "title": "Auto delete",
                "description": "A message has been deleted.",
                "color": 1409939,
                "fields": [
                    {
                        "name": "Deleted by",
                        "value": `<@${client.user.id}>`,
                        "inline": true
                    },
                    {
                        "name": "Username",
                        "value": `<@${nmsg.author.id}> (${nmsg.author.id})`,
                        "inline": true
                    },
                    {
                        "name": "From",
                        "value": `<#${nmsg.channel.id}> (${nmsg.channel.name})`,
                        "inline": true
                    },
                    {
                        "name": "Time",
                        "value": `${new Date()}`,
                        "inline": true
                    },
                    {
                        "name": "Message",
                        "value": `${nmsg.content || '(was waarschijnlijk een embed wat niet vertoonbaar is)'}`
                    }
                ],
                "thumbnail": {
                    "url": `${nmsg.author.avatarURL || 'https://cdn.discordapp.com/embed/avatars/0.png'}`
                }
            }
        })
    } else if (!nmsg.author.bot) {
        if (omsg.content.length > 1000) {
            omsg.content = omsg.content.substring(0, 1000)
            omsg.content += '...'
        }
        if (nmsg.content.length > 1000) {
            nmsg.content = nmsg.content.substring(0, 1000)
            nmsg.content += '...'
        }
        channel.send({
            "embed": {
                "title": "Message edit",
                "description": "A message has been edited.",
                "color": 1409939,
                "fields": [
                    {
                        "name": "Username",
                        "value": `<@${nmsg.author.id}> (${nmsg.author.id})`,
                        "inline": true
                    },
                    {
                        "name": "From",
                        "value": `<#${nmsg.channel.id}> (${nmsg.channel.name})`,
                        "inline": true
                    },
                    {
                        "name": "Time",
                        "value": `${new Date()}`,
                        "inline": true
                    },
                    {
                        "name": "Old message",
                        "value": `${omsg.content || '(was waarschijnlijk een embed wat niet vertoonbaar is)'}`
                    },
                    {
                        "name": "New message",
                        "value": `${nmsg.content || '(was waarschijnlijk een embed wat niet vertoonbaar is)'}`
                    }
                ],
                "thumbnail": {
                    "url": `${nmsg.author.avatarURL || 'https://cdn.discordapp.com/embed/avatars/0.png'}`
                }
            }
        })
    }
});

client.on('message', async (message) => {
    if (message.author.bot) return
    if (message.channel.name == undefined) return

    const logchannel = client.guilds.get(message.guild.id).channels.find(channel => channel.name.toLowerCase().match(/staff-loggs/))

    const notAllowed = [ 'http://', 'discord.gg', 'cancer', 'kanker', 'tyfus', 'fuck', 'kut', 'aids', 'jezus', 'godver' ]
    const adminRole = message.guild.roles.find(role => role.name.toLowerCase().match(/management/)).id

    if (!message.member.roles.has(adminRole))
        if (notAllowed.some(word => message.content.includes(word))) {
            message.delete()
            logchannel.send({
                "embed": {
                    "title": "Auto delete",
                    "description": "A message has been deleted.",
                    "color": 1409939,
                    "fields": [
                        {
                          "name": "Deleted by",
                          "value": `<@${client.user.id}>`,
                          "inline": true
                        },
                        {
                            "name": "Username",
                            "value": `<@${message.author.id}> (${message.author.id})`,
                            "inline": true
                        },
                        {
                            "name": "From",
                            "value": `<#${message.channel.id}> (${message.channel.name})`,
                            "inline": true
                        },
                        {
                            "name": "Time",
                            "value": `${new Date()}`,
                            "inline": true
                        },
                        {
                            "name": "Message",
                            "value": `${message.content}`
                        }
                    ],
                    "thumbnail": {
                        "url": `${message.author.avatarURL || 'https://cdn.discordapp.com/embed/avatars/0.png'}`
                    }
                }
            });



client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Let's go with a few common example commands! Feel free to delete or change those.

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{});
    // And we get the bot to say the thing:
    message.channel.send(sayMessage);
  }

  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit:
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Management"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Management"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.

    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);

    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.login(process.env.BOT_TOKEN);

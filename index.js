const http = require('http');
const express = require('express');
const app = express();
//app.get("/", (request, response) => {
  //console.log(Date.now() + " Ping Received");
  //response.SendStatus(200);
//});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 200000);

const Discord = require("discord.js");
const client = new Discord.Client({autoReconnect: true, max_message_cache: 0});
const token = require('./settings.json').token;
const ddiff = require('return-deep-diff'),
Wiki = require("wikijs"),
yt = require("./youtube_plugin"),
youtube_plugin = new yt(),
weather = require("weather-js"),
functionHelper = require('./functionHelpers.js'),
ffmpeg = require("ffmpeg"),
search = require('youtube-search'),
con = console.log,
mention = "<@376027515640348682>";

const fs = require("fs")
//const commands = JSON.parse(fs.readFileSync('./command.json', 'utf8'));
// We need to call the serverPrefixes JSON file
//const serverPrefixes = JSON.parse(fs.readFileSync('./serverPrefixes.json', 'utf8'))
const AuthDetails = require("./config.json");
const music = require('./music.js');
const util = require("./util.js");
const cmds = require('./commands.js');
const ytdl = require('ytdl-core');
const tool = require('./tool.js');
const config = require("./config.json");
const chalk = require('chalk');
const rp = require('request-promise');
const ms = require('ms');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json');
const storeadapter = new FileSync('store.json');
const db = low(adapter);
const storedb = low(storeadapter);
db.defaults({ xp: [], level: []}).write()
const bot = new Discord.Client();
var moment = require("moment");
var fortunes = [
  "yes",
  "Oui Clairement",
  "non",
  "J’ai des doutes",
  "Tu devras attendre",
  "Ca m’a l’air bon",
  "peut être",
  "Probablement",
  "Rien de très sûr",
  "Ne paries pas dessus",
  "certainement",
  "Trop tôt pour le dire",
  "sans hésité",
  "Qui sait ?",
  "Certainement pas",
  "Vas-y",
  "Tu peux compter dessus",
  "Pas maintenant",
  "Oublies ça",
  "Ca m’a l’air bon",
  "Tu rigoles ?",
  "Oui, en temps voulu",
  "Mes sources disent que non"

];
var randnum = 0;

const os = require('os');
const opts = {
  maxResults: 3,
  key: AuthDetails.youtube_api_key
  
};
//////////////////////////////////////////////////////////////////////////////

client.login(token)

//////////////////////////////////////////////////////////////////////////////


client.on('message', msg => {
  if (msg.author.client || msg.channel.type != 'text')
      return; // Ne répondez pas aux messages des robots ou des messages qui ne proviennent pas des guildes.

  if (!msg.content.startsWith(config.prefix))
      return; //Pas une commande.

  let cmd = msg.content.split(/\s+/)[0].slice(config.prefix.length).toLowerCase();
  getCmdFunction(cmd)(msg);
  client.login(token)

//////////////////////////////////////////////////////////////////////////////
});

//client.on('roleCreate', role => {
  //let guild = role.guild;
  //client.channels.get('401402626945712128').sendMessage(`Un nouveau rôle appelé **${role.name}** a été créé.`);
//});

//client.on('roleDelete', role => {
  //let guild = role.guild;
  //client.channels.get('401402626945712128').sendMessage(`Le rôle **${role.name}** a été supprimé.`);
//});

//client.on('roleUpdate', role => {
  //let guild = role.guild;
  //client.channels.get('401402626945712128').sendMessage(`Le rôle **${role.name}** a été modifé.`);
//});


// Guild Event
//client.on('guildDelete', guild => {
  //console.log(`Le bot a **quitté** ${guild.name} a ${new Date()}`);

//});

//client.on('guildCreate', guild => {
  //client.channels.get('401402626945712128').sendMessage(`Le bot a **rejoint** ${guild.name} a ${new Date()}`);

//});

//client.on('guildMemberAdd', member => {
  //let guild = member.guild;
  //client.channels.get('401402626945712128').sendMessage(`${member.user.username} a **rejoint** ${guild.name}`);

//});

//client.on('guildMemberRemove', member => {
  //let guild = member.guild;
  //client.channels.get('401402626945712128').sendMessage(`${member.user.username} a **quitté** ${guild.name}`);

//});

//client.on('guildMemberUpdate' ,(oMember, nMember) => {
  //client.channels.get('401402626945712128').sendMessage(oMember, nMember);

//});

//client.on('guildUpdate' ,(oGuild, nGuild) => {
  //client.channels.get('401402626945712128').sendMessage(oGuild, nGuild);

//});

//client.on('guildBanAdd' ,(guild, user) => {
  //client.channels.get('401402626945712128').sendMessage(`${user.username} a était [ **BAN** ] de ${guild.name}`);

//});

//client.on('guildBanRemove' ,(guild, user) => {
  //client.channels.get('401402626945712128').sendMessage(`${user.username} a était [ **DEBAN** ] de ${guild.name}`);

//});
// Client Event
//client.on('channelCreate', channel => {
  //client.channels.get('401402626945712128').sendMessage(`Un salon **${channel.type}** nommé **${channel.name}** et était creer le **${channel.createdAt}** avec l'ID : **${channel.id}**`);


//});

//client.on('channelDelete', channel => {
  //client.channels.get('401402626945712128').sendMessage(`Le salon **${channel.type}** nommé **${channel.name}** et était supprimé avec succés, le **${channel.createdAt}**`);


//});

//client.on('channelUpdate', (oChannel, nChannel) => {
  //client.channels.get('401402626945712128').sendMessage(oChannel, nChannel);


//});

//client.on('channelPinsUpdate', (channel, time) => {
  //client.channels.get('401402626945712128').sendMessage(`Les broches pour **${channel.name}** ont été mis à jour à **${time}**`);


//});

//client.on('messageDelete', message => {
  //client.channels.get('401402626945712128').sendMessage(`Un message avec le contenu **${message.cleanContent}** a été supprimé de **${message.channel}**`);


//});

//client.on('messageDeleteBulk', message => {
  //client.channels.get('401402626945712128').sendMessage(` **${messages.size}** a été supprimé de **${message.channel}**`);


//});

//client.on('typingStart', (channel, user) => {
  //client.channels.get('401402626945712128').sendMessage(` **${user.username}** est en train d'écrire dans **${channel.name}**`);


//});

//client.on('typingStop', (channel, user) => {
  //client.channels.get('398918103012081685').sendMessage(` **${user.username}** s'est désisté a écrire dans **${channel.name}**`);


//});

client.on('guildMemberAdd', member => { // Make sure this is defined correctly.
  const welcomechannel = member.guild.channels.find('name', 'general')
  
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription('Bienvenue ' + `**${member.user.username}** !!`)
  return welcomechannel.send(embed)

});

client.on('guildMemberRemove', member => { // Make sure this is defined correctly.
  const welcomechannel = member.guild.channels.find('name', 'general')
  
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(`**${member.user.username}**` + " a quitté le serveur !!")
  return welcomechannel.send(embed)
  
});


//////////////////////////////////////////////////////////////////////////////


client.on('ready',() => {
 //bot.user.setPresence({ game: { name: "Open = [ !aide ]", type: 0 } });
 var memberCount = client.users.size;
 var servercount = client.guilds.size;
 var memberNumber = client.users.size;
 var serverNumber = client.guilds.size;
 var servers = client.guilds.array().map(g => g.name).join(',');

 console.log("--------------------------------------");
console.log('--> Bot By LarchitecT \n--> Connecter avec succès  \n--> Le préfix actuelle:  ' + prefix + " \n--> Nombre d'utilisateurs: " + ` ${client.users.size} ` + " \n--> Nombre salon: " + ` ${client.channels.size} ` + " \n--> Nombre de serveurs: " + ` ${client.guilds.size} `);
console.log("--------------------------------------");
console.log(chalk.green('√' + ' Bot chargé'));
console.log('______________________________________');

});

//////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////

var prefix = "!"
client.on('message', message => {
  var guild = message.guild;
  let args = message.content.split (' ').slice(1);
  var argresult = args.join(' ');

  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  
  //if (message.content.startsWith(prefix + 'createrole')) {
    //guild.createRole({name: 'Role test', color:'#00FFFF', mentionable:true}).catch(error => console.log(error));
  //} else

  //if (message.content.startsWith(prefix + 'giverole')) {
    //guild.member(message.mentions.users.first()).addRole('ID DU ROLE').catch(error => console.log(error));
  //} else

  //if (message.content.startsWith(prefix + 'takerole')) {
    //guild.member(message.mentions.users.first()).removeRole('ID DU ROLE').catch(error => console.log(error));
  //} else


  if (message.content.startsWith(config.prefix + 'setgame')) {
    if(message.author.id !== "323147880548270081") return;
      client.user.setGame(argresult); return message.reply('Mon **jeu** a était **modifié** avec **succés** !!')
  } else



  if (message.content.startsWith(config.prefix + 'setstatus')) {
    if(message.author.id !== "323147880548270081") return;
      client.user.setStatus(argresult); //return message.reply('Mon **status** a était **modifié** avec **succés** !!')
      // idle = absent | dnd = offline  | invisible = invisible  | online = online //
    } else 
  
    if(message.content.startsWith(config.prefix + `warn`)) {
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission **WARN** !!");
      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first(); 
      if (reason.length < 1) return message.reply('Vous devez fournir une raison pour l\'avertissement');
      if (message.mentions.users.size < 1) return message.reply('Vous devez mentionner quelqu\'un utilisateur').catch(console.error);
      var embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Action:', 'Warning')
      .addField('Utilisateur:', `${user.username}`)
      .addField('Raison:', `${reason}`)
      .addField('-------------------------', `WARN effectué par :`)
      .setThumbnail(`${message.guild.iconURL}`)
      .addField('Administrateur:', `${message.author.username}`);
      //return client.channels.get(modlog.id).sendEmbed(embed);
      message.channel.sendEmbed(embed);
    } else

    if(message.content.startsWith(config.prefix + `kick`)) {
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission **KICK** !!");
      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first();
      if (reason.length < 1) return message.reply('Vous devez fournir une raison pour **kick**');
      if (message.mentions.users.size < 1) return message.reply('Vous devez mentionner un utilisateur').catch(console.error);
      if (!message.guild.member(user).kickable) return message.reply('Je ne peux pas **KICK** ce membre');
      message.guild.member(user).kick();
      const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Action:', 'Kick')
      .addField('Utilisateur:', `${user.username}`)
      .addField('Raison:', `${reason}`)
      .addField('-------------------------', `KICK effectué par :`)
      .setThumbnail(`${message.guild.iconURL}`)
      .addField('Administrateur:', `${message.author.username}`);
      message.channel.sendEmbed(embed);
      
    } else
  
    if(message.content.startsWith(config.prefix + `ban`)) {
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission **BAN** !!");
      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first();
      if (reason.length < 1) return message.reply('Vous devez fournir une raison pour **ban**');
      if (message.mentions.users.size < 1) return message.reply('Vous devez mentionner un utilisateur').catch(console.error);
      if (!message.guild.member(user).bannable) return message.reply('Je ne peux pas **BAN** ce membre');
      message.guild.ban(user, 2);
      const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Action:', 'ban')
      .addField('Utilisateur:', `${user.username} Id: ${user.id}`)
      .addField('Raison:', `${reason}`)
      .addField('-------------------------', `BAN effectué par :`)
      .setThumbnail(`${message.guild.iconURL}`)
      .addField('Administrateur:', `${message.author.username}`);
      message.channel.sendEmbed(embed);
      
    } else

    if(message.content.startsWith(config.prefix + `deban`)) {
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission **DEBAN** !!");
      let reason = args.slice(1).join(' ');
      let user = args[0];
      if (reason.length < 1) return message.reply('Vous devez fournir une raison pour **deban**');
      if (!user) return message.reply('Vous devez mentionner un utilisateur').catch(console.error);
      message.guild.unban(user);

      const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Action:', 'deban')
      .addField('Utilisateur:', `${user.username}`)
      .addField('-------------------------', `DEBAN effectué par :`)
      .setThumbnail(`${message.guild.iconURL}`)
      .addField('Administrateur:', `${message.author.username}`);
      message.channel.sendEmbed(embed);
      
    } else


  
    if(message.content.startsWith(config.prefix + `lock`)) {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage("Vous n'avez pas la permission **LOCK** !!");
      if (!client.lockit) client.lockit = [];
      let time = args.join(' ');
      let validUnlocks = ['release', 'unlock'];
      if (!time) return message.reply('Vous devez définir une durée pour le verrouillage; en heures, minutes ou secondes');
    
      if (validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
          SEND_MESSAGES: null
        }).then(() => {
          message.channel.sendMessage('Verrouillage terminé');  '\u2713' + ' Bot chargé'
          clearTimeout(client.lockit[message.channel.id]);
          delete client.lockit[message.channel.id];
        }).catch(error => {
          console.log(error);
        });
      } else {
        message.channel.overwritePermissions(message.guild.id, {
          SEND_MESSAGES: false
        }).then(() => {
          message.channel.sendMessage(`Canal verrouillé pour ${ms(ms(time), { long:true })}`).then(() => {
    
            client.lockit[message.channel] = setTimeout(() => {
              message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: null
              }).then(message.channel.sendMessage('Verrouillage terminé')).catch(console.error);
              delete client.lockit[message.channel.id];    
            }, ms(time));
    
          }).catch(error => {
            console.log(error);
          });
        });
      }
    
    } else
      
    if(message.content.startsWith(config.prefix + `speak`)) {
      message.channel.send(message.content);
      
    } else
      
      
      
      if(message.content.startsWith(config.prefix + `8ball`)) {
     if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
     else message.channel.sendMessage("Je ne peux pas lire ça");
      
    }

    });
    
    
    
     client.on('message', message => {
      if (message.author.bot) return;
      if (!message.content.startsWith(config.prefix)) return;
    
      let command = message.content.split(" ")[0];
      command = command.slice(config.prefix.length);
    
      var args = message.content.split(" ").slice(1);
      var msgauthor = message.author.id;
    
      if(message.author.bot)return;
    
      if(!db.get("xp").find({user: msgauthor}).value()){
          db.get("xp").push({user: msgauthor, xp: 1}).write();
      } else
      if(!db.get("level").find({user: msgauthor}).value()){
          db.get("level").push({user: msgauthor, level: 1}).write();
      }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        var userleveldb = db.get("level").filter({user: msgauthor}).find('level').value();
 
        var userxp = Object.values(userxpdb)
        var userlevel = Object.values(userleveldb)
   
   
    
        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
        db.get("level").find({user: msgauthor}).assign({user: msgauthor, level: userlevel[1] += 1}).write();
    
      }
      
    
      if (command === "add") {
          let numArray = args.map(n=> parseInt(n));
          let total = numArray.reduce( (p, c) => p+c);
    
          message.channel.sendMessage(total);
          
          
      }
    
      if(command === "2307199227101991666") {
        // faire dire quelque chose au bot et supprime le message. À titre d'exemple, il est ouvert à tous. 
        // Pour obtenir le "message" lui-même, nous rejoignons le `args` dans une chaîne avec des espaces:
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
    
        message.channel.send(sayMessage);
        
        
      }
    
       
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
      if(command === "") {
    
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
        var help_embed = new Discord.RichEmbed()
        .setColor('#DA0007')
        .addField(`${message.author.username}`,`${message.content}`)
        .setThumbnail(`${message.author.avatarURL}`)
        .setFooter("By LarchitecT")
        message.channel.sendEmbed(help_embed);
    
        
        
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
      }
    
    
      if(message.content.startsWith(prefix + "eval")) {
          if(message.author.id !== "323147880548270081") return;
          try {
              var code = args.join(" ");
              var evaled = eval(code);
    
              if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
              message.channel.send(clean(evaled));
          } catch(err) {
              message.channel.send(`\`ERREUR\` \`\`\`x1\n${clean(err)}\n\`\`\``);
          }
          console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la [ Eval ]\n--------------------------------------`);
      }
    
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    if (message.content === prefix + "xp"){
      var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
      var level = db.get("level").filter({user: msgauthor}).find('level').value()
      var xpfinal = Object.values(xp);
      var levelfinal = Object.values(level);

      var xp_embed = new Discord.RichEmbed()
          .addField(`Nombre d'utilisations du BOT :`, `**${xpfinal[1]}** `)
          .addField(`Nombre de messages envoyer :`, `**${levelfinal[1]}** `)
          .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
          .setThumbnail(`${message.author.avatarURL}`)
      message.channel.send({embed: xp_embed});
      
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ Xp ]\n--------------------------------------`); 
      
    }  
    })
     
    //////////////////////////////////////////////////////////////////////////////////////////
    
    client.on('message', message => {   
      
      if (message.content === `${prefix}off`){
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage("Vous n'avez pas la permission **OFF** !!");
      var help_embed = new Discord.RichEmbed()
       .setColor('#FF0000')
       .addField(":globe_with_meridians:->[ EXTINCTION EN COURS ]<-:globe_with_meridians: ","Je suis désormais [ **OFF** ]")
       message.channel.sendEmbed(help_embed);
      message.delete().catch(O_o=>{}); 
      
    /////////////////////////////////////////////////////////////////////////////////////
      
    } if (message.content === `${prefix}listemo`){
  const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
  message.channel.send(emojiList);

    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    
    } if (message.content === `${prefix}caracteres`){
      var help_embed = new Discord.RichEmbed()
       .setColor('#FF0000')
       .addField(":globe_with_meridians:->[ CARACTERES SPECIAUX ]<-:globe_with_meridians: ","۩ ๑ ۞ ♥ ஐ • @ ღ ● ₪ √ ™ № ╬ ~ ξ € ﺕ ≈ ॐ ♪ ® ♂ ♀ û â î ♣ ♠ ◊ εїз ^ + * & % # ¨ o 0 »-> ø ¤ ? ¿ © † ♡ <-« ๏ ย ร ø ж ° ■ஹ ஸ ఋ ఊ ௌ ொ இ ౖ ௲ ூ ஃ ஊ ஏ ஐ ஒ ஓ ஔ ஜ ஞ ి ಔ ృ ూ ప ௯ ௮ ி ஞ ஜ ಋ ౡౠ ౖ ಱ ಯ ಮ ಭ ಬ ￼↔ ↕ ﻬ ҳ̸Ҳ̸ҳ ± Ψ۝ ╦ ╩ § ▲♦ ¶ ∩ $ ¼ ½ ¾ x » « ╚> <╝❤♫ ♬ ♪ ♩ ♭ ♪☀ ஐღ♂♀♥♡☜☞☎☏♠♣▣▤▥▦▩♬♪♩♭♪の☆→あⓛⓞⓥⓔ｡°º¤•εïз╬㊈㊉㊊㊋㊌㊍㊎㊏㊐㊑㊒㊓㊔㊕㊖㊗⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㊀㊁㊂㊃㊄㊅㊆㊇㊈㊉㊊のஐღ♂ ♀ ♥ ♠ ♣ ♪ の ☆→ あⓛⓞⓥⓔ ｡°º¤•εïз ╬㊈㊉㊊㊋㊌㊍㊎㊏ ㊐㊑㊒㊓㊔㊕㊖ ◊① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩ ™ ╬ ღ ♂ ♀ ♥ ↔ ↕ → ← ▪ ๑ ▄ █ ▌ ✄ © ® ⁂ ░ ▒ ▒ ▓ ◊ ◦ ♠ ♣ ♪ の → ° ■ ♀ Ψ № ← ∑ ξ ζ ω ∏ √ ∩ ¤ ∞ ≡ ▄ ≠ ^_^ ─ = » « ﺴ ۩ ๑ ๑ ۩ ۞ ۩ ๑ ▲ γ ō ◊♥╠═╝▫■□۩۞๑»«ஐҳ̸Ҳ̸ҳ©†εïз♪ღ♣♠•±җ۝°•  ോ ൌ ് ൗ ൠ ാ ി ീ ു ൂ ൃ ಂ ಃ ಅ ಆ ಇ ಈ ಉ ಊ ಋ ಌ ಎ ಏ ಐ ಒ ಓ ಔ ಕ ಖ ಗ ಘ ಙ ಚ ಛ ೠ ೡ ೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯ ௩ ௪ ௫ ௬ ௭ ௮ ௯ ௰ ௱ ௲ ભ મ ય ર લ ળ વ શ ४ ५ ६ ७ ८ ९॑ ॒ ॓ ॔ क़ ख़ ग़ ज़ ड़ ढ़ फ़ य़ ॠ ॡ ॢ ॣ ")
       message.channel.sendEmbed(help_embed);
    
       var help_embed = new Discord.RichEmbed()
       .setColor('#FF0000')
       .addField("Page 2 ","। ॥ ० १ा ि ी ु ू ृ ँ ं ः ॄ ॅ ॆ े ै ॉ ॊ ो ौ ् ़ॐ २ ڧ ڨ ை३ ஹ ஸ ್ರ ಳ್௮ ಆ ಕ್ಷ್ ఋ ன ಠ್ ಳ್ ப ம உ ஊ ఊ ௌ ொ இ ౖ ௲ ூ ஃ ஊ ஏ ஐ ஒ ஓ ஔ ஜ ஞ ి ಔ ృ ూ ప ௯ ௮ ி ஞ ஜ ಋ ౡౠౖ ಱ ಯ ಮ ಭ ಬ ￼ ҈ لّـّـّّا ® © җ ♥ ♂ ♀ ♥ ↔ ↕ ▪ ๑ ಕ▄ █ °¹²³∙ ▒ ◊ ◦ ♠ ♣ ♪ の →°■♀ Ψ №← ∑ ξ ζ ω ∏ √ ∩¤ ∞≡ ▄ ≠ ^_^ ─ = ≈≌ ﺴ۩๑ ๑۩۞۩๑ ▓ ▲ γ ō ╦ ╩ ε ┘ ┌ ╬ ω § Θ I ™ ۣ۞ ۝ ù ν ώ x ч ž ۩₪۩ﺴ۩๑ ೪.೫ ๑۩۞۩๑ »»--><--«« ๑۩۞۩๑๑۩ﺴ≈۩₪۩ ∂ † ‡ ‼ ﻙ ფ ﻍ ﻪა ბ გ დ ხ ჯ ჰ ჱ ე ป ผ ฝ พ ฟ ภ ม ย ร ฤ ล ฦ ว ศ ษ ส •.:.•ോ سيف ભ મ ય ર લ ળ વ શ ષ સ હ ઼ ઽ ા િ ી ુ ૂ ૃ ૄ ૅ ે ૈ ૉ ો ૌ ્ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স ঁ ং ঃ অ আ ই ঈ উ ঊ ঋ ঌ এ ঐ ও ঔ ক খ গহ ಐ ಓ ಔ ಕ ಖ ಗ ಘ ಙ ಝ ಞ ಲ ಶ ಹ ೀ ಾ ಿ ಧಿ ೈ ೋ ೌ ೬ ೂ ೄ .:｡✿*ﾟ‘ﾟ･✿.｡.:* *.:｡✿*ﾟ’ﾟ･✿.｡.:* *.:｡✿*ﾟ¨ﾟ✎･ ✿.｡.:* *.:｡✿*ﾟ¨ﾟ✎･✿.｡.:*【】√ ¤ ∞ ㊝ ≡ ✖ ™ 乀 の♈ ◖◗♋ 灬 ≈ ◈Ш ǎ ☃ ☎ ☏ ☺ ☻ ▧ ▨ ♨ ◐ ค ๒ ς ๔ є Ŧ ﻮ ђ เ ן к l ๓ ภ ๏ ק ợ г ร t ย ש ฬ ץ א z α в c ∂ ε ғ g н ι נ к ℓ м η σ ρ q я s т υ v ω x ү z ά в ς đ έ ғģ ħ ί ј ķ Ļ м ή ό ρ q ŕ ş ţ ù ν ώ x ч ž ")
       message.channel.sendEmbed(help_embed);
    
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ Caracteres ]\n--------------------------------------`);  
    
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    }  if (message.content === ("ping")){
      message.channel.send(`${message.author.username}` + ' Voici les resultats !!').then((msg) => {
        msg.edit()
        var help_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField(":globe_with_meridians:->[ PING ]<-:globe_with_meridians: ",'Le **BOT** a mis: ' + `[ **${msg.createdTimestamp - message.createdTimestamp}**`+ ' **Ms** ] pour repondre.\nEt l\'**API** a mis: ' + `[ **${Math.round(client.ping)}**`+ ' **Ms** ] pour repondre')
        message.channel.sendEmbed(help_embed);
                 
                 });

   
       
       
       
   
    ///////////////////////////////////////////////////////////////////////////////////////

  }  if (message.content === ("Ping")){
    message.reply(' Le **pong** est de : ' + ` ${Date.now() - message.createdTimestamp} `+'Ms')
    
    console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ Ping ]\n--------------------------------------`); 
    
  
  ///////////////////////////////////////////////////////////////////////////////////////
    
    
      
      
    } if (message.content === `${prefix}on`){
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage("Vous n'avez pas la permission **ON** !!");
      var help_embed = new Discord.RichEmbed()
       .setColor('#00FF33')
       .addField(":globe_with_meridians:->[ ALLUMAGE EN COURS ]<-:globe_with_meridians: ",`Je suis désormais [ **ON** ]\n\nAvec un **pong** de ${Date.now() - message.createdTimestamp} Ms `)
       message.channel.sendEmbed(help_embed);
      message.delete().catch(O_o=>{}); 
       
      
    
    } if (message.content === `${prefix}gta`){
      var help_embed = new Discord.RichEmbed()
       .setColor('#00FFAF')
       .addField(":globe_with_meridians:->[ UPDATE GTA ]<-:globe_with_meridians: ",`https://mega.nz/#!AXhh1a4Z!XzulCkeccj7Yl_pJfzLa8LtY32KhKQNmTyPlNanXuXo`)
       .setThumbnail("https://img15.hostingpics.net/pics/445492Sanstitre1.png")
       .setImage("https://img15.hostingpics.net/pics/954921Sanstitre2.jpg")
       .setFooter("© By LarchitecT")
       message.channel.sendEmbed(help_embed);
      message.delete().catch(O_o=>{}); 
    
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ Gta ]\n--------------------------------------`); 
      
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === `${prefix}aide`){
     var help_embed = new Discord.RichEmbed()
      .setColor('#00FF33')
      .addField(":globe_with_meridians:->[ AIDE MENU ]<-:globe_with_meridians: ","--------------------------------")
      .addField(`Pour afficher une aide veuillez taper [ ${prefix}aide ]`, `Ou **${prefix}aide** [command] *Exemple de commandes* : || [music] || [ban] || [kick] || [supr]\n\n--------------------------------`)
      .addField(`:wrench: ${prefix}changelog :wrench: `, `:white_small_square: ${prefix}changelog ---*Pour voir les dernieres mises a jour*`)
      .addField(`:large_orange_diamond: ${prefix}music`, `:small_blue_diamond: ${prefix}music play [Titre musique / url] ---*Pour mettre votre musique en playlist*\n:small_blue_diamond: ${prefix}music start ---*Pour que le bot rejoigne votre salon*\n:small_blue_diamond: ${prefix}music next ---*Passer à la musique suivante*\n:small_blue_diamond: ${prefix}music pause ---*Met la musique en pause*\n:small_blue_diamond: ${prefix}music reprendre ---*Reprendre la musique*\n:small_blue_diamond: ${prefix}music queue ---*Met la musique en file d'attente*\n:small_blue_diamond: ${prefix}music purge ---*Purge la file d'attente*\n:small_blue_diamond: ${prefix}music np ---*Affiche la musique en cours*\n:small_blue_diamond: ${prefix}music vol [ entre 0 et 100 ] ---*Monte et baisse le volume*\n:small_blue_diamond: ${prefix}music quitte ---*Pour que le bot quitte votre salon*`)
      .addField(`:large_orange_diamond: ${prefix} [Message]`, `:small_blue_diamond: ${prefix} [Message] ---*Pour afficher vos messages dans un Embed*`)
      .addField(`:large_orange_diamond: ${prefix}| [Message]`, `:small_blue_diamond: ${prefix}| [Message] ---*Lancer un vote*`)
      .addField(`:large_orange_diamond: ${prefix}/ [Message]`, `:small_blue_diamond: ${prefix}/ [Message] ---*Lancer un vote ANONYME*`)
      .addField(`:large_orange_diamond: ${prefix}afk`, `:small_blue_diamond: ${prefix}afk [Message] ---*Pour vous mettre AFK*`)
      .addField(`:large_orange_diamond: ${prefix}info`, `:small_blue_diamond: ${prefix}info [Mention] ---*Pour voir les informations d un utilisateur*`)
      .addField(`:large_orange_diamond: ${prefix}add`, `:small_blue_diamond: ${prefix}add [Nombres] ---*Pour additionner des nombres exemple: 50 50*`)
      .addField(`:large_orange_diamond: ${prefix}stats`, `:small_blue_diamond: ${prefix}stats ---*Pour voir les stats du Bot*`)
      .addField(`:large_orange_diamond: ${prefix}id`, `:small_blue_diamond: ${prefix}id ---*Pour voir l'id d'un utilisateur*`)
      .addField(`:large_orange_diamond: ${prefix}xp`, `:small_blue_diamond: ${prefix}xp ---*Pour afficher votre score d'utilisation de NANO-BOT*`)
      .addField(`:large_orange_diamond: ${prefix}troll`, `:small_blue_diamond: ${prefix}troll ---*Pour afficher une image TROLL*`)
      .addField(`:large_orange_diamond: ${prefix}form`, `:small_blue_diamond: ${prefix}form ---*Affiche une aide à la mise en forme de texte*`)
      .addField(`:large_orange_diamond: ${prefix}caracteres`, `:small_blue_diamond: ${prefix}caracteres ---*Affiche une liste de caracteres speciaux*`)
      .addField(`:large_orange_diamond: ${prefix}codebox`, `:small_blue_diamond: ${prefix}codebox ---*Affiche une aide à la mise en forme de boxcod*`)
      .addField(`:large_orange_diamond: ${prefix}code`, `:small_blue_diamond: ${prefix}code ---*Affiche une aide à la mise en forme d'embed [pour developpeur]'*`)
      .addField(`:large_orange_diamond: ${prefix}server`, `:small_blue_diamond: ${prefix}server ---*Pour voir les infos du serveur actuel*`)
      .addField(`:large_orange_diamond: ${prefix}debug`, `:small_blue_diamond: ${prefix}debug ---*Pour voir les informations sur l'hebergeur du Bot*`)
      .addField(`:large_orange_diamond: ${prefix}gol`, `:small_blue_diamond: ${prefix}gol ---*Envoyer un IP Logger*`)
      .addField(`:large_orange_diamond: ${prefix}cod`, `:small_blue_diamond: ${prefix}cod ---*Le code d'acces a votre IP Logger*`)
      message.channel.sendEmbed(help_embed);
      var help_embed = new Discord.RichEmbed()
      .setColor('#00FF33')
      .addField(`:large_orange_diamond: ${prefix}track`, `:small_blue_diamond: ${prefix}track ---*Vous affiche toute les adresses IP d'un site internet*`)
      .addField(`:large_orange_diamond: ${prefix}color`, `:small_blue_diamond: ${prefix}color ---*Un selecteur de couleurs HTML*`)
      .addField(`:large_orange_diamond: ${prefix}gta`, `:small_blue_diamond: ${prefix}gta ---*PKG GTA5 [ Update 99% No Freeze ]*`)
      .addField(":large_orange_diamond: tatsubg", ":small_blue_diamond: tatsubg ---*Le Bot vous donneras le lien du site de changement de background tatsumaki*")
      .addField(":large_orange_diamond: Manga Steam", ":small_blue_diamond: Manga Steam ---*Le Bot vous donneras le lien d'une chaine Steam mangas*")
      .addField(":large_orange_diamond: Ping", ":small_blue_diamond: ping *Vous donne le temps en miliseconde de la reception du pong*")
      .addField(":large_orange_diamond: PSID", ":small_blue_diamond: *Un génèrateur de PSID pour vos PS3 bann*")
      .addField(`:large_orange_diamond: spacebot`, ":small_blue_diamond: *Le Bot vous envoi une invitation*")
      .addField(":diamonds: PANEL MODERATION", ":small_blue_diamond: !admin ---*Pour ouvrir le panel de modération*")
      .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
      message.channel.sendEmbed(help_embed);
      
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} :  A ouvert la fonction ${(chalk.green('[ Aide ]'))}\n--------------------------------------`); 
      
    
    ///////////////////////////////////////////////////////////////////////////////////////

  } if (message.content === `${prefix}aide music`){
    var help_embed = new Discord.RichEmbed()
     .setColor('#00FF33')
     .addField(":globe_with_meridians:->[ AIDE MUSIC ]<-:globe_with_meridians: ","--------------------------------")
     .addField(`:large_orange_diamond: Les commandes [ ${prefix}music ]`, `:small_blue_diamond: **${prefix}music play [Titre musique / url]** ---*Pour mettre votre musique en playlist*\n:small_blue_diamond: **${prefix}music start** ---*Pour que le bot rejoigne votre salon*\n:small_blue_diamond: **${prefix}music next** ---*Passer à la musique suivante*\n:small_blue_diamond: **${prefix}music pause** ---*Met la musique en pause*\n:small_blue_diamond: **${prefix}music reprendre** ---*Reprendre la musique*\n:small_blue_diamond: **${prefix}music queue** ---*Affiche la file d'attente*\n:small_blue_diamond: **${prefix}music purge** ---*Purge la file d'attente*\n:small_blue_diamond: **${prefix}music np** ---*Affiche la musique en cours*\n:small_blue_diamond: **${prefix}music vol [ entre 0 et 100 ]** ---*Monte et baisse le volume*\n:small_blue_diamond: **${prefix}music quitte** ---*Pour que le bot quitte votre salon*`)
     .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
     message.channel.sendEmbed(help_embed);
     
     console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} :  A ouvert la fonction ${(chalk.green('[ Aide ]'))}\n--------------------------------------`); 
     
   
   ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === `${prefix}admin`){
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage("Vous n'avez pas la permission **ADMIN** !!");
      var help_embed = new Discord.RichEmbed()
       .setColor('#FF0000')
       .addField(":globe_with_meridians:->[ AIDE ADMINISTRATION ]<-:globe_with_meridians: ","--------------------------------")
       .addField("Une partie du panel ADMIN est en maintenance", "Il serra disponible trés bientot")
       .addField(`Pour afficher une aide veuillez taper [ ${prefix}aide ]`, `Ou **${prefix}aide** [command] *Exemple de commandes* : || [music] || [ban] || [kick] || [supr]\n\n--------------------------------`)
       .addField(":wrench: changelog :wrench: ", `:white_small_square: ${prefix}changelog ---*Pour voir les dernieres mises a jour*`)
       .addField(":diamonds: warn", `:small_orange_diamond: ${prefix}warn [Mention] [Raison] ---*Pour [ Warn ] des utilisateurs*`)
       .addField(":diamonds: lock", `:small_orange_diamond: ${prefix}lock [s/m/h] ---*Pour [ Vérrouiller ] un salon*`)
       .addField(":diamonds: supr", `:small_orange_diamond: ${prefix}supr [Nombre] ---*Pour supprimer les derniers messages selon le nombre*`)
       .addField(":diamonds: kick", `:small_orange_diamond: ${prefix}kick [Mention] [Raison] ---*Pour kick un membre du serveur*`)
       .addField(":diamonds: ban", `:small_orange_diamond: ${prefix}ban [Mention] ---*Pour bannir un membre du serveur*`)
       .addField(":diamonds: !>", `:small_orange_diamond: ${prefix}> [Message] ---*Pour lancé un vote anonyme en @everyone*`)
       //.addField(":diamonds: mute", `:small_orange_diamond: !mute [Mention] [durée en minutes] [raison] ---*Pour mute un membre*")
       .addField(":white_small_square: Il vous faut les PERMISSIONS pour utiliser ce panel !! ", "--------------------------------")
       .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ Admin aide ]'))}\n--------------------------------------`);
     
    
      ///////////////////////////////////////////////////////////////////////////////////////

    } if (message.content === `${prefix}aide ban`){
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission **BAN** !!");
      var help_embed = new Discord.RichEmbed()
       .setColor('#FF0000')
       .addField(":globe_with_meridians:->[ AIDE BAN ]<-:globe_with_meridians: ","--------------------------------")
       .addField(":diamonds: Ban commande", `:small_orange_diamond: ${prefix}ban [Mention] [Raison] ---*Pour bannir un membre du serveur*`)
       .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ Admin aide ]'))}\n--------------------------------------`);
     
    
      ///////////////////////////////////////////////////////////////////////////////////////

    } if (message.content === `${prefix}aide kick`){
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission **KICK** !!");
      var help_embed = new Discord.RichEmbed()
       .setColor('#FF0000')
       .addField(":globe_with_meridians:->[ AIDE KICK ]<-:globe_with_meridians: ","--------------------------------")
       .addField(":diamonds: Kick commande", `:small_orange_diamond: ${prefix}kick [Mention] [Raison] ---*Pour kick un membre du serveur*`)
       .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ Admin aide ]'))}\n--------------------------------------`);
     
    
      ///////////////////////////////////////////////////////////////////////////////////////

    } if (message.content === `${prefix}aide supr`){
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Vous n'avez pas la permission **MANAGE_MESSAGES** !!");
      var help_embed = new Discord.RichEmbed()
       .setColor('#FF0000')
       .addField(":globe_with_meridians:->[ AIDE SUPR ]<-:globe_with_meridians: ","--------------------------------")
       .addField(":diamonds: Supr commande", `:small_orange_diamond: ${prefix}supr [Nombre] <500 Max> ---*Pour supr des messages*`)
       .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ Admin aide ]'))}\n--------------------------------------`);
     
    
      ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === `${prefix}changelog`){
      var help_embed = new Discord.RichEmbed()
       .setColor('#4fbcd7')
       .addField(`:globe_with_meridians:->[ CHANGELOG ]<-:globe_with_meridians: `,`Effectuer le 13/01/2018\n\n--------------------------------`)
       .addField(`Pour afficher une aide veuillez taper [ ${prefix}aide ]`, `Ou **${prefix}aide** [command] *Exemple de commandes* : || [music] || [ban] || [kick] || [supr]\n\n--------------------------------`)
       .addField(`:large_orange_diamond: ${prefix} [Message]`, `:small_blue_diamond: ${prefix} [Message] ---*Pour afficher vos messages dans un Embed*`)
       .addField(`:large_orange_diamond: ${prefix}${prefix} [Message]`, `:small_blue_diamond: ${prefix}${prefix} [Message] ---*Lancer un vote*`)
       .addField(`:large_orange_diamond: ${prefix}/ [Message]`, `:small_blue_diamond: ${prefix}/ [Message] ---*Lancer un vote ANONYME*`)
       .addField(`:large_orange_diamond: ${prefix}xp`, `:small_blue_diamond: ${prefix}xp ---*Pour afficher votre score d'utilisation de NANO-BOT*`)
       .addField(`:large_orange_diamond: ${prefix}form`, `:small_blue_diamond: ${prefix}form ---*Affiche une aide à la mise en forme de texte*`)
       .addField(`:large_orange_diamond: ${prefix}codebox`, `:small_blue_diamond: ${prefix}codebox ---*Affiche une aide à la mise en forme de boxcod*`)
       .addField(`:large_orange_diamond: ${prefix}gol`, `:small_blue_diamond: ${prefix}gol ---*Envoyer un IP Logger*`)
       .addField(`:large_orange_diamond: ${prefix}cod`, `:small_blue_diamond: ${prefix}cod ---*Le code d'acces a votre IP Logger*`)
       .addField(`:large_orange_diamond: ${prefix}track`, `:small_blue_diamond: ${prefix}track ---*Vous afficher toute les adresses IP d'un site internet*`)
       .addField(`:large_orange_diamond: ${prefix}color`, `:small_blue_diamond: ${prefix}color ---*Un selecteur de couleurs HTML*`)
       .addField(`:large_orange_diamond: ${prefix}warn`, `:small_blue_diamond: ${prefix}warn ---*WARN un utilisateur*`)
       .addField(`:large_orange_diamond: ${prefix}lock`, `:small_blue_diamond: ${prefix}lock ---*VERROUILLER un salon*`)
       .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ Changelog ]'))}\n--------------------------------------`);  
     
///////////////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === `${prefix}color`){
      
      var help_embed = new Discord.RichEmbed()
       .setColor('#4700ff')
       .addField("Selecteur de couleurs HTML","http://www.space-boot.com/color.html")
       .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ Color ]\n--------------------------------------`);
    
////////////////////////////////////////////////////////////////////////////////////////////////


      } if (message.content === `${prefix}nameserv`){
        
        var help_embed = new Discord.RichEmbed()
         .setColor('#4700ff')
         .addField(`${message.author.username} Voici tous mes serveurs`,`${client.guilds.array().map(g => g.name)},Cap-Lobby,AlienDead,MARVINGAME,Animouto,⚡ Deuz | Community ⚡,VideoGameΛcademy,Níþersh Folcsmút,SmG Gaming Community,Catalyst,Faction Gaming Network,Tsuyu's 🐸 Shrine,Gfycat,Gamer Seeks Gamer,Gaming & Anime,EC || Bot & Dev || General,THE SEWER,Artzy Gamers,The Slippery Squad,PUBG Team Finder,Organization X,INTENSE GAMING HALL,Duck Group 🎉🎆,Suite 7A,CS:GO Russian Community,⭐BooBies⭐ LEWD ANIME, HENTAI, & MILK BAR⭐,#САЛО_НАШЕ,𝐆𝐚𝐦𝐞𝐫𝐬 𝐈𝐓𝐀,`)
         .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
         message.delete().catch(O_o=>{}); 
         message.channel.sendEmbed(help_embed);
    
         var help_embed = new Discord.RichEmbed()
         .setColor('#4700ff')
         .addField(`${message.author.username} Page 2 de mes serveurs`,`✅ Dikson☯ne ❉ News Blog 🚀,Evo-Forever,❄#Joned🌐Voice⛄🎅👩,Otaku-Sammelstelle,LGBTQ+ Lounge,UzGame,Chally´s,💤💤💤,🎄UA Gaming 🎮🎄,TOP - Dead By Daylight,|LAMPØTA|,SingularityZ™ Fleet,𝕰𝖝𝖎𝖒𝖎𝖔𝖚𝖘,GAMERZ WORLD,Project Art ★,Kpop+ 🎁 🎄 🎁,League of Legends,Cafe 0131+,💎Всё и сразу💎,Cafè Bacon🌹,🎄|Боyт Байт|🎄,☃ Fire-Squad ® ♠♠♠,๖̶̶̶ζ͜͡The Lost Shadows,🎄 VITALIK STEEP 🎄,ⱾǿŁȺƦ,💀 SkellingTown 💀,Kasper's Cabin 👻,The Hotel Motel,Les petites fleurs 🌻,✩ Space ✬ RP ✩,Kebab Sports,EXELEON™,Knights RP,❄ КОНФА НЕРМИЗА ;3 ❄,Darkness,(っ◔◡◔)っ ♥ TRIPWIRE ♥,ResetWorld-Co,`)
         .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
         message.delete().catch(O_o=>{}); 
         message.channel.sendEmbed(help_embed);
    
         var help_embed = new Discord.RichEmbed()
         .setColor('#4700ff')
         .addField(`${message.author.username} Page 3 de mes serveurs`,`THΞ NΞΩN ΛRMY,Adult Swim🔞,YouTuber Community,FLAVORTOWN,[GamerFreakz],🍁 Canada eh? 🍁,ARK: Survival Evolved,🙉 Otaku Empire 🙉,THE DAILY CHAT,/r/TylerTheCreator,☆ Link Opening a Discord Server ☆,TITAN PUBLIC,🎄🎁[SRB2] Sonic Robo Blast 2 VK,Recursion🎄,MultiFaction NetWork,MusicLovers,❤ Friendship Gaming™ ❤,PlatinumDragons,★ GameZone ★,RParadise,League of Valkyrie EUW,Soul Society🐲,FOREX,Gaming Squad,The way - Anime,Ez Team,Team "Stalker" ✪,Path of Exile RU [PoE],ℛ∪ℬω✔,KillerZ Slashers,⚡N.E.R.D.S⚡,I N F I N I T Y`)
         .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
         message.delete().catch(O_o=>{}); 
         message.channel.sendEmbed(help_embed);
       
         console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ NameServ ]'))}\n--------------------------------------`);
       
       
    
      ///////////////////////////////////////////////////////////////////////////////////////
    
    
    } if (message.content === `${prefix}track`){
      
      var help_embed = new Discord.RichEmbed()
       .setColor('#c7ff00')
       .addField("Tracker de site web","https://censys.io/")
       .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ Track ]'))}\n--------------------------------------`); 
     
    
      ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === `${prefix}form`){
      var help_embed = new Discord.RichEmbed()
       .setColor('#0026FF')
       .addField(":globe_with_meridians:->[ TEXTE FORM ]<-:globe_with_meridians:", "----------------------------------")
       .addField("`*italique*`","Ex : *italique*\n-----------------------")
       .addField("`**gras**`", "Ex : **gras**\n-----------------------")
       .addField("`***italique gras***`", "Ex : ***italique gras***\n-----------------------")
       .addField("`~~barre~~`", "Ex : ~~barre~~\n-----------------------")
       .addField("`__souligne__`", "Ex : __souligne__\n-----------------------")
       .addField("`__*italique souligne*__`", "Ex : __*italique souligne*__\n-----------------------")
       .addField("`__**gras souligne**__`", "Ex : __**gras souligne**__\n-----------------------")
       .addField("`__***italique gras souligne***__`", "Ex : __***italique gras souligne***__\n-----------------------")
       message.channel.sendEmbed(help_embed);
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ Form ]'))}\n--------------------------------------`);
     ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === `${prefix}codebox`){
       var help_embed = new Discord.RichEmbed()
       .setColor('#5B74FF')
       .addField(":globe_with_meridians:->[ COD-BOX ]<-:globe_with_meridians: ","--------------------------------")
       .addField("[ ↵ ]  Signifie un retour à la ligne", "--------------------------------")
       .addField("` ` 00 TEST [ENVELOPPE DE BASE] ` `", "`# 00 TEST [ENVELOPPE DE BASE]`\n--------------------------------")
       .addField("` ```Markdown [ ↵ ] # 01 TEST [MARKDOWN] [ ↵ ]``` `", "```Markdown\n# 01 TEST [MARKDOWN]\n{Inserer un # pour afficher le bleu}\n```\n--------------------------------")
       .addField("` ```css [ ↵ ] # 02 TEST [CSS] [ ↵ ]``` `", "```css\n# 02 TEST [CSS]\n{Entre accolades & Deriere 2 points = jaune:}\n```\n--------------------------------")
       .addField("` ```js [ ↵ ] # 03 TEST [JS] [ ↵ ]``` `", "```js\n# 03 TEST [JS]\n{Le JS affiche les nombres 03 & les balises if en vert}\n```\n--------------------------------")
       .setFooter("© Aides Form & Box By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ CodBox ]'))}\n--------------------------------------`);  
       
     
     ///////////////////////////////////////////////////////////////////////////////////////

    } if (message.content === `${prefix}troll`){
      message.delete().catch(O_o=>{}); 
      var help_embed = new Discord.RichEmbed()
      .setColor('#5B74FF')
      .setImage("https://i.imgur.com/gjv5CaH.gif")
      .setFooter(`© By ${message.author.username}`,`${message.author.avatarURL}`)
      message.channel.sendEmbed(help_embed);
      
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ CodBox ]'))}\n--------------------------------------`);  
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    
    } if (message.content === `${prefix}server`){
      const data = client.channels.get(message.channel.id);
      moment.locale("fr");
      var temps = moment(data.createdTimestamp).format("LLLL");
      var help_embed = new Discord.RichEmbed()
       .setColor('#DA0007')
       .addField(":globe_with_meridians:->[ SERVER STATS ]<-:globe_with_meridians:", "----------------------------------")
       .addField("Nom du server:", `${data.guild}`, true)
       .addField("Nombre de membre:", `${message.guild.members.size}`, true)
       .addField("Nombre de channel:", `${message.guild.channels.size}`, true)
       .addField("Nom du channel:", `${data.name}`, true)
       .addField("Type de channel:", `${data.type}`, true)
       .addField("Channel id:", `${data.id}`, true)
       .addField("Server id:", `${message.guild.id}`, true)
       .addField("emoji list:", `${message.guild.emojis.map(e=>e.toString()).join(" ")}`, true)
       .setThumbnail(`${message.guild.iconURL}`)
       .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ InfoServer ]'))}\n--------------------------------------`);  
    } 
    
    
   
    
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    //} if (message.content){
     //message.delete().catch(O_o=>{}); 
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    if (message.content === "tatsubg"){
      var help_embed = new Discord.RichEmbed()
       .setColor('#DA0007')
       .addField("Background de profil Tatsumaki", "http://k6.re/s1J6w")
       message.channel.sendEmbed(help_embed);
       
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ TatsuBg ]'))}\n--------------------------------------`);  
     
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    
    
    } if (message.content === `${prefix}hack`){
      var help_embed = new Discord.RichEmbed()
       .setColor('#DA0007')
       .addField(":warning:   HACKING DU SERVER EN COUR ...", "▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄")
       message.channel.sendEmbed(help_embed);
       message.delete().catch(O_o=>{}); 
       
       
    
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === "A+"){
      var help_embed = new Discord.RichEmbed()
       .setColor('#DA0007')
       .addField("A+ mon gars sur !!", "   Reviens vite :v: ")
       message.channel.sendEmbed(help_embed);
      
       
       
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === "spaceboot"){
      var help_embed = new Discord.RichEmbed()
       .setColor('#4fd768')
       .addField(":globe_with_meridians:-->[SPACE-BOOT]<--:globe_with_meridians: ", "--------------------------------")
       .addField("Connexion", "https://space-boot.com/login.php")
       .addField("Inscription", "https://space-boot.com/inscription.php")
       .setThumbnail("https://img15.hostingpics.net/pics/586036gauche.png")
       .setFooter("© Booter Dev By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ SpaceBoot ]'))}\n--------------------------------------`);  
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === "Spaceboot"){
      var help_embed = new Discord.RichEmbed()
       .setColor('#4fd768')
       .addField(":globe_with_meridians:-->[SPACE-BOOT]<--:globe_with_meridians: ", "--------------------------------")
       .addField("Connexion", "https://spaceboot.com/login.php")
       .addField("Inscription", "https://spaceboot.com/inscription.php")
       .setThumbnail("https://img15.hostingpics.net/pics/586036gauche.png")
       .setFooter("© Booter Dev By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
      
       
       
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === "SPACEBOOT"){
      var help_embed = new Discord.RichEmbed()
       .setColor('#4fd768')
       .addField(":globe_with_meridians:-->[SPACE-BOOT]<--:globe_with_meridians: ", "--------------------------------")
       .addField("Connexion", "https://spaceboot.com/login.php")
       .addField("Inscription", "https://spaceboot.com/inscription.php")
       .setThumbnail("https://img15.hostingpics.net/pics/586036gauche.png")
       .setFooter("© Booter Dev By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       
       
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === "Space-boot"){
      var help_embed = new Discord.RichEmbed()
       .setColor('#4fd768')
       .addField(":globe_with_meridians:-->[SPACE-BOOT]<--:globe_with_meridians: ", "--------------------------------")
       .addField("Connexion", "https://spaceboot.com/login.php")
       .addField("Inscription", "https://spaceboot.com/inscription.php")
       .setThumbnail("https://img15.hostingpics.net/pics/586036gauche.png")
       .setFooter("© Booter Dev By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       
       
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === "space-boot"){
      var help_embed = new Discord.RichEmbed()
       .setColor('#4fd768')
       .addField(":globe_with_meridians:-->[SPACE-BOOT]<--:globe_with_meridians: ", "--------------------------------")
       .addField("Connexion", "https://spaceboot.com/login.php")
       .addField("Inscription", "https://spaceboot.com/inscription.php")
       .setThumbnail("https://img15.hostingpics.net/pics/586036gauche.png")
       .setFooter("© Booter Dev By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       
       
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    
    } if (message.content === ("dsl")){
      message.reply(' **Dsl dsl dsl !! :triumph: Tu a cas te tenir droit si tu ne veut pas etre DSL !!** ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("Dsl")){
      message.reply(' **Dsl dsl dsl !! :triumph: Tu a cas te tenir droit si tu ne veut pas etre DSL !!** ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("DSL")){
      message.reply(' **Dsl dsl dsl !! :triumph: Tu a cas te tenir droit si tu ne veut pas etre DSL !!** ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("salut")){
      message.reply(' **Salut a toi !!** :v:   ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("Salut")){
      message.reply(' **Salut a toi !!** :v:   ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("bonjour a tous")){
      message.reply(' **Bonjour a toi jeune padawane** :call_me: ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("Bonjour a tous")){
      message.reply(' **Bonjour a toi jeune padawane** :call_me: ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("bjr")){
      message.reply(' **Bonjour a toi jeune padawane** :call_me: ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("Bjr")){
      message.reply(' **Bonjour a toi jeune padawane** :call_me: ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("yo les thug !!")){
      message.reply('Thug un jour, thug toujour !! :muscle: ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("Yo les thug !!")){
      message.reply(' Thug un jour, thug toujour !! :muscle: ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("Je t'emmerde")){
      message.reply(' Oui effectivement tu m\'emmerde grave la !! :middle_finger: ')
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("je t'emmerde")){
      message.reply('  Oui effectivement tu m\'emmerde grave la !! :middle_finger: ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("boot")){
      message.reply('  Haa !! tu veux un booter qui arrachent des box ? **Voilà le mien !!** \n\nSite : https://spaceboot.com \nInscription : https://spaceboot.com/inscription.php ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("Boot")){
      message.reply('  Haa !! tu veux un booter qui arrachent des box ? **Voilà le mien !!** \n\nSite : https://spaceboot.com \nInscription : https://spaceboot.com/inscription.php ')
     
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("booter")){
      message.reply('  Haa !! tu veux un booter qui arrachent des box ? **Voilà le mien !!** \n\nSite : https://spaceboot.com \nInscription : https://spaceboot.com/inscription.php ')
     
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("Booter")){
      message.reply('  Haa !! tu veux un booter qui arrachent des box ? **Voilà le mien !!** \n\nSite : https://spaceboot.com \nInscription : https://spaceboot.com/inscription.php ')
     
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("OKLM")){
      message.reply('Yep mon gars-sur, OKLM avec mon cyber spliff !! ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("TKT")){
      message.reply('TKT je m\'occupe de rien, tu t\'occupe de tous !!')
     
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("tkt")){
      message.reply('TKT je m\'occupe de rien, tu t\'occupe de tous !!')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("oklm")){
      message.reply('Yep mon gars-sur, OKLM avec mon cyber spliff :blunt: ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("Comment vas-tu ?")){
      message.reply(' Labess Hemdoulah !! :ok_hand: ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("comment vas-tu ?")){
      message.reply(' Labess Hemdoulah !! :ok_hand: ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("mangasteam")){
      message.reply(' Voilà une chaîne Steam blindé de **mangas** :\n\nhttp://steamcommunity.com/id/OtakuAyanokoji/ ')
      con(temps)
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("Manga Steam")){
      message.reply(' Voilà une chaîne Steam blindé de **mangas** :\n\nhttp://steamcommunity.com/id/OtakuAyanokoji/ ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("manga steam")){
      message.reply(' Voilà une chaîne Steam blindé de **mangas** :\n\nhttp://steamcommunity.com/id/OtakuAyanokoji/ ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("Manga steam")){
      message.reply(' Voilà une chaîne Steam blindé de **mangas** :\n\nhttp://steamcommunity.com/id/OtakuAyanokoji/ ')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("dstat")){
      message.reply(' Voilà un Dstat de SPACE-BOOT !! :\n\nhttps://postimg.org/image/55i059own/')
      
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("Dstat")){
      message.reply(' Voilà un Dstat de SPACE-BOOT !! :\n\nhttps://postimg.org/image/55i059own/')
     
      
      
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === (`${prefix}gol`)){
      var help_embed = new Discord.RichEmbed()
      .setColor('#DA0007')
      .addField("Tu veux vraiment avoir ceci ?" , "http://blasze.tk/8KYT63 ")
      message.channel.sendEmbed(help_embed);
      message.delete().catch(O_o=>{});
      
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ Gol ]\n--------------------------------------`);  
    
    /////////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === (`${prefix}stats`)){
        var help_embed = new Discord.RichEmbed()
        .setColor('#DA0007')
        .addField(":globe_with_meridians:->[ STATS ]<-:globe_with_meridians:", "--------------------------")
        .addField("Developpeur","|-> 𝕃𝕒𝕣𝕔𝕙𝕚𝕥𝕖𝕔𝕋 <-|", true)
        .addField("Le préfix actuelle est:", `${prefix}`, true )
        .addField("Nombre d'utilisateurs:", + ` 15${client.users.size} `, true )
        .addField("Nombre de servers:", + ` 1${client.guilds.size} `, true )
        .addField("Nombre de salon:", + ` 4${client.channels.size} `, true )
        .addField("Lien d'invitation Bot:", "http://urlz.fr/69aT", true )
        .addField("Lien de Spaceboot.com:", "https://spaceboot.com" ,)
        message.channel.sendEmbed(help_embed);
        
        
        console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ Stats ]\n--------------------------------------`);  
      
      /////////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === (`${prefix}statsreal`)){
      var help_embed = new Discord.RichEmbed()
      .setColor('#DA0007')
      .addField(":globe_with_meridians:->[ STATS ]<-:globe_with_meridians:", "--------------------------")
      .addField("Developpeur","|-> 𝕃𝕒𝕣𝕔𝕙𝕚𝕥𝕖𝕔𝕋 <-|", true)
      .addField("Le préfix actuelle est:", `${prefix}`, true )
      .addField("Nombre d'utilisateurs:", + ` ${client.users.size} `, true )
      .addField("Nombre de servers:", + ` ${client.guilds.size} `, true )
      .addField("Nombre de salon:", + ` ${client.channels.size} `, true )
      .addField("Lien d'invitation Bot:", "http://urlz.fr/69aT", true )
      .addField("Lien de Spaceboot.com:", "https://spaceboot.com" ,)
      message.channel.sendEmbed(help_embed);
      
      
     } if (message.content.startsWith(prefix + "wiki")){
  if(!message.content.substr(5)) {
      con(Date.now(), "DANGER", "Vous devez fournir un terme de recherche.");
      message.reply("Vous devez fournir un terme de recherche.");
      return;
  }
  var wiki = new Wiki.default();
  wiki.search(message.content.substr(5)).then(function(data) {
      if(data.results.length==0) {
          con(Date.now(), "DANGER","Wikipedia ne trouve pas ce que vous avez demandée : " + message.content.substr(5));
          message.reply("Je ne peut trouvé ce que vous voulez dans Wikipedia :(");
          return;
      }
      wiki.page(data.results[0]).then(function(page) {
          page.summary().then(function(summary) {
              if(summary.indexOf(" may refer to:") > -1 || summary.indexOf(" may stand for:") > -1) {
                  var options = summary.split("\n").slice(1);
                  var info = "Selectioné une options parmis celle-ci :";
                  for(var i=0; i<options.length; i++) {
                      info += "\n\t" + i + ") " + options[i];
                  }
                  message.reply(info);
                  selectMenu(message.channel, message.author.id, function(i) {
                      commands.wiki.process(client, message, options[i].substring(0, options[i].indexOf(",")));
                  }, options.length-1);
              } else {
                  var sumText = summary.split("\n");
                  var count = 0;
                  var continuation = function() {
                      var paragraph = sumText.shift();
                      if(paragraph && count<3) {
                          count++;
                          message.reply(message.channel, paragraph, continuation);
                      }
                  };
                  message.reply("**Trouvé** " + page.raw.fullurl + "", continuation);
              }
          });
      });
  }, function(err) {
      con(Date.now(), "ERREUR","Impossible de se connecté a Wikipédia");
      message.reply("Uhhh... Quelque chose s'est mal passé :(");
  });
  
  
  
} 

/////////////////////////////////////////////////////////////////////////////////////////////////////

if (message.content.startsWith('!youtube')){
  youtube_plugin.respond(message.content, message.channel , client);
  }else if (message.content.startsWith(prefix +'google')){
  const google = require("google");
  const unirest = require("unirest");
  
    if(message.content.substr(8)) {
      let query = message.content.substr(8);
      con(temps)
        con(chalk.green('\u2713') +`${message.author.username} sur ${message.guild.name}/ Salon: ${message.channel.name}:\n${message.content}`+(query)+']');
        console.log('-----------------------------');
      let num = (message.content.substr(8).lastIndexOf(" ") + 1);
      if(!query || isNaN(num)) {
        query = message.content.substr(8);
        num = 0;
      }
      if(num < 0 || num > 2) {
        num = 0;
      } else {
        num = parseInt(num);
      }
      unirest.get(`https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(query)}&key=${AuthDetails.youtube_api_key}&limit=1&indent=True`).header("Accept", "application/json").end(res => {
        const doSearch = () => {
          google(query, (err, res) => {
            if(err || res.links.length == 0) {
              message.channel.sendMessage("🙅 Aucun résultat !!");
            } else {
              const results = [];
              if(num == 0) {
                num = 1;
              }
              for(let i=0; i < Math.min(res.links.length, num); i++) {
                if([`Nouvelles pour ${query}`, `Images pour ${query}`].indexOf(res.links[i].title)>-1) {
                  res.links.splice(i, 1);
                  i--;
                  continue;
                }
            message.channel.sendMessage({
          embed: {
            type: 'rich',
            description: '',
            fields: [{
              name: 'Résultat Google',
              value: `[${res.links[i].title}](`+`${res.links[i].href})`,
              inline: true
            },{
              name: '** **',
              value: `${res.links[i].description}`,
              inline: true
            }],
             thumbnail: {
               url: "http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png"
                  },
            color: 3447003,
            footer: {
              text: 'By LarchitecT',
              proxy_icon_url: ' '
            }
          }
  });
              }
  
            }
          });
        };
        
        if(res.status == 200 && res.body.itemListElement[0] && res.body.itemListElement[0].result && res.body.itemListElement[0].result.detailedDescription) {
          message.channel.sendMessage(`\`\`\`${res.body.itemListElement[0].result.detailedDescription.articleBody}\`\`\`<${res.body.itemListElement[0].result.detailedDescription.url}>`).then(() => {
            if(num > 0) {
              doSearch();
            }
          });
        } else {
          doSearch();
        }
      });
    } else {
      con(`Parameters not provided for !google command`);
      message.channel.sendMessage(` ❓❓❓`);
    } 
    
    /////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    } if (message.content === (`${prefix}cod`)){
      var help_embed = new Discord.RichEmbed()
      .setColor('#DA0007')
      .addField("Voici ton code IP LOGGER" , "Code : **D5ZTGF** a rentrer ici : http://blasze.tk/")
      message.channel.sendEmbed(help_embed);
      
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ Cod ]\n--------------------------------------`); 
      
    
    /////////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === (`spacebot`)){
      var help_embed = new Discord.RichEmbed()
      .setColor('#DA0007')
      .addField("Si tu veux de moi dans ton Discord" , "Lien: https://discordapp.com/oauth2/authorize?client_id=376118001579196421&scope=bot&permissions=2146958591")
      message.channel.sendEmbed(help_embed);
      
      
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ Invite Bot ]\n--------------------------------------`); 
    
    /////////////////////////////////////////////////////////////////////////////////////////
    
    } if (message.content === ("Spacebot")){
      var help_embed = new Discord.RichEmbed()
      .setColor('#DA0007')
      .addField("Si tu veux de moi dans ton Discord" , "Lien: https://discordapp.com/oauth2/authorize?client_id=376118001579196421&scope=bot&permissions=2146958591")
      message.channel.sendEmbed(help_embed);
         
      
    
    //////////////////////////////////////////////////////////////////////////////////////////
      
    
      }  if(message.content.startsWith(`${prefix}info`)) {
          var memberavatar = message.author.avatarURL
          var membername = message.author.username
             var mentionned = message.mentions.users.first();
            var getvalueof;
            if(mentionned){
                var getvalueof = mentionned;
            } else {
                var getvalueof = message.author;
            }
      
            if(getvalueof.bot == true){
                var checkbot = "L'utilisateur est un bot";
            } else {
                var checkbot = "N'est pas un bot";
            }
            if(getvalueof.presence.status == 'online'){
              var status = "En ligne"; 
            }else {
              var status = "Hors ligne";
            }
      
          message.channel.sendMessage({
              embed: {
                type: 'rich',
                description: '',
                fields: [{
                  name: ':bust_in_silhouette: Pseudo',
                  value: getvalueof.username,
                  inline: true
                }, {
                  name: ':shield: Id utilisateur',
                  value: getvalueof.id,
                  inline: true
                },{
                  name: ':biohazard: Discriminateur',
                  value: getvalueof.discriminator,
                  inline: true
      },{
                  name: ':globe_with_meridians: Status',
                  value: status,
                  inline: true
      },{
                  name: ':gear: Bot',
                  value: checkbot,
                  inline: true
      }],
              image: {
            url: getvalueof.avatarURL
              },
                color: 0xE46525,
                footer: {
                  text: 'By LarchitecT',
                  proxy_icon_url: ' '
                },
      
                author: {
                  name: membername,
                  icon_url: memberavatar,
                  proxy_icon_url: ' '
                }
              }
      });
    
    
    
    
    }if(message.content.startsWith(`${prefix}id`)) {
        
        var membername = message.author.username
           var mentionned = message.mentions.users.first();
          var getvalueof;
          if(mentionned){
              var getvalueof = mentionned;
          } else {
              var getvalueof = message.author;
          }
    
          if(getvalueof.bot == true){
              var checkbot = "L'utilisateur est un bot";
          } else {
              var checkbot = "N'est pas un bot";
          }
          if(getvalueof.presence.status == 'online'){
            var status = "En ligne"; 
          }else {
            var status = "Hors ligne";
          }
    
        message.channel.sendMessage({
            embed: {
              type: 'rich',
              description: '',
              fields: [{
                name: ':bust_in_silhouette: Pseudo',
                value: getvalueof.username,
                inline: true
              }, {
                name: `:shield: Id utilisateur`,
                value: getvalueof.id,
                inline: true
             
    }],
              color: 0xE46525,
              footer: {
                text: 'By LarchitecT',
                proxy_icon_url: ' '
              },
    
              author: {
                name: membername,
                icon_url: memberavatar,
                proxy_icon_url: ' '
              }
            }
    });
    
    
    console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ Id ]\n--------------------------------------`);  
      
       
      
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    
    }  if(message.content.startsWith(`${prefix}botname`)){
      client.user.setUsername(message.content.substr(9));
      
      
      
    }
    });
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    
 
    
    client.on('message', message => {
      if (message.content === "yo"){
        random();
      
        if (randnum == 1){
            message.reply("**Salut a toi !!** :v:");
            
        }
      
        if (randnum == 2){
            message.reply("╭∩╮（︶︿︶） **YO** ╭∩╮");
            
        }
      
        if (randnum == 3){
            message.reply("YEP L'AMI TU FAIT PLAISIR !! POUR MOI TON **YO** ME FAIS PLEZZ COMME UN [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]");
            
        }
      
        if (randnum == 4){
            message.reply("**BIGUP A TOI L'AMI !!**");
            
        }
      
        if (randnum == 5){
            message.reply("Aaah enfin de la politesse, ça vaut une :first_place: !!");
            
        }
      
        if (randnum == 6){
            message.reply("Yep comment vas ?");
            
        }
      
        if (randnum == 7){
            message.reply("Aightt !! boit du **PEPSI** mon pote !! :ok_hand::skin-tone-3: ");
            
        }
      
      }
      
      
      });
      
      function random(min, max) {
        min = Math.ceil(0);
        max = Math.floor(7);
        randnum = Math.floor(Math.random() * (max - min +1) + min);
      }
      
      ////////////////////////////////////////////////////////////////////////////
    
      client.on('message', message => {
        if (message.content === "Yo"){
          random();
        
          if (randnum == 1){
              message.reply("**Salut a toi !!** :v:");
              
          }
        
          if (randnum == 2){
              message.reply("╭∩╮（︶︿︶） **YO** ╭∩╮");
              
          }
        
          if (randnum == 3){
              message.reply("YEP L'AMI TU FAIT PLAISIR !! POUR MOI TON **YO** ME FAIS PLEZZ COMME UN [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]");
              
          }
        
          if (randnum == 4){
              message.reply("**BIGUP A TOI L'AMI !!**");
              
          }
        
          if (randnum == 5){
              message.reply("Aaah enfin de la politesse, ça vaut une :first_place: !!");
              
          }
        
          if (randnum == 6){
              message.reply("Yep comment vas ?");
              
          }
        
          if (randnum == 7){
              message.reply("Aightt !! boit du **PEPSI** mon pote !! :ok_hand::skin-tone-3: ");
              
          }
        
        }
        
        
        });
        
        function random(min, max) {
          min = Math.ceil(0);
          max = Math.floor(7);
          randnum = Math.floor(Math.random() * (max - min +1) + min);
        }
        
        ////////////////////////////////////////////////////////////////////////////
    
        client.on('message', message => {
          if (message.content === "YO"){
            random();
          
            if (randnum == 1){
                message.reply("**Salut a toi !!** :v:");
                
            }
          
            if (randnum == 2){
                message.reply("╭∩╮（︶︿︶） **YO** ╭∩╮");
                
            }
          
            if (randnum == 3){
                message.reply("YEP L'AMI TU FAIT PLAISIR !! POUR MOI TON **YO** ME FAIS PLEZZ COMME UN [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]");
                
            }
          
            if (randnum == 4){
                message.reply("**BIGUP A TOI L'AMI !!**");
                
            }
          
            if (randnum == 5){
                message.reply("Aaah enfin de la politesse, ça vaut une :first_place: !!");
                
            }
          
            if (randnum == 6){
                message.reply("Yep comment vas ?");
                
            }
          
            if (randnum == 7){
                message.reply("Aightt !! boit du **PEPSI** mon pote !! :ok_hand::skin-tone-3: ");
                
            }
          
          }
          
          
          });
          
          function random(min, max) {
            min = Math.ceil(0);
            max = Math.floor(7);
            randnum = Math.floor(Math.random() * (max - min +1) + min);
          }
          
          ////////////////////////////////////////////////////////////////////////////
    
      client.on('message', message => {
      if (message.content === "TG"){
        random();
      
        if (randnum == 1){
            message.reply("**Surveille ton language STP !! Je risquerais de traumatiser ta petite connexion  OK !!?**");
            
        }
      
        if (randnum == 2){
            message.reply("NON DE DIEU DE PUTIN DE BORDEL DE MERDE DE SALOPERIE DE CONNARD D'ENCULER D'TA RACE !! VEUX-TU VRAIMENT ÊTRE IMPOLI AVEC MOI ?");
            
        }
      
        if (randnum == 3){
            message.reply("Quoi ma gueule ? Qu'est-ce qu'elle a ma gueule ? Quelque chose qui ne va pas ? Elle ne te revient pas ? Oh je sais que tu n'as rien a dire, C'est ton Âœil que je prends au mot, Souvent un seul regard suffit Pour vous planter mieux qu'un couteau");
            
        }
      
        if (randnum == 4){
            message.reply("pff tu n'a plus d'arguments tu est pathétique même pas capable de construire des phrases de plus de deux mots mais va te caché sérieux  :honte:");
            
        }
      
        if (randnum == 5){
            message.reply("Ah bon tu parle toi ? Une soumis ça reste soumis donc ferme ta gueule");
            
        }
      
        if (randnum == 6){
            message.reply("Si j'avais une gueule, j'aurais 4 pattes, une queue et ta mère au milieu !!");
            
        }
      
        if (randnum == 7){
            message.reply("EH BIEN VASY FAIS MOI TAIRE !!");
            
        }
      
      }
      
      
      });
      
      function random(min, max) {
        min = Math.ceil(0);
        max = Math.floor(7);
        randnum = Math.floor(Math.random() * (max - min +1) + min);
      }
      
      ////////////////////////////////////////////////////////////////////////////
    
      client.on('message', message => {
        if (message.content === "Tg"){
          random();
        
          if (randnum == 1){
              message.reply("**Surveille ton language STP !! Je risquerais de traumatiser ta petite connexion  OK !!?**");
              
          }
        
          if (randnum == 2){
              message.reply("NON DE DIEU DE PUTIN DE BORDEL DE MERDE DE SALOPERIE DE CONNARD D'ENCULER D'TA RACE !! VEUX-TU VRAIMENT ÊTRE IMPOLI AVEC MOI ?");
              
          }
        
          if (randnum == 3){
              message.reply("Quoi ma gueule ? Qu'est-ce qu'elle a ma gueule ? Quelque chose qui ne va pas ? Elle ne te revient pas ? Oh je sais que tu n'as rien a dire, C'est ton Âœil que je prends au mot, Souvent un seul regard suffit Pour vous planter mieux qu'un couteau");
              
          }
        
          if (randnum == 4){
              message.reply("pff tu n'a plus d'arguments tu est pathétique même pas capable de construire des phrases de plus de deux mots mais va te caché sérieux  :honte:");
              
          }
        
          if (randnum == 5){
              message.reply("Ah bon tu parle toi ? Une soumis ça reste soumis donc ferme ta gueule");
              
          }
        
          if (randnum == 6){
              message.reply("Si j'avais une gueule, j'aurais 4 pattes, une queue et ta mère au milieu !!");
              
          }
        
          if (randnum == 7){
              message.reply("EH BIEN VASY FAIS MOI TAIRE !!");
              
          }
        
        }
        
        
        });
        
        function random(min, max) {
          min = Math.ceil(0);
          max = Math.floor(7);
          randnum = Math.floor(Math.random() * (max - min +1) + min);
        }
        
        ////////////////////////////////////////////////////////////////////////////
    
        client.on('message', message => {
          if (message.content === "tg"){
            random();
          
            if (randnum == 1){
                message.reply("**Surveille ton language STP !! Je risquerais de traumatiser ta petite connexion  OK !!?**");
                
            }
          
            if (randnum == 2){
                message.reply("NON DE DIEU DE PUTIN DE BORDEL DE MERDE DE SALOPERIE DE CONNARD D'ENCULER D'TA RACE !! VEUX-TU VRAIMENT ÊTRE IMPOLI AVEC MOI ?");
                
            }
          
            if (randnum == 3){
                message.reply("Quoi ma gueule ? Qu'est-ce qu'elle a ma gueule ? Quelque chose qui ne va pas ? Elle ne te revient pas ? Oh je sais que tu n'as rien a dire, C'est ton Âœil que je prends au mot, Souvent un seul regard suffit Pour vous planter mieux qu'un couteau");
                
            }
          
            if (randnum == 4){
                message.reply("pff tu n'a plus d'arguments tu est pathétique même pas capable de construire des phrases de plus de deux mots mais va te caché sérieux  :honte:");
                
            }
          
            if (randnum == 5){
                message.reply("Ah bon tu parle toi ? Une soumis ça reste soumis donc ferme ta gueule");
                
            }
          
            if (randnum == 6){
                message.reply("Si j'avais une gueule, j'aurais 4 pattes, une queue et ta mère au milieu !!");
                
            }
          
            if (randnum == 7){
                message.reply("EH BIEN VASY FAIS MOI TAIRE !!");
                
            }
          
          }
          
          
          });
          
          function random(min, max) {
            min = Math.ceil(0);
            max = Math.floor(7);
            randnum = Math.floor(Math.random() * (max - min +1) + min);
          }
          
          ////////////////////////////////////////////////////////////////////////////
    
    
    client.on('message', message => {
    if (message.content === "comment vas-tu nanobot ?"){
      random();
    
      if (randnum == 1){
          message.reply(" Trkl et toi ?");
          
      }
    
      if (randnum == 2){
          message.reply(" Sava sava merci et toi ?");
          
      }
    
      if (randnum == 3){
          message.reply(" Labess Hemdoulah !! :ok_hand: ");
          
      }
    
      if (randnum == 4){
          message.reply(" Çà se maintient merci ");
          
      }
    
      if (randnum == 5){
          message.reply(" Vas-y lâche l'affaire tu ma gavé !! ");
          
      }
    
      if (randnum == 6){
          message.reply(" Ok j'suis un Bot, j'ai pas de sentiments !! Mais jsuis pas là pour souffrir OK !! ");
          
      }
    
      if (randnum == 7){
          message.reply(" Vien tester mon Booter -->[ https://spaceboot.com ]<-- au lieu de me peter les burnes !! ");
          
      }
    
    }
    
    
    });
    
    function random(min, max) {
      min = Math.ceil(0);
      max = Math.floor(7);
      randnum = Math.floor(Math.random() * (max - min +1) + min);
    }
    
    ////////////////////////////////////////////////////////////////////////////
    
    client.on('message', message => {
      if (message.content === "PSID"){
          random();
      
          if (randnum == 1){
              message.reply("Voici votre PSID -->[ BFB72A573E63A2CDBE4BE732EA859B6C ]");
              
          }
      
          if (randnum == 2){
              message.reply("Voici votre PSID -->[ 54F373313E63A2CDEC8DEAC2EA889B6B ]");
              
          }
      
          if (randnum == 3){
              message.reply("Voici votre PSID -->[ F6E5EEC13E63A2CDAEBD7A82EA8F9B65 ]");
              
          }
      
          if (randnum == 4){
              message.reply("Voici votre PSID -->[ F6E5EEC13E63A2CDAEBD7A82EA8F9B65 ]");
              
          }
      
          if (randnum == 5){
              message.reply("Voici votre PSID -->[ F4A8DBD13E63A2CDFE047922EA8E9B6B ]");
              
          }
      
          if (randnum == 6){
              message.reply("Voici votre PSID -->[ 66F03E813E63A2CDEE8BC652EA8F9B66 ]");
              
          }
      
          if (randnum == 7){
              message.reply("Voici votre PSID -->[ F4E68E223E63A2CDDA08AAA2EA859B65 ]");
              
          }
      
      }
      
     
      });
    
      client.on('message', message => {
          if (message.content === "Comment vas-tu nanobot ?"){
              random();
          
              if (randnum == 1){
                  message.reply(" Trkl et toi ?");
                  
              }
          
              if (randnum == 2){
                  message.reply(" Sava sava merci et toi ?");
                  
              }
          
              if (randnum == 3){
                  message.reply(" Labess Hemdoulah !! :ok_hand: ");
                  
              }
          
              if (randnum == 4){
                  message.reply(" Çà se maintient merci ");
                  
              }
          
              if (randnum == 5){
                  message.reply(" Vas-y lâche l'affaire tu ma gavé !! ");
                  
              }
          
              if (randnum == 6){
                  message.reply(" Ok j'suis un Bot, j'ai pas de sentiments !! Mais jsuis pas là pour souffrir OK !! ");
                  
              }
          
              if (randnum == 7){
                  message.reply(" Vien tester mon Booter -->[ https://spaceboot.com ]<-- au lieu de me peter les burnes !! ");
                  
              }
          
          }
          
          });
          
          function random(min, max) {
              min = Math.ceil(0);
              max = Math.floor(7);
              randnum = Math.floor(Math.random() * (max - min +1) + min);
          }
          
          ////////////////////////////////////////////////////////////////////////////
          
          client.on('message', message => {
              if (message.content === "psid"){
                  random();
              
                  if (randnum == 1){
                      message.reply("Voici votre PSID -->[ BFB72A573E63A2CDBE4BE732EA859B6C ]");
                      
                  }
              
                  if (randnum == 2){
                      message.reply("Voici votre PSID -->[ 54F373313E63A2CDEC8DEAC2EA889B6B ]");
                      
                  }
              
                  if (randnum == 3){
                      message.reply("Voici votre PSID -->[ F6E5EEC13E63A2CDAEBD7A82EA8F9B65 ]");
                      
                  }
              
                  if (randnum == 4){
                      message.reply("Voici votre PSID -->[ F6E5EEC13E63A2CDAEBD7A82EA8F9B65 ]");
                      
                  }
              
                  if (randnum == 5){
                      message.reply("Voici votre PSID -->[ F4A8DBD13E63A2CDFE047922EA8E9B6B ]");
                      
                  }
              
                  if (randnum == 6){
                      message.reply("Voici votre PSID -->[ 66F03E813E63A2CDEE8BC652EA8F9B66 ]");
                      
                  }
              
                  if (randnum == 7){
                      message.reply("Voici votre PSID -->[ F4E68E223E63A2CDDA08AAA2EA859B65 ]");
                      
                  }
              
              }
              
              
              });
    
              client.on('message', message => {
                  if (message.content === "Comment vas tu nanobot ?"){
                      random();
                  
                      if (randnum == 1){
                          message.reply(" Trkl et toi ?");
                          
                      }
                  
                      if (randnum == 2){
                          message.reply(" Sava sava merci et toi ?");
                          
                      }
                  
                      if (randnum == 3){
                          message.reply(" Labess Hemdoulah !! :ok_hand: ");
                          
                      }
                  
                      if (randnum == 4){
                          message.reply(" Çà se maintient merci ");
                          
                      }
                  
                      if (randnum == 5){
                          message.reply(" Vas-y lâche l'affaire tu ma gavé !! ");
                          
                      }
                  
                      if (randnum == 6){
                          message.reply(" Ok j'suis un Bot, j'ai pas de sentiments !! Mais jsuis pas là pour souffrir OK !! ");
                          
                      }
                  
                      if (randnum == 7){
                          message.reply(" Vien tester mon Booter -->[ https://spaceboot.com ]<-- au lieu de me peter les burnes !! ");
                          
                      }
                  
                  }
                 
                  
                  });
                  
                  function random(min, max) {
                      min = Math.ceil(0);
                      max = Math.floor(7);
                      randnum = Math.floor(Math.random() * (max - min +1) + min);
                  }
                  
                  ////////////////////////////////////////////////////////////////////////////
                  
                  client.on('message', message => {
                      if (message.content === "Psid"){
                          random();
                      
                          if (randnum == 1){
                              message.reply("Voici votre PSID -->[ BFB72A573E63A2CDBE4BE732EA859B6C ]");
                              
                          }
                      
                          if (randnum == 2){
                              message.reply("Voici votre PSID -->[ 54F373313E63A2CDEC8DEAC2EA889B6B ]");
                              
                          }
                      
                          if (randnum == 3){
                              message.reply("Voici votre PSID -->[ F6E5EEC13E63A2CDAEBD7A82EA8F9B65 ]");
                              
                          }
                      
                          if (randnum == 4){
                              message.reply("Voici votre PSID -->[ F6E5EEC13E63A2CDAEBD7A82EA8F9B65 ]");
                              
                          }
                      
                          if (randnum == 5){
                              message.reply("Voici votre PSID -->[ F4A8DBD13E63A2CDFE047922EA8E9B6B ]");
                              
                          }
                      
                          if (randnum == 6){
                              message.reply("Voici votre PSID -->[ 66F03E813E63A2CDEE8BC652EA8F9B66 ]");
                              
                          }
                      
                          if (randnum == 7){
                              message.reply("Voici votre PSID -->[ F4E68E223E63A2CDDA08AAA2EA859B65 ]");
                              
                          }
                      
                      }
                      
                      
                       
                      
                      });
    
                      
                   
    
                      function clean(text) {
                          if (typeof(text) === "string")
                              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                          else
                              return text;
                      }
    
    client.login(token)
    
    client.on('message', msg => {
      if (msg.author.bot || msg.channel.type != 'text')
          return; // Ne répondez pas aux messages des robots ou des messages qui ne proviennent pas des guildes.
    
      if (!msg.content.startsWith(config.prefix))
          return; //Pas une commande.
    
      let cmd = msg.content.split(/\s+/)[0].slice(config.prefix.length).toLowerCase();
      getCmdFunction(cmd)(msg);
    });
    
    client.on('error', (e) => console.error(e));
    client.on('warn', (e) => console.warn(e));
    // bot.on('debug', (e) => console.info(e));
    
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    
      
       client.on('message', message => {

      
      
      const fs = require("fs");
      var msg = message;
      
      let afk = JSON.parse(fs.readFileSync("./afks.json", "utf8"));
      if (message.content.startsWith(prefix + "remafk")){
      if (afk[msg.author.id]) {
      delete afk[msg.author.id];
      if (msg.member.nickname === null) {
      msg.channel.send("```css\nJ'ai enlever votre [ AFK ] !! ```");
      }else{
      msg.channel.send("```css\nJ'ai enlever votre [ AFK ] !! ```");
      }
      fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
      }else{
      msg.channel.send("```css\nErreur ! Tu es déjà AFK ```");
      }
      }
      
      
      if (msg.content.startsWith(prefix + "afk")||msg.content === prefix + "afk") {
      if (afk[msg.author.id]) {
      return message.channel.send("```css\nErreur ! Tu es déjà AFK ```");
      }else{
      let args1 = msg.content.split(" ").slice(1);
      if (args1.length === 0) {
      afk[msg.author.id] = {"reason" : true};
      msg.delete();
      msg.channel.send(`tu es désormais AFK, écrit **${prefix}remafk** pour enlever ton AFK`);
      }else{
      afk[msg.author.id] = {"reason" : args1.join(" ")};
      msg.delete();
      msg.channel.send(`tu es désormais AFK, écrit **${prefix}remafk** pour enlever ton AFK`);
      }
      fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
      }
      }
          
          var mentionned = message.mentions.users.first();
      if(msg.mentions.users.size > 0) {
      if (afk[msg.mentions.users.first().id]) {
      if (afk[msg.mentions.users.first().id].reason === true) {
      message.channel.send(`**${mentionned.username}** est **AFK**: __*sans raison*__`);
      }else{
      message.channel.send(`**${mentionned.username}** est **AFK**: __*${afk[msg.mentions.users.first().id].reason}*__`);
      }
      }
      }
      
      if(message.content.startsWith(prefix + `|`)){
        message.delete().catch(O_o=>{}); 
        var help_embed = new Discord.RichEmbed()
        .setColor('#5BFF8A')
        .addField(`${message.author.username}`,`${message.content}`)
        .setThumbnail(`${message.author.avatarURL}`)
        .setFooter(`By ${message.guild.name}`)
        message.channel.sendEmbed(help_embed);
      (async function() {
      
       const mainMessage = await message.channel.send(`Vote lancé par : ${message.author}`);
    
      await mainMessage.react("💪");
      await mainMessage.react("👌🏾");
      await mainMessage.react("☑");
      await mainMessage.react("⛔");
      await mainMessage.react("☠");
      
      
      
      const panier = mainMessage.createReactionCollector((reaction, user) => user.id === message.author.id);
       
      panier.on('collect', async(reaction) => 
      {
      if (reaction.emoji.name === "☠") {
      
      mainMessage.delete()
      
       }
      
       await reaction.remove(message.author.id);
      
      });
       }());
      }
    
      if(message.content.startsWith(prefix + "/")){
        message.delete().catch(O_o=>{}); 
        var help_embed = new Discord.RichEmbed()
        .setColor('#5BFF8A')
        .addField(`${message.guild.name}`,`${message.content}`)
        .setThumbnail(`${message.guild.iconURL}`)
        .setFooter("By Anonymous")
        message.channel.sendEmbed(help_embed);
      (async function() {
      
       const mainMessage = await message.channel.send(`Vote lancé par : ${message.guild.name}`);
    
      await mainMessage.react("💪");
      await mainMessage.react("👌🏾");
      await mainMessage.react("☑");
      await mainMessage.react("⛔");
      await mainMessage.react("☠");
      
      
      
      const panier = mainMessage.createReactionCollector((reaction, user) => user.id === message.author.id);
       
      panier.on('collect', async(reaction) => 
      {
      if (reaction.emoji.name === "☠") {
      
      mainMessage.delete()
      
       }
      
       await reaction.remove(message.author.id);
      
      });
       }());
      }
    
      if(message.content.startsWith(prefix + ">")){
        message.delete().catch(O_o=>{}); 
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage("Vous n'avez pas la permission **VOTE ANONYME EVERYONE** !!");
        var help_embed = new Discord.RichEmbed()
        .setColor('#5BFF8A')
        .addField(`${message.guild.name}`,`${message.content}`)
        .setThumbnail(`${message.guild.iconURL}`)
        .setFooter("By Anonymous")
        message.channel.sendEmbed(help_embed);
      (async function() {
      
       const mainMessage = await message.channel.send(`Vote lancé par : @everyone`);
    
      await mainMessage.react("💪");
      await mainMessage.react("👌🏾");
      await mainMessage.react("☑");
      await mainMessage.react("⛔");
      await mainMessage.react("☠");
      
      
      
      const panier = mainMessage.createReactionCollector((reaction, user) => user.id === message.author.id);
       
      panier.on('collect', async(reaction) => 
      {
      if (reaction.emoji.name === "☠") {
      
      mainMessage.delete()
      
       }
      
       await reaction.remove(message.author.id);
      
      });
       }());
      }
    
    
      if(message.content.startsWith(prefix + "reminder")){
        message.delete().catch(O_o=>{}); 
      if(message.channel.type === "dm") return;
      
      if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")){return message.reply("**:x: Vous n'avez pas la permission Administrateur").catch(console.error);
      
      }else{
      
      let args = message.content.split(' ');
      let time = args[1];
      let timeofreminder = message.content.slice(2, args.length);
      
      function reminder (remind, toRemind) {
      
      if(!time){
      message.channel.send("**:x: Erreur format, Correcte usage: `"+ prefix + "reminder <time en secondes !> <votre reminder>`**");
      }else{
      if(message.content.includes("reminder stop")){
      
      setInterval(function() {
      
      message.channel.restart();
      }, (time * 1000));
      message.channel.send("** J'ai enlevé votre reminder avec succès !!**");
      }else{
      
      setInterval(function() {
      
      message.channel.send(message.content.slice(message.content.indexOf(message.content.split(" ")[2])));
      }, (time * 1000));
      
      message.channel.send("** J'ai ajouter votre reminder avec succès ! Tapez `" + prefix + "reminder stop` pour l'enlever !!**");
      }
      }
      }
      reminder(time, timeofreminder);
      }
      }
      
      
      });

       client.on('message', message => {
        if (message.author.bot) return;
        if (message.content.startsWith(config.prefix)) return;
      
        let command = message.content.split(" ")[0];
        command = command.slice(config.prefix.length);
      
        var args = message.content.split(" ").slice(1);
        var msgauthor = message.author.id;
      
        if(message.author.bot)return;
      
        if(!db.get("level").find({user: msgauthor}).value()){
            db.get("level").push({user: msgauthor, level: 1}).write();
        }else{

          var userleveldb = db.get("level").filter({user: msgauthor}).find('level').value();

          var userlevel = Object.values(userleveldb)
     
     

          db.get("level").find({user: msgauthor}).assign({user: msgauthor, level: userlevel[1] += 1}).write();
      
        }
      });

////////////////////////////////////////////////////////////////////////////////////////////////////////

function getCmdFunction(cmd) {
  const COMMANDS = {
      'choose': cmds.choose,
      'debug': cmds.debug,
      'supr': cmds.prune,
      'music': music.processCommand,
      'cles': cmds.cles,
      'next': cmds.next,
      'exemple_embed': cmds.exemple_embed,
      'exemple_perm': cmds.exemple_perm,

  }
  return COMMANDS[cmd] ? COMMANDS[cmd] : () => {};
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
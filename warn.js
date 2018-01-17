const Discord = require('discord.js');
exports.run = (client, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlog = client.channels.find('name', 'mod-log');
    if (!modlog) return message.reply('I cannot find a mod-log channel');
    if (reason.length < 1) return message.reply('You must supply a reason for the warning.');
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);

    const embed = new Discord.RichEmbed()
    .setTitle('')
    .setAuthor('Moderation', message.author.avatarURL)
    .setColor('0x00AE86')
    .setTimestamp()
    .addFiel('Action', 'Warning')
    .addFiel('User', `${user.username}#${user.discriminator}`)
    .addFiel('Action', `${message.author.username}#${message.author.discriminator}`);
    return client.channels.get(modlog.id).sendEmbed(embed);


};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
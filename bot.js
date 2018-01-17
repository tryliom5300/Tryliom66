const Discord = require('discord.js');
const fs = require('fs');
const nodemon = require('nodemon');
const chalk = require('chalk');
const didYouMean = require('didyoumean2');
const readline = require('readline');
const {exec} = require('child_process');
var prefix = "//";
const bot = exports.client = new Discord.Client();
const botSettings = bot.botSettings = require('./botSettings.json');
const utils = require('./utils');
const mute = require('./commands/mute');
const eval = require('./commands/eval');
const purge = require('./commands/purge');
let config = bot.config = require('./config.json');
const commands = bot.commands = {};
const needsSetup = bot.setupPlugins = [];

// Exécuter avant les événements et le bot est connecté
checkSetup();

bot.on('ready', () => {

    console.log(`\n---> EliteSelfBot\n______________________________\n\n---> Connecté à ${bot.guilds.size} serveurs\n---> pour un total de ${bot.channels.size} canaux\n---> et ${bot.users.size} utilisateurs\n---> Le préfix actuelle:  ` + prefix + `\n______________________________` );

    delete bot.user.email;
    delete bot.user.verified;

    loadPlugins();

    console.log(chalk.green('\u2713') + ' Bot chargé');

    needsSetup.forEach((plugin) => {
        if (typeof plugin.setup === 'function') {
            plugin.setup(bot);
        }
    });

});

bot.on('message', msg => {
    if (msg.isMentioned(bot.user.id)) {
        console.log(`[MENTION] ${msg.author.username} (${msg.author.id}) on ${msg.guild.name}/${msg.channel.name}:\n${msg.content}`);
    }

    mute.onMessage(msg);

    if (msg.author.id !== bot.user.id) {
        return;
    }

    if (!msg.content.startsWith(config.prefix)) return;

    let command = msg.content.split(' ')[0].substr(config.prefix.length);
    const args = msg.content.split(' ').splice(1);

    if (commands[command]) {
        msg.editEmbed = (embed) => {
            msg.edit('', {embed});
        };

        try {
            commands[command].run(bot, msg, args);
        } catch (e) {
            msg.edit(msg.author + `Error while executing command\n${e}`).then(m => m.delete(5000));
            console.error(e);
        }

    } else if (command == 'reload') {
        loadPlugins();

        msg.edit('', {
            embed: utils.embed('Reload', `Successfully reloaded all the plugins!`)
        }).then(m => m.delete(10000));

    } else if (command == 'update') {
        msg.edit(":arrows_counterclockwise: Checking for an update..");
        exec('npm update');

    } else {
        var maybe = didYouMean(command, Object.keys(commands), {
            threshold: 5,
            thresholdType: 'edit-distance'
        });

        if (maybe) {
            msg.edit(`:question: Did you mean \`${config.prefix}${maybe}\`?`).then(m => m.delete(5000));

        } else {
            msg.edit(`:no_entry_sign: No commands were found that were similar to \`${config.prefix}${command}\``).then(m => m.delete(5000));
        }
    }
});

process.on('uncaughtException', (err) => {
    let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
    console.error("Uncaught Exception" + errorMsg);
});

process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error", err.stack);
});

function loadPlugins() {
    fs.readdirSync(__dirname + '/commands/').forEach(file => {
        if (file.startsWith('_') || !file.endsWith('.js')) return;
        var command = require(`./commands/${file}`);
        if (typeof command.run !== 'function' || typeof command.info !== 'object' || typeof command.info.name !== 'string') {
            console.log(`Invalid command file: ${file}`);
            return;
        }
        commands[command.info.name] = command;

        if (typeof command.setup === 'function') {
            needsSetup.push(command);
        }
    });
}

function checkSetup() {

    if (!fs.existsSync('./config.json')) {

        let prompt = chalk.bold.magenta;
        let config = {};
        let rl = readline.createInterface(process.stdin, process.stdout);

        console.log(`\nVous créez une configuration pour la version de robot EliteSelf ${botSettings.version}!`);
        rl.question(prompt('Please enter your bot token: '), function (args) {
            config.botToken = args;

            rl.question(prompt('Please enter your bot prefix: '), function (args) {
                config.prefix = args;

                rl.close();

                console.info('Creating config file with token...');

                let json = JSON.stringify(config);
                fs.writeFile('./../config.json', json, 'utf8', () => {
                    console.info('Successfully created the config file! Starting bot...');
                    checkSetup();
                });
            })
        })

    } else {
        config = bot.config = require('./config.json');
        bot.login(config.botToken);

    }
}
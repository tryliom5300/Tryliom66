const {exec} = require('child_process');
const username = require('os').userInfo().username;
const utils = require('../utils');
const yargs = require('yargs');

const clean = function (data) {
    return data.toString().replace(new RegExp(username, 'g'), '<Hidden>').replace(/\[[0-9]*m/g, '');
};

exports.run = (bot, msg, args) => {
    var argv = yargs.alias('l', 'lang').parse(args);

    var ps = exec(argv._.join(' '));

    var opts = {
        prefix: `\`\`\`${argv.lang || 'bash'}\n`,
        suffix: '\n```',
        delay: 10,
        cutOn: '\n'
    };

    ps.stdout.on('data', data => utils.sendLarge(msg.channel, clean(data), opts));
    ps.stderr.on('data', data => utils.sendLarge(msg.channel, clean(data), opts));
};

exports.info = {
    name: 'exec',
    usage: 'exec <command>',
    description: 'Executes a command in the console'
};
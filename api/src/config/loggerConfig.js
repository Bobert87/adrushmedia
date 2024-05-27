const chalk = require('chalk');

function loggerColorConfig(tokens, req, res){
    const status = res.statusCode;
    let statusChalk = chalk.white;
    if (status >= 200) statusChalk = chalk.green;
    if (status >= 300) statusChalk = chalk.greenBright;
    if (status >= 400) statusChalk = chalk.yellow;
    if (status >= 500) statusChalk = chalk.red;
    return chalk.yellow(tokens['date'](req, res))
        + ' ' + chalk.white(tokens['remote-addr'](req, res))
        + ' ' + chalk.cyanBright(tokens.method(req, res))
        + ' ' + chalk.white(tokens.url(req, res))        
        + ' ' + statusChalk(tokens.status(req, res))
        + ' ' + chalk.white(tokens['response-time'](req, res) + 'ms')
        + ' ' + chalk.magenta(res['_contentLength'] + ' bytes')
}

module.exports = loggerColorConfig;
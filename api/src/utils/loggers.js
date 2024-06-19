const chalk = require("chalk");
const morgan = require("morgan");
const winstonLogger = require("winston");
const { combine, timestamp, label, prettyPrint, printf } = winstonLogger.format;

class Loggers {
	constructor() {
		this.logger = this.createWinstonLogger();
		this.webLogger = this.createMorganLogger();
	}

	getLoggers() {
		return {
			logger: this.logger,
			webLogger: this.webLogger,
		};
	}

	morganConfig(tokens, req, res) {
		const status = res.statusCode;
		let statusChalk = chalk.white;
		if (status >= 200) statusChalk = chalk.green;
		if (status >= 300) statusChalk = chalk.greenBright;
		if (status >= 400) statusChalk = chalk.yellow;
		if (status >= 500) statusChalk = chalk.red;
		return (
			`${chalk.yellow(tokens.date(req, res))} 			
			${chalk.white(tokens["remote-addr"](req, res))}			
			${chalk.cyanBright(tokens.method(req, res))}
			${chalk.white(tokens.url(req, res))}
			${statusChalk(tokens.status(req, res))}						
			${chalk.white(tokens["response-time"](req, res))} ms
			${chalk.magenta(res._contentLength)}  bytes`
		);
	}

	createMorganLogger() {
		return morgan(this.morganConfig);
	}

	createWinstonLogger() {
		const myFormat = printf(({ level, message, label, timestamp }) => {
			return `${timestamp} [${label}] ${level}: ${message}`;
		});

		const timezoned = () => {
			return new Date().toUTCString();
		};
		const logger = winstonLogger.createLogger({
			level: "info",
			defaultMeta: { service: "adrush" },
			format: combine(
				label({ label: "ADRUSH" }),
				timestamp({
					format: timezoned,
				}),
				prettyPrint(),
				myFormat,
			),
			transports: [new winstonLogger.transports.Console()],
		});
		return logger;
	}
}
module.exports = new Loggers();

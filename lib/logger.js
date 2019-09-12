"use strict";
const log4js = require("log4js");
function createLogger(
	debug = false,
	config = {
		stdout: true,
		fileout: false,
		filename: ""
	}
) {
	if (!debug || (!config.stdout && !config.fileout)) {
		return {
			info: () => { },
			warn: () => { },
			error: () => { }
		};
	}
	let appenders = [];
	const stdout = config.stdout === undefined ? true : config.stdout;
	const fileout = config.fileout === undefined ? false : config.fileout;
	const filename = config.filename ? config.filename : `logs/wulai-sdk.log`;
	if (stdout) {
		appenders.push("stdout");
	}
	if (fileout) {
		appenders.push("fileout");
	}
	if (!stdout && !fileout) {
		return {
			info: () => { },
			warn: () => { },
			error: () => { }
		};
	}
	let defaultConfigure = {
		appenders: {},
		categories: {
			default: { appenders: appenders, level: "info" }
		}
	};
	if (debug && stdout) {
		defaultConfigure.appenders["stdout"] = { type: "console" };
	}
	if (debug && fileout) {
		defaultConfigure.appenders["fileout"] = {
			type: "file",
			filename: filename
		};
	}
	log4js.configure(defaultConfigure);
	return log4js.getLogger("wulai-sdk");
}
module.exports = createLogger;

"use strict";
const log4js = require("log4js");
function createLogger(
	debug = false,
	configure = {}
) {
	if (!debug) {
		return {
			info: () => { },
			warn: () => { },
			error: () => { }
		};
	}
	let defaultConfigure = {
		appenders: {
			console: { type: "console" },
			info: {
				type: "file",
				filename: `logs/wulai-sdk-info.log`
			}
		},
		categories: {
			default: { appenders: ["console", "info"], level: "info" }
		}
	};
	log4js.configure(Object.assign(defaultConfigure, configure || {}));
	return log4js.getLogger("wulai-sdk");
}
module.exports = createLogger;

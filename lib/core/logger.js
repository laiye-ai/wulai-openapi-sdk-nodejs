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
    let defaultConfigure = {
        appenders: {},
        categories: {
            default: { appenders: [], level: "info" }
        }
    };
    if (stdout) {
        appenders.push("stdout");
        defaultConfigure.appenders["stdout"] = { type: "console" };
    }
    if (fileout) {
        appenders.push("fileout");
        defaultConfigure.appenders["fileout"] = {
            type: "file",
            filename: filename
        };
    }
    defaultConfigure.categories.default.appenders = appenders;

    log4js.configure(defaultConfigure);
    return log4js.getLogger("wulai-sdk");
}
module.exports = createLogger;

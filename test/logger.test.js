"use strict";
const expect = require("chai").expect;
const createLogger = require("../lib/core/logger");
describe("logger should ok", () => {
    it("debug [false] should ok", () => {
        let logger = createLogger(false);

        expect(JSON.stringify(logger)).to.eql(
            JSON.stringify({
                info: () => { },
                warn: () => { },
                error: () => { }
            })
        );
    });
    it("stdout should ok", () => {
        let logger = createLogger(true, {
            stdout: true
        });
        expect(logger).to.be.an("object");
    });
    it("fileout should ok", () => {
        let logger = createLogger(true, {
            stdout: true,
            fileout: true
        });
        expect(logger).to.be.an("object");
    });
});

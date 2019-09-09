"use strict";
const expect = require("chai").expect;
const createLogger = require("../lib/logger");
describe("logger should ok", () => {
  describe("config should ok", () => {
    it("debug [false] should ok", () => {
      let logger = createLogger(false);

      expect(JSON.stringify(logger)).to.eql(
        JSON.stringify({
          info: () => {},
          warn: () => {},
          error: () => {}
        })
      );
    });
  });
  describe("config should ok", () => {
    it("debug [true] should ok", () => {
      let logger = createLogger(true);
      expect(logger).to.be.an("object");
    });
  });
});

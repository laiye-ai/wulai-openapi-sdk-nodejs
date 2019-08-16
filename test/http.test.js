"use strict";
const expect = require("chai").expect;
// const rewire = require("rewire");
const muk = require("muk");
const httpx = require("httpx");
class Exception extends Error {}
const Http = require("../lib/http");

function Mock(response, body) {
  before(() => {
    muk(httpx, "request", (url, options) => {
      return Promise.resolve(response);
    });
    muk(httpx, "read", (response, encoding) => {
      return Promise.resolve(body);
    });
  });
  after(() => {
    muk.restore();
    console.log(muk.isMocked(httpx, "request"));
  });
}
describe("Base Http Request", () => {
  describe("Http Request Initial", () => {
    it("should pass into valid <config.endpoint>", () => {
      expect(() => {
        const config = {
          endpoint: "https://abc.com"
        };
        new Http(config);
        throw new Exception(
          "<config.endpoint> must starts with 'https://' or 'http://'"
        );
      }).to.throw(Exception);
    });
    it("should ok with <http> protocol", () => {
      const http = new Http({
        endpoint: "http://openapi.wul.ai"
      });
      expect(http.endpoint).to.equal("http://openapi.wul.ai");
      expect(http.keepAliveAgent).to.be.an("object");
      expect(http.keepAliveAgent).to.have.property("protocol", "http:");
    });
    it("should ok with <https> protocol", () => {
      const http = new Http();
      expect(http.endpoint).to.equal("https://openapi.wul.ai");
      expect(http.keepAliveAgent).to.be.an("object");
      expect(http.keepAliveAgent).to.have.property("protocol", "https:");
    });
    it("should ok with <deaultHeaders>", () => {
      const http = new Http();
      const headers = http.defaultHeaders;
      expect(headers).to.have.keys(["accept", "date"]);
      expect(headers).to.have.property("accept", "application/json");
    });
  });
  describe("Http Request Mock", () => {
    it("should ok with json response", () => {
      Mock(
        {
          statusCode: 200,
          headers: {
            "content-type": "application/json"
          }
        },
        JSON.stringify({
          message: "hello, world",
          code: 0
        })
      );
    });
    it()
  });
});

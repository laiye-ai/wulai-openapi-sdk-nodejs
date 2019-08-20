"use strict";
const expect = require("chai").expect;
const muk = require("muk");
const httpx = require("httpx");
const rewire = require("rewire");
const cmReq = require("../lib/cmReq");

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
  });
}
describe("commmon request", () => {
  describe("params check should ok", () => {
    Mock(
      {
        statusCode: 200,
        headers: {
          "content-type": "application/json"
        }
      },
      JSON.stringify({ ok: true })
    );
    it("expect params request should ok", async () => {
      let response = await cmReq({
        action: "userCreate",
        endpoint: "https://openapi.wul.ai",
        pubkey: "pubkey",
        secret: "secret"
      });
      expect(response).to.be.eql({ ok: true });
    });
    it("unexpect endpoint check should ok", async () => {
      try {
        await cmReq({
          action: "userCreate",
          endpoint: "http:.....",
          pubkey: "pubkey",
          secret: "secret"
        });
      } catch (error) {
        expect(error.message).to.be.equal(
          "Endpoint parse error: endpoint must starts with 'https://' or 'http://'."
        );
      }
    });
    it("unexpect action check should ok", async () => {
      try {
        await cmReq({
          action: "userCr",
          endpoint: "https://openapi.wul.ai",
          pubkey: "pubkey",
          secret: "secret"
        });
      } catch (error) {
        expect(error.message).to.be.equal("Invalid action, please check it");
      }
    });
    it("unexpect apiVersion check should ok", async () => {
      try {
        await cmReq({
          action: "userCreate",
          endpoint: "https://openapi.wul.ai",
          pubkey: "pubkey",
          secret: "secret",
          apiVersion: "v5"
        });
      } catch (error) {
        expect(error.message).to.be.equal(
          "Invalid api version, please check it."
        );
      }
    });

    it("unexpect pubkey check should ok", async () => {
      try {
        await cmReq({
          action: "userCreate",
          endpoint: "https://openapi.wul.ai",
          pubkey: "",
          secret: "secret",
          apiVersion: "v1"
        });
      } catch (error) {
        expect(error.message).to.be.equal(
          "The pubkey or secret is incorrect. Please check it."
        );
      }
    });

    it("unexpect secret check should ok", async () => {
      try {
        await cmReq({
          action: "userCreate",
          endpoint: "https://openapi.wul.ai",
          pubkey: "pubkey",
          secret: "",
          apiVersion: "v1"
        });
      } catch (error) {
        expect(error.message).to.be.equal(
          "The pubkey or secret is incorrect. Please check it."
        );
      }
    });
  });
  describe("private methods should ok", () => {
    const cmReqModule = rewire("../lib/cmReq");
    it("getRandomString should ok", () => {
      const getRandomString = cmReqModule.__get__("getRandomString");
      const randomStr_32 = getRandomString(32);
      const randomStr_16 = getRandomString(16);
      expect(randomStr_16.length).to.be.equal(16);
      expect(randomStr_32.length).to.be.equal(32);
    });
    it("makeAuthHeaders should ok", () => {
      const makeAuthHeaders = cmReqModule.__get__("makeAuthHeaders");
      const headers = makeAuthHeaders("pubkey", "secret");
      expect(headers).to.have.keys([
        "Api-Auth-pubkey",
        "Api-Auth-nonce",
        "Api-Auth-timestamp",
        "Api-Auth-sign"
      ]);
    });
  });
});

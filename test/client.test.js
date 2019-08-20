"use strict";
const expect = require("chai").expect;
const muk = require("muk");
const httpx = require("httpx");
const rewire = require("rewire");
const WuLaiSDKClient = require("../lib/client");

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
describe("WuLai SDK Client", () => {
  describe("Client Class Initial", () => {
    it("expected config should ok", () => {
      const client = new WuLaiSDKClient({
        endpoint: "http://openapi.wul.ai",
        pubkey: "pubkey",
        secret: "secret",
        apiVersion: "v2"
      });
      expect(client.endpoint).to.equal("http://openapi.wul.ai");
      expect(client.pubkey).to.equal("pubkey");
      expect(client.secret).to.equal("secret");
      expect(client.apiVersion).to.equal("v2");
    });
    it("unexpected <endpoind> exception should ok", () => {
      try {
        new WuLaiSDKClient({
          endpoint: "http:openapi.wul.ai",
          pubkey: "pubkey",
          secret: "secret",
          apiVersion: "v2"
        });
      } catch (error) {
        expect(error.message).to.equal(
          "Endpoint parse error: endpoint must starts with 'https://' or 'http://'."
        );
      }
    });
    it("unexpected <pubkey> exception should ok", () => {
      try {
        new WuLaiSDKClient({
          endpoint: "https://openapi.wul.ai",
          pubkey: "",
          secret: "secret",
          apiVersion: "v2"
        });
      } catch (error) {
        expect(error.message).to.equal(
          "The pubkey or secret is incorrect. Please check it."
        );
      }
    });
    it("unexpected <secret> exception should ok", () => {
      try {
        new WuLaiSDKClient({
          endpoint: "https://openapi.wul.ai",
          pubkey: "pubkey",
          secret: "",
          apiVersion: "v2"
        });
      } catch (error) {
        expect(error.message).to.equal(
          "The pubkey or secret is incorrect. Please check it."
        );
      }
    });
  });

  describe("Client Common Request", () => {
    Mock(
      {
        statusCode: 200,
        headers: {
          "content-type": "application/json"
        }
      },
      JSON.stringify({
        ok: true
      })
    );
    it("expected action and params should ok", async () => {
      let client = new WuLaiSDKClient({
        endpoint: "https://openapi.wul.ai",
        pubkey: "pubkey",
        secret: "secret",
        apiVersion: "v2"
      });
      let response = await client.request("getBotResponse", {
        msg_body: {
          text: {
            content: "hello"
          }
        },
        user_id: "user_id"
      });
      expect(response).to.eql({ ok: true });
    });
    it("unexpected action should ok", async () => {
      let client = new WuLaiSDKClient({
        endpoint: "https://openapi.wul.ai",
        pubkey: "pubkey",
        secret: "secret",
        apiVersion: "v2"
      });
      try {
        await client.request("getBotResponse", {
          msg_body: {
            text: {
              content: "hello"
            }
          },
          user_id: "user_id"
        });
      } catch (error) {
        expect(error.message).to.equal("Invalid action, please check it");
      }
    });
  });
  describe("Client OpenAPI", async () => {
    Mock(
      {
        statusCode: 200,
        headers: {
          "content-type": "application/json"
        }
      },
      JSON.stringify({
        ok: true
      })
    );
    let client = new WuLaiSDKClient({
      endpoint: "https://openapi.wul.ai",
      pubkey: "pubkey",
      secret: "secret",
      apiVersion: "v2"
    });
    it("userCreate should ok", async () => {
      let response = await client.userCreate({});
      expect(response).to.eql({ ok: true });
    });
    it("userAttributeCreate should ok", async () => {
      let response = await client.userAttributeCreate({});
      expect(response).to.eql({ ok: true });
    });
    it("userAttributeList should ok", async () => {
      let response = await client.userAttributeList({});
      expect(response).to.eql({ ok: true });
    });
    it("getHistoryRecord should ok", async () => {
      let response = await client.getHistoryRecord({});
      expect(response).to.eql({ ok: true });
    });
    it("getBotResponse should ok", async () => {
      let response = await client.getBotResponse({});
      expect(response).to.eql({ ok: true });
    });
    it("getKeywordBotResponse should ok", async () => {
      let response = await client.getKeywordBotResponse({});
      expect(response).to.eql({ ok: true });
    });
    it("getTaskBotResponse should ok", async () => {
      let response = await client.getTaskBotResponse({});
      expect(response).to.eql({ ok: true });
    });
    it("getQABotResponse should ok", async () => {
      let response = await client.getQABotResponse({});
      expect(response).to.eql({ ok: true });
    });
  });
  describe("Client Private Methods", () => {
    const clientModule = rewire("../lib/client");
    it("getRandomString should ok", () => {
      const getRandomString = clientModule.__get__("getRandomString");
      const randomStr_32 = getRandomString(32);
      const randomStr_16 = getRandomString(16);
      expect(randomStr_16.length).to.be.equal(16);
      expect(randomStr_32.length).to.be.equal(32);
    });
    it("makeAuthHeaders should ok", () => {
      const makeAuthHeaders = clientModule.__get__("makeAuthHeaders");
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

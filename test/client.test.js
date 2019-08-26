"use strict";
const expect = require("chai").expect;
const rewire = require("rewire");
const WuLaiSDKClient = require("../lib/client");
const USER_ID = "wulai_node_sdk_test";
const PUBKEY = process.env.WULAI_SDK_PUBKEY;
const SECRET = process.env.WULAI_SDK_SECRET;

describe("WuLai SDK Client", () => {
  describe("Client Class Initial", () => {
    it("expected config should ok", () => {
      const client = new WuLaiSDKClient({
        endpoint: "http://openapi.wul.ai",
        pubkey: PUBKEY,
        secret: SECRET,
        apiVersion: "v2"
      });
      expect(client.endpoint).to.equal("http://openapi.wul.ai");
      expect(client.pubkey).to.equal(PUBKEY);
      expect(client.secret).to.equal(SECRET);
      expect(client.apiVersion).to.equal("v2");
    });
    it("unexpected <endpoind> exception should ok", () => {
      try {
        new WuLaiSDKClient({
          endpoint: "http:openapi.wul.ai",
          pubkey: PUBKEY,
          secret: SECRET,
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
          pubkey: "",
          secret: SECRET
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
          pubkey: PUBKEY,
          secret: ""
        });
      } catch (error) {
        expect(error.message).to.equal(
          "The pubkey or secret is incorrect. Please check it."
        );
      }
    });
  });

  describe("Client Common Request", () => {
    it("expected action and params should ok", async () => {
      let client = new WuLaiSDKClient({
        pubkey: PUBKEY,
        secret: SECRET,
        apiVersion: "v2"
      });
      console.log(client.endpoint);
      let response = await client.request("userCreate", {
        nickname: USER_ID,
        avatar_url:
          "https://laiye-im-saas.oss-cn-beijing.aliyuncs.com/rc-upload-1521637604400-2-login_logo.png",
        user_id: USER_ID
      });
      
      expect(response).to.eql({});
    });
    it("unexpected action should ok", async () => {
      let client = new WuLaiSDKClient({
        pubkey: PUBKEY,
        secret: SECRET,
        apiVersion: "v2"
      });
      try {
        await client.request("userCre", {
          nickname: USER_ID,
          avatar_url:
            "https://laiye-im-saas.oss-cn-beijing.aliyuncs.com/rc-upload-1521637604400-2-login_logo.png",
          user_id: USER_ID
        });
      } catch (error) {
        expect(error.message).to.equal("Invalid action, please check it");
      }
    });
  });
  describe("Client OpenAPI", async () => {
    let client = new WuLaiSDKClient({
      endpoint: "https://openapi.wul.ai",
      pubkey: PUBKEY,
      secret: SECRET,
      apiVersion: "v2"
    });
    it("userCreate should ok", async () => {
      let response = await client.userCreate({
        nickname: USER_ID,
        avatar_url:
          "https://laiye-im-saas.oss-cn-beijing.aliyuncs.com/rc-upload-1521637604400-2-login_logo.png",
        user_id: USER_ID
      });
      expect(response).to.eql({});
    });
    // it("userAttributeCreate should ok", async () => {
    //   let response = await client.userAttributeCreate({});
    //   expect(response).to.eql({ ok: true });
    // });
    // it("userAttributeList should ok", async () => {
    //   let response = await client.userAttributeList({});
    //   expect(response).to.eql({ ok: true });
    // });
    it("getHistoryRecord should ok", async () => {
      let response = await client.getHistoryRecord({
        direction: "BACKWARD",
        user_id: USER_ID,
        num: 10
      });
      expect(response).to.have.keys(["msg", "has_more"]);
    });
    it("getBotResponse should ok", async () => {
      let response = await client.getBotResponse({
        msg_body: {
          text: {
            content: "测试文本消息"
          }
        },
        user_id: USER_ID
      });
      expect(response).to.be.a("object");
    });
    it("getKeywordBotResponse should ok", async () => {
      let response = await client.getKeywordBotResponse({
        msg_body: {
          text: {
            content: "测试文本消息"
          }
        },
        user_id: USER_ID
      });
      expect(response).to.be.a("object");
    });
    it("getTaskBotResponse should ok", async () => {
      let response = await client.getTaskBotResponse({
        msg_body: {
          text: {
            content: "测试文本消息"
          }
        },
        user_id: USER_ID
      });
      expect(response).to.be.a("object");
    });
    it("getQABotResponse should ok", async () => {
      let response = await client.getQABotResponse({
        msg_body: {
          text: {
            content: "测试文本消息"
          }
        },
        user_id: USER_ID
      });
      expect(response).to.be.a("object");
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

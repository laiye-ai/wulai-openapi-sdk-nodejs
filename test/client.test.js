"use strict";
const expect = require("chai").expect;
const rewire = require("rewire");
const muk = require("muk");
const httpx = require("httpx");
const WuLaiSDKClient = require("../lib/client");
const { statusMap } = require("../lib/exception");

const USER_ID = "wulai_node_sdk_test";
const PUBKEY = process.env.WULAI_SDK_PUBKEY;
const SECRET = process.env.WULAI_SDK_SECRET;

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
    it("unexpected <apiVersion> exception should ok", () => {
      try {
        new WuLaiSDKClient({
          pubkey: PUBKEY,
          secret: SECRET,
          apiVersion: "v"
        });
      } catch (error) {
        expect(error.message).to.equal("Invalid api version, please check it.");
      }
    });
    it("unexpected <options> exception should ok", () => {
      try {
        new WuLaiSDKClient({
          pubkey: PUBKEY,
          secret: SECRET,
          apiVersion: "v2",
          options: "hello"
        });
      } catch (error) {
        expect(error.message).to.equal(
          "Invalid http options type, please check it."
        );
      }
    });
  });
  describe("Client Error (status >= 400 & status < 500) with exception should ok", () => {
    Mock(
      {
        statusCode: 400,
        headers: {
          "content-type": "application/json"
        }
      },
      JSON.stringify({
        code: 50001,
        error: "登录超时"
      })
    );
    it("json response ok", async () => {
      const client = new WuLaiSDKClient({
        pubkey: PUBKEY,
        secret: SECRET
      });
      try {
        let json = await client.getBotResponse({
          msg_body: {
            text: {
              content: "hello"
            }
          }
        });
        expect(json).to.be.an("object");
      } catch (err) {
        expect(err.name).to.equal(statusMap[400]);
        expect(err.message).to.equal(
          "status: 400, code: 50001, message: 登录超时"
        );
      }
    });
  });
  describe("Server Error (status >= 500) with exception should ok", () => {
    Mock(
      {
        statusCode: 500,
        headers: {
          "content-type": "application/json"
        }
      },
      JSON.stringify({
        code: 50002,
        error: "服务器异常"
      })
    );
    it("json response ok", async () => {
      const client = new WuLaiSDKClient({
        pubkey: PUBKEY,
        secret: SECRET,
        options: {
          maxRetry: 3
        }
      });
      try {
        let json = await client.getBotResponse({
          msg_body: {
            text: {
              content: "hello"
            }
          }
        });
        expect(json).to.be.an("object");
      } catch (err) {
        expect(err.name).to.equal(statusMap[500]);
        expect(err.message).to.equal(
          "status: 500, code: 50002, message: 服务器异常"
        );
      }
    });
  });
  describe("Request with unexpect json string response should ok", () => {
    Mock(
      {
        statusCode: 200,
        headers: {
          "content-type": "application/json"
        }
      },
      "{'age': 3"
    );
    it("json response ok", async () => {
      const client = new WuLaiSDKClient({
        pubkey: PUBKEY,
        secret: SECRET,
        options: {
          maxRetry: 5
        }
      });
      try {
        let json = await client.getBotResponse({
          msg_body: {
            text: {
              content: "hello"
            }
          }
        });
        expect(json).to.be.an("object");
      } catch (err) {
        expect(err.name).to.equal("Server Error");
        expect(err.message).to.equal("response json format error.");
      }
    });
  });
  describe("unexpected http options should ok", () => {
    it("exception should ok", async () => {
      let client = new WuLaiSDKClient({
        pubkey: PUBKEY,
        secret: SECRET,
        apiVersion: "v2"
      });
      try {
        await client.request("userCreate", {
          nickname: USER_ID,
          avatar_url:
            "https://laiye-im-saas.oss-cn-beijing.aliyuncs.com/rc-upload-1521637604400-2-login_logo.png",
          user_id: USER_ID
        }, null, "hello");
      } catch (error) {
        expect(error.message).to.equal("Invalid http options type, please check it.");
      }
    });
  });
  describe("Client Common Request", async () => {
    it("expected action and params should ok", async () => {
      let client = new WuLaiSDKClient({
        pubkey: PUBKEY,
        secret: SECRET,
        apiVersion: "v2"
      });
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
    
    it("request timeout exception should ok", async () => {
      let client = new WuLaiSDKClient(
        {
          pubkey: PUBKEY,
          secret: SECRET,
          apiVersion: "v2"
        },
        {
          timeout: 100
        }
      );
      try {
        await client.request("userCreate", {
          nickname: USER_ID,
          avatar_url:
            "https://laiye-im-saas.oss-cn-beijing.aliyuncs.com/rc-upload-1521637604400-2-login_logo.png",
          user_id: USER_ID
        });
      } catch (error) {
        expect(error.name).to.equal("RequestTimeoutError");
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
    //   let response = await client.userAttributeCreate({
    //     user_attribute_user_attribute_value: [
    //       {
    //         user_attribute: {
    //           id: "string"
    //         },
    //         user_attribute_value: {
    //           name: "string"
    //         }
    //       }
    //     ],
    //     user_id: USER_ID
    //   });

    //   expect(response).to.eql({ ok: true });
    // });
    it("userAttributeList should ok", async () => {
      let response = await client.userAttributeList({
        filter: {
          use_in_user_attribute_group: true
        },
        page: 1,
        page_size: 1
      });
      expect(response).to.be.an("object");
    });
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
    it("receiveUserMessage should ok", async () => {
      let response = await client.receiveUserMessage({
        msg_body: {
          text: {
            content: "测试文本消息"
          }
        },
        user_id: USER_ID
      });
      expect(response).to.be.have.key("msg_id");
    });
    it("syncUserMessage should ok", async () => {
      let response = await client.syncUserMessage({
        msg_body: {
          text: {
            content: "测试文本消息"
          }
        },
        user_id: USER_ID,
        msg_ts: Date.parse(new Date())
      });
      expect(response).to.be.have.key("msg_id");
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

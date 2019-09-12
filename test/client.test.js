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

WuLaiSDKClient.LogConfig(true, {
  stdout: true,
  fileout: true,
  filename: "logs/test.log"
});

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
          `status: 400, body: {"code":50001,"error":"登录超时"}`
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
          `status: 500, body: {"code":50002,"error":"服务器异常"}`
        );
      }
    });
  });
  describe("Server Error (status other) with exception should ok", () => {
    Mock(
      {
        statusCode: 301,
        headers: {
          "content-type": "application/json"
        }
      },
      JSON.stringify({
        code: 50002,
        error: "服务器异常"
      })
    );
    it("exception should ok", async () => {
      const client = new WuLaiSDKClient({
        pubkey: PUBKEY,
        secret: SECRET,
        debug: true,
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
        expect(err.name).to.equal("Unknown Server Error");
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
        await client.request("POST", "/v2/user/create", null, {
          nickname: USER_ID,
          avatar_url:
            "https://laiye-im-saas.oss-cn-beijing.aliyuncs.com/rc-upload-1521637604400-2-login_logo.png",
          user_id: USER_ID
        }, "hello");
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
      let response = await client.request("POST", "/v2/user/create", {username: "jj"}, {
        nickname: USER_ID,
        avatar_url:
          "https://laiye-im-saas.oss-cn-beijing.aliyuncs.com/rc-upload-1521637604400-2-login_logo.png",
        user_id: USER_ID
      });

      expect(response).to.eql({});
    });
    it("unexpected request url should ok", async () => {
      let client = new WuLaiSDKClient({
        pubkey: PUBKEY,
        secret: SECRET,
        apiVersion: "v2"
      });
      try {
        await client.request("POST", "/v2/user/cre", null, {
          nickname: USER_ID,
          avatar_url:
            "https://laiye-im-saas.oss-cn-beijing.aliyuncs.com/rc-upload-1521637604400-2-login_logo.png",
          user_id: USER_ID
        });
      } catch (error) {
        expect(error.name).to.equal("找不到指定的资源，或者请求由于未公开的原因（例如白名单）而被拒绝。");
      }
    });

    it("request timeout exception should ok", async () => {
      let client = new WuLaiSDKClient(
        {
          pubkey: PUBKEY,
          secret: SECRET,
          apiVersion: "v2",
          options: {
            timeout: 50
          }
        }
      );
      try {
        await client.createUser({
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
    it("API.createUser should ok", async () => {
      let response = await client.createUser({
        nickname: USER_ID,
        avatar_url:
          "https://laiye-im-saas.oss-cn-beijing.aliyuncs.com/rc-upload-1521637604400-2-login_logo.png",
        user_id: USER_ID
      });
      expect(response).to.eql({});
    });
    it("API.createUserAttribute should ok", async () => {
      let response = await client.createUserAttribute({
        user_attribute_user_attribute_value: [
          {
            user_attribute: {
              id: "100000"
            },
            user_attribute_value: {
              name: "男"
            }
          }
        ],
        user_id: USER_ID
      });

      expect(response).to.eql({});
    });
    it("API.userAttributeList should ok", async () => {
      let response = await client.listUserAttribute({
        filter: {
          use_in_user_attribute_group: true
        },
        page: 1,
        page_size: 1
      });
      expect(response).to.be.an("object");
    });
    it("API.getMsgHistory should ok", async () => {
      let response = await client.getMsgHistory({
        direction: "BACKWARD",
        user_id: USER_ID,
        num: 10
      });
      expect(response).to.have.keys(["msg", "has_more"]);
    });
    it("API.getBotResponse should ok", async () => {
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
    it("API.getKeywordResponse should ok", async () => {
      let response = await client.getKeywordResponse({
        msg_body: {
          text: {
            content: "测试文本消息"
          }
        },
        user_id: USER_ID
      });
      expect(response).to.be.a("object");
    });
    it("API.getTaskResponse should ok", async () => {
      let response = await client.getTaskResponse({
        msg_body: {
          text: {
            content: "测试文本消息"
          }
        },
        user_id: USER_ID
      });
      expect(response).to.be.a("object");
    });
    it("API.getQaResponse should ok", async () => {
      let response = await client.getQaResponse({
        msg_body: {
          text: {
            content: "测试文本消息"
          }
        },
        user_id: USER_ID
      });
      expect(response).to.be.a("object");
    });
    it("API.receiveMessage should ok", async () => {
      let response = await client.receiveMessage({
        msg_body: {
          text: {
            content: "测试文本消息"
          }
        },
        user_id: USER_ID
      });
      expect(response).to.be.have.key("msg_id");
    });
    it("API.syncMessage should ok", async () => {
      let response = await client.syncMessage({
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

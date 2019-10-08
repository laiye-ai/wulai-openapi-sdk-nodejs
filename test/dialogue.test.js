"use strict";
const WuLaiSDKClient = require("../lib/client");
const expect = require("chai").expect;
const USER_ID = "wulai_node_sdk_test";
const PUBKEY = process.env.WULAI_SDK_PUBKEY;
const SECRET = process.env.WULAI_SDK_SECRET;

describe("Client Dialogue API", async () => {
    let client = new WuLaiSDKClient({
        endpoint: "https://openapi.wul.ai",
        pubkey: PUBKEY,
        secret: SECRET,
        apiVersion: "v2"
    });
    it("getMsgHistory should ok", async () => {
        let response = await client.getMsgHistory({
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
    it("getKeywordResponse should ok", async () => {
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
    it("getTaskResponse should ok", async () => {
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
    it("getQaResponse should ok", async () => {
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
    it("receiveMessage should ok", async () => {
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
    it("syncMessage should ok", async () => {
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
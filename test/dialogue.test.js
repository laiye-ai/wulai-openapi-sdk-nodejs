"use strict";
const WuLaiSDKClient = require("../lib/client");
const expect = require("chai").expect;
const USER_ID = "wulai_node_sdk_test";
const PUBKEY = process.env.WULAI_SDK_PUBKEY;
const SECRET = process.env.WULAI_SDK_SECRET;

describe("对话类 API Test", async () => {
    let client = new WuLaiSDKClient({
        endpoint: "https://openapi.wul.ai",
        pubkey: PUBKEY,
        secret: SECRET,
        apiVersion: "v2"
    });
    it("getMsgHistory（查询历史消息） should ok", async () => {
        let response = await client.getMsgHistory({
            direction: "BACKWARD",
            user_id: USER_ID,
            num: 10
        });
        expect(response).to.have.keys(["msg", "has_more"]);
    });
    it("getBotResponse（获取机器人回复） should ok", async () => {
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
    it("getKeywordResponse（获取关键字机器人回复） should ok", async () => {
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
    it("getTaskResponse（获取任务机器人回复） should ok", async () => {
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
    it("getQaResponse（获取问答机器人回复） should ok", async () => {
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
    it("receiveMessage（接收用户发的消息） should ok", async () => {
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
    it("syncMessage（同步发给用户的消息） should ok", async () => {
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
    const newUserId = "newUser";
    it("sendMessage（给用户发消息） should ok", async () => {
        
        await client.createUser({
            user_id: newUserId,
            nickname: "超神"
        });
        let response = await client.sendMessage({
            user_id: newUserId,
            msg_body: {
                text: { content: "你好" }
            }
        });
        expect(response).to.be.have.key("msg_id");
    });
    it("getUserInputSug（获取用户输入联想） should ok", async () => {
        let response = await client.getUserInputSug({
            user_id: newUserId,
            query: "你"
        });
        expect(response).to.be.have.key("user_suggestions");
    });
});
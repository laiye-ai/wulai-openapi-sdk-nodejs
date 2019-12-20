"use strict";
const WuLaiSDKClient = require("../lib/client");
const expect = require("chai").expect;
const PUBKEY = process.env.WULAI_SDK_PUBKEY;
const SECRET = process.env.WULAI_SDK_SECRET;
let client = new WuLaiSDKClient({
    endpoint: "https://openapi.wul.ai",
    pubkey: PUBKEY,
    secret: SECRET,
    apiVersion: "v2"
});
describe("Statistics API", async () => {
    
    it("listQARecallDailyKnowledgeStats(查询问答召回数统计列表（知识点粒度，日报）) should ok", async () => {
        let response = await client.listQARecallDailyKnowledgeStats({
            start_date: "19700101",
            end_date: "19700101",
            page: 1,
            page_size: 10
        });
        expect(response).to.have.keys(["qa_recall_knowledge_stats", "page_count"]);
    });
    it("listQARecallDetailStats(查询问答召回数统计列表（日报）) should ok", async () => {
        let response = await client.listQARecallDailyStats({
            start_date: "19700101",
            end_date: "19700101"
        });
        expect(response).to.have.keys(["qa_recall_daily_stats"]);
    });
    // 添加问答满意度完整步骤封装
    async function addStatisfaction() {
        const newUserId = `userid: ${Date.parse(new Date)}`;
        const msgText = "sdktest";
        
        let userRes = await client.createUser({
            user_id: newUserId,
            nickname: "sdk_test"
        });
        if (!userRes) {return;}
        let botRes = await client.getBotResponse({
            user_id: newUserId,
            msg_body: {
                text: {
                    content: msgText
                }
            }
        });
        if (!botRes) {return;}
        let suggested_response_first = botRes.suggested_response[0];
        let bot = suggested_response_first.bot;
        let answer_id = botRes.suggested_response[0].response[0].answer_id;
        let syncRes = await client.syncMessage({
            user_id: newUserId,
            msg_body: {
                text: {
                    content: msgText
                }
            },
            msg_ts: `${Date.parse(new Date)}`,
            bot: bot,
            answer_id: answer_id
        });
        if (!syncRes) {return;}
        let syncMsgId = syncRes.msg_id;
        const params = {
            satisfaction: "THUMB_UP",
            msg_id: syncMsgId,
            user_id: newUserId,
            bot_id: {
                knowledge_id: bot.qa.knowledge_id + ""
            }
        };
        let addStatisfactionRes = await client.createQASatisfaction(params);
        return addStatisfactionRes;
    }
    it("createQASatisfaction(添加用户满意度评价) should ok", async () => {
        let response = await addStatisfaction();
        expect(response).to.be.eql({});
    });

    it("listQASatisfactionDailyKnowledgeStats(查询问答满意度评价统计列表（知识点粒度，日报）) should ok", async () => {
        const response = await client.listQASatisfactionDailyKnowledgeStats({
            end_date: "19700101",
            page_size: 10,
            page: 1,
            start_date: "19700101"
        });
        expect(response).to.have.keys(["page_count", "qa_satisfaction_knowledge_stats"]);
    });
});

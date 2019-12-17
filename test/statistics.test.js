"use strict";
const WuLaiSDKClient = require("../lib/api/statistics");
const expect = require("chai").expect;
const PUBKEY = process.env.WULAI_SDK_PUBKEY;
const SECRET = process.env.WULAI_SDK_SECRET;

describe("Client Statistics API", async () => {
    let client = new WuLaiSDKClient({
        endpoint: "https://openapi.wul.ai",
        pubkey: PUBKEY,
        secret: SECRET,
        apiVersion: "v2"
    });
    it("listQARecallDetailStats", async () => {
        let res = await client.listQARecallDailyStats({
            start_date: "19700101",
            end_date: "19700101"
        });
    });
});
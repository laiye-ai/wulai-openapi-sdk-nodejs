"use strict";

const WulaiClient = require("./index");
const client = new WulaiClient({
    pubkey: "string",
    secret: "string",
    endpoint: "string",
    apiVersion: "v2",
    options: {
        timeout: 3000,
        agent: "<Http Agent>",
        compression: "boolean",
        maxRetry: "number",
        headers: "object"
    }
});

const params = {
    msg_body: {
        text: {
            content: "你好"
        }
    },
    user_id: "user_id"
};
client.request("POST", "/v2/msg/bot-response", null, params, {
    timeout: 10000
});
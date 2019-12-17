"use strict";
const SdkBase = require("../core/sdkBase");
class Dialogue extends SdkBase {
    /**
     * 查询历史消息
     */
    getMsgHistory(body, options) {
        const url = `/${this.apiVersion}/msg/history`;
        return this.request("POST", url, null, body, options);
    }
    /**
     * 获取机器人回复
     */
    getBotResponse(body, options) {
        const url = `/${this.apiVersion}/msg/bot-response`;
        return this.request("POST", url, null, body, options);
    }
    /**
     * 获取关键字机器人回复
     */
    getKeywordResponse(body, options) {
        const url = `/${this.apiVersion}/msg/bot-response/keyword`;
        return this.request("POST", url, null, body, options);
    }
    /**
     * 获取任务机器人回复
     */
    getTaskResponse(body, options) {
        const url = `/${this.apiVersion}/msg/bot-response/task`;
        return this.request("POST", url, null, body, options);
    }
    /**
     * 获取问答机器人回复
     */
    getQaResponse(body, options) {
        const url = `/${this.apiVersion}/msg/bot-response/qa`;
        return this.request("POST", url, null, body, options);
    }
    /**
     * 接收用户发的消息
     */
    receiveMessage(body, options) {
        const url = `/${this.apiVersion}/msg/receive`;
        return this.request("POST", url, null, body, options);
    }
    /**
     * 同步发给用户的消息
     */
    syncMessage(body, options) {
        const url = `/${this.apiVersion}/msg/sync`;
        return this.request("POST", url, null, body, options);
    }
}
module.exports = Dialogue;
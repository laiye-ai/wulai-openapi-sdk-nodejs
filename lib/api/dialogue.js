"use strict";

/** 
 * 对话API
*/
const dialogueMixin = {
    /**
     * 查询历史消息
     */
    getMsgHistory(data, options) {
        const url = `/${this.apiVersion}/msg/history`;
        return this.request("POST", url, null, data, options);
    },
    /**
     * 获取机器人回复
     */
    getBotResponse(data, options) {
        const url = `/${this.apiVersion}/msg/bot-response`;
        return this.request("POST", url, null, data, options);
    },
    /**
     * 获取关键字机器人回复
     */
    getKeywordResponse(data, options) {
        const url = `/${this.apiVersion}/msg/bot-response/keyword`;
        return this.request("POST", url, null, data, options);
    },
    /**
     * 获取任务机器人回复
     */
    getTaskResponse(data, options) {
        const url = `/${this.apiVersion}/msg/bot-response/task`;
        return this.request("POST", url, null, data, options);
    },
    /**
     * 获取问答机器人回复
     */
    getQaResponse(data, options) {
        const url = `/${this.apiVersion}/msg/bot-response/qa`;
        return this.request("POST", url, null, data, options);
    },
    /**
     * 接收用户发的消息
     */
    receiveMessage(data, options) {
        const url = `/${this.apiVersion}/msg/receive`;
        return this.request("POST", url, null, data, options);
    },
    /**
     * 同步发给用户的消息
     */
    syncMessage(data, options) {
        const url = `/${this.apiVersion}/msg/sync`;
        return this.request("POST", url, null, data, options);
    }
};

module.exports = dialogueMixin;
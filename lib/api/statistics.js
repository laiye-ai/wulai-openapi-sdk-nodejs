"use strict";

/** 
 * 统计类API
*/
const statistics = {
    /** 
     * 查询问答召回数统计列表（日报）
    */
    listQARecallDailyStats(body, options) {
        const url = `/${this.apiVersion}/stats/qa/recall/daily/list`;
        return this.request("POST", url, null, body, options);
    },
    /** 
     * 添加用户满意度评价
    */
    createQASatisfaction(body, options) {
        const url = `/${this.apiVersion}/qa/satisfaction/create`;
        return this.request("POST", url, null, body, options);
    },
    /** 
     * 查询问答召回数统计列表（知识点粒度，日报）
    */
    listQARecallDailyKnowledgeStats(body, options) {
        const url = `/${this.apiVersion}/stats/qa/recall/daily/knowledge/list`;
        return this.request("POST", url, null, body, options);
    },
    /** 
     * 查询问答满意度评价统计列表（知识点粒度，日报）
    */
    listQASatisfactionDailyKnowledgeStats(body, options) {
        const url = `/${this.apiVersion}/stats/qa/satisfaction/daily/knowledge/list`;
        return this.request("POST", url, null, body, options);
    }
};

module.exports = statistics;
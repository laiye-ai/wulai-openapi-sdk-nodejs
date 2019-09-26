"use strict";

const knowledge = {
    /** 
     * 查询相似问列表
    */
    listSimilarQuestions(body, options) {
        const url = `/${this.apiVersion}/qa/similar-question/list`;
        return this.request("POST", url, null, body, options);
    },
    /**
     * 删除相似问
     */
    deleteSimilarQuestion(body, options) {
        const url = `/${this.apiVersion}/qa/similar-question/delete`;
        return this.request("POST", url, null, body, options);
    },
    /** 
     * 更新属性组
    */
    updateUserAttributeGroup(body, options) {
        const url = `/${this.apiVersion}/qa/user-attribute-group-items/update`;
        return this.request("POST", url, null, body, options);
    },
    /** 
     * 创建相似问
    */
    createSimilarQuestion(body, options) {
        const url = `/${this.apiVersion}/qa/similar-question/create`;
        return this.request("POST", url, null, body, options);
    },
    /** 
     * 查询知识点列表
    */
    listKnowledgeItems(body, options) {
        const url = `/${this.apiVersion}/qa/knowledge-items/list`;
        return this.request("POST", url, null, body, options);
    },
    /** 
     * 创建知识点
    */
    createKnowledgeTagKnowledge(body, options) {
        const url = `/${this.apiVersion}/qa/knowledge-tag-knowledge/create`;
        return this.request("POST", url, null, body, options);
    },
    /**
     * 获取知识点分类列表
     */
    listKnowledgeTags(body, options) {
        const url = `/${this.apiVersion}/qa/knowledge-tags/list`;
        return this.request("POST", url, null, body, options);
    },
    /** 
     * 更新知识点
    */
    updateKnowledge(body, options) {
        const url = `/${this.apiVersion}/qa/knowledge/update`;
        return this.request("POST", url, null, body, options);
    }
};

module.exports = knowledge;
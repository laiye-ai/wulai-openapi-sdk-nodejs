"use strict";
const SdkBase = require("../core/sdkBase");

class Knowledge extends SdkBase {
    /** 
     * 查询相似问列表
    */
   listSimilarQuestions(body, options) {
        const url = `/${this.apiVersion}/qa/similar-question/list`;
        return this.request("POST", url, null, body, options);
    }
    /**
     * 删除相似问
     */
    deleteSimilarQuestion(body, options) {
        const url = `/${this.apiVersion}/qa/similar-question/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建相似问
    */
    createSimilarQuestion(body, options) {
        const url = `/${this.apiVersion}/qa/similar-question/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新相似问
    */
    updateSimilarQuestion(body, options) {
        const url = `/${this.apiVersion}/qa/similar-question/update`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询知识点列表
    */
    listKnowledgeItems(body, options) {
        const url = `/${this.apiVersion}/qa/knowledge-items/list`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建知识点
    */
    createKnowledgeTagKnowledge(body, options) {
        const url = `/${this.apiVersion}/qa/knowledge-tag-knowledge/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新知识点
    */
    updateKnowledge(body, options) {
        const url = `/${this.apiVersion}/qa/knowledge/update`;
        return this.request("POST", url, null, body, options);
    }
    /**
     * 获取知识点分类列表
     */
    listKnowledgeTags(body, options) {
        const url = `/${this.apiVersion}/qa/knowledge-tags/list`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建知识点分类
    */
    createKnowledgeTag(body, options) {
        const url = `/${this.apiVersion}/qa/knowledge-tag/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新知识点分类
    */
    updateKnowledgeTag(body, options) {
        const url = `/${this.apiVersion}/qa/knowledge-tag/update`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 删除知识点分类
    */
    deleteKnowledgeTag(body, options) {
        const url = `/${this.apiVersion}/qa/knowledge-tag/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 删除属性组回复
    */
    deleteUserAttributeGroupAnswer(body, options) {
        const url = `/${this.apiVersion}/qa/user-attribute-group-answer/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建属性组回复
    */
    createUserAttributeGroupAnswer(body, options) {
        const url = `/${this.apiVersion}/qa/user-attribute-group-answer/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新属性组回复
    */
    updateUserAttributeGroupAnswer(body, options) {
        const url = `/${this.apiVersion}/qa/user-attribute-group-answer/update`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新属性组
    */
    updateUserAttributeGroup(body, options) {
        const url = `/${this.apiVersion}/qa/user-attribute-group-items/update`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询属性组及属性列表
    */
    listUserAttributeGroupItems(body, options) {
        const url = `/${this.apiVersion}/qa/user-attribute-group-items/list`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询属性组回复列表
    */
    listUserAttributeGroupAnswers(body, options) {
        const url = `/${this.apiVersion}/qa/user-attribute-group-answers/list`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建属性组
    */
    createUserAttributeGroup(body, options) {
        const url = `/${this.apiVersion}/qa/user-attribute-group-items/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 批量添加知识点列表
    */
    batchCreateKnowledgeItems(body, options) {
        const url = `/${this.apiVersion}/qa/knowledge-items/batch-create`;
        return this.request("POST", url, null, body, options);
    }
}

module.exports = Knowledge;

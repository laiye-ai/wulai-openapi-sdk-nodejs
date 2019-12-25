"use strict";
const SdkBase = require("../core/sdkBase");

class Dictionary extends SdkBase {
    
    /**
     * 删除专有词汇
     */
    deleteTerm(body, options) {
        const url = `/${this.apiVersion}/dictionary/term/delete`;
        return this.request("POST", url, null, body, options);
    }
    /**
     * 创建专有词汇
     */
    createTerm(body, options) {
        const url = `/${this.apiVersion}/dictionary/term/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新专有词汇
    */
    updateTerm(body, options) {
        const url = `/${this.apiVersion}/dictionary/term/update`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询专有词汇列表
    */
    listTerm(body, options) {
        const url = `/${this.apiVersion}/dictionary/term/list`;
        return this.request("POST", url, null, body, options);
    }
    /**
     * 查询全部实体概要
     */
    listEntities(body, options) {
        const url = `/${this.apiVersion}/dictionary/entity/list`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建意图实体
    */
    createIntentEntity(body, options) {
        const url = `/${this.apiVersion}/dictionary/entity/intent/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建枚举实体值
    */
    createEnumerationEntityValue(body, options) {
        const url = `/${this.apiVersion}/dictionary/entity/enumeration/value/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建意图实体值相似说法
    */
    createIntentEntityValue(body, options) {
        const url = `/${this.apiVersion}/dictionary/entity/intent/value/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 删除意图实体值相似问说法
    */
    deleteIntentEntityValue(body, options) {
        const url = `/${this.apiVersion}/dictionary/entity/intent/value/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 删除枚举实体值
    */
    deleteEnumerationEntityValue(body, options) {
        const url = `/${this.apiVersion}/dictionary/entity/enumeration/value/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 删除实体
    */
    deleteEntity(body, options) {
        const url = `/${this.apiVersion}/dictionary/entity/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询一个实体详情
    */
    getEntity(body, options) {
        const url = `/${this.apiVersion}/dictionary/entity/get`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建枚举实体
    */
    createEnumerationEntity(body, options) {
        const url = `/${this.apiVersion}/dictionary/entity/enumeration/create`;
        return this.request("POST", url, null, body, options);
    }
}

module.exports = Dictionary;
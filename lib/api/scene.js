"use strict";
const SdkBase = require("../core/sdkBase");

/** 
 * 任务类
*/
class Scene extends SdkBase {
    /** 
     * 创建场景
     * 创建任务对话中的一个场景。
    */
    createScene(body, options) {
        const url = `/${this.apiVersion}/scene/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新场景
     * 更新任务对话中的一个场景
    */
    updateScene(body, options) {
        const url = `/${this.apiVersion}/scene/update`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 删除场景
     * 删除任务对话中的一个场景
    */
    deleteScene(body, options) {
        const url = `/${this.apiVersion}/scene/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建意图
     * 创建场景下的一个意图
    */
    createIntent(body, options) {
        const url = `/${this.apiVersion}/scene/intent/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新意图
     * 更新场景下的一个意图
    */
    updateIntent(body, options) {
        const url = `/${this.apiVersion}/scene/intent/update`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新意图状态
     * 将意图生效或者下线，同时需要指定意图的第一个单元。
    */
    updateIntentStatus(body, options) {
        const url = `/${this.apiVersion}/scene/intent/status/update`;
        return this.request("POST", url, null, body, options);
    }
    /**
     * 删除意图
     * 删除场景下的一个意图
     */
    deleteIntent(body, options) {
        const url = `/${this.apiVersion}/scene/intent/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询意图列表
     * 查询一个场景下的所有意图
    */
    listIntents(body, options) {
        const url = `/${this.apiVersion}/scene/intent/list`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建触发器
     * 创建一条触发器内容。触发器的文本匹配模式可以选择：完全匹配的关键词，包含匹配的关键词，或者相似说法。
    */
    createIntentTrigger(body, options) {
        const url = `/${this.apiVersion}/scene/intent/trigger/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新触发器
     * 更新一条触发内容
    */
    updateIntentTrigger(body, options) {
        const url = `/${this.apiVersion}/scene/intent/trigger/update`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 删除触发器
     * 删除一条触发内容
    */
    deleteIntentTrigger(body, options) {
        const url = `/${this.apiVersion}/scene/intent/trigger/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询触发器列表
     * 查询一个意图中的所有触发器内容
    */
    listIntentTriggers(body, options) {
        const url = `/${this.apiVersion}/scene/intent/trigger/list`;
        return this.request("POST", url, null, body, options);
    }

    /** 
     * 创建词槽
     * 创建词槽，包括设置词槽是否允许整句填槽
    */
    createSlot(body, options) {
        const url = `/${this.apiVersion}/scene/slot/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新词槽
    */
    updateSlot(body, options) {
        const url = `/${this.apiVersion}/scene/slot/update`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询词槽
    */
    getSlot(body, options) {
        const url = `/${this.apiVersion}/scene/slot/get`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询词槽列表
    */
    listSlots(body, options) {
        const url = `/${this.apiVersion}/scene/slot/list`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 删除词槽
    */
    deleteSlot(body, options) {
        const url = `/${this.apiVersion}/scene/slot/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建消息发送单元
    */
    createInformBlock(body, options) {
        const url = `/${this.apiVersion}/scene/block/inform-block/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新消息发送单元
    */
    updateInformBlock(body, options) {
        const url = `/${this.apiVersion}/scene/block/inform-block/update`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询消息发送单元
     * 查询一个消息发送单元的详情，包括单元设置、单元回复、和该单元与其他单元的跳转关系
    */
    getInformBlock(body, options) {
        const url = `/${this.apiVersion}/scene/block/inform-block/get`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建单元内回复
     * 给询问填槽单元或消息发送单元添加一条回复
    */
    createBlockResponse(body, options) {
        const url = `/${this.apiVersion}/scene/block/response/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新单元内回复
     * 给询问填槽单元或消息发送单元更新一条回复。
    */
    updateBlockResponse(body, options) {
        const url = `/${this.apiVersion}/scene/block/response/update`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 删除单元内回复
    */
    deleteBlockResponse(body, options) {
        const url = `/${this.apiVersion}/scene/block/response/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询任务待审核消息列表
     * 查询触发意图的待审核消息列表
    */
    listIntentTriggerLearnings(body, options) {
        const url = `/${this.apiVersion}/scene/intent/trigger-learning/list`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 删除任务待审核消息
     * 删除一条触发意图的待审核消息
    */
    deleteIntentTriggerLearning(body, options) {
        const url = `/${this.apiVersion}/scene/intent/trigger-learning/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建询问填槽单元
     * 必须先创建一个词槽，才可以在单元中使用它作为关联词槽
    */
    createRequestBlock(body, options) {
        const url = `/${this.apiVersion}/scene/block/request-block/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新询问填槽单元
    */
    updateRequestBlock(body, options) {
        const url = `/${this.apiVersion}/scene/block/request-block/update`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询询问填槽单元
     * 查询一个询问填槽单元的详情，包括单元设置、单元回复、该单元与其他单元的跳转关系等
    */
    getRequestBlock(body, options) {
        const url = `/${this.apiVersion}/scene/block/request-block/get`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 删除单元
     * 删除一个对话单元，支持所有类型的单元
    */
    deleteOneBlock(body, options) {
        const url = `/${this.apiVersion}/scene/block/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询单元列表
     * 查询意图里的所有单元
    */
    listBlocks(body, options) {
        const url = `/${this.apiVersion}/scene/block/list`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建单元关系
     * 创建单元与单元之间的跳转关系，包括当前单元、下一个单元、以及跳转条件
    */
    createBlockRelation(body, options) {
        const url = `/${this.apiVersion}/scene/block/relation/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 删除单元关系
     * 删除一条单元与单元之间的跳转关系
    */
    deleteBlockRelation(body, options) {
        const url = `/${this.apiVersion}/scene/block/relation/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建意图终点单元
    */
    createEndBlock(body, options) {
        const url = `/${this.apiVersion}/scene/block/end-block/create`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 更新意图终点单元
    */
    updateEndBlock(body, options) {
        const url = `/${this.apiVersion}/scene/block/end-block/update`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询意图终点单元
    */
    getEndBlock(body, options) {
        const url = `/${this.apiVersion}/scene/block/end-block/get`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 查询词槽数据来源
    */
    listSlotDataSources(body, options) {
        const url = `/${this.apiVersion}/scene/slot/data-source/list`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 删除词槽数据来源
    */
    deleteSlotDataSource(body, options) {
        const url = `/${this.apiVersion}/scene/slot/data-source/delete`;
        return this.request("POST", url, null, body, options);
    }
    /** 
     * 创建词槽数据来源
    */
    createSlotDataSource(body, options) {
        const url = `/${this.apiVersion}/scene/slot/data-source/create`;
        return this.request("POST", url, null, body, options);
    }
}

module.exports = Scene;
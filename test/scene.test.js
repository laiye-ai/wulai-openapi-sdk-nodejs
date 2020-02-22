"use strict";
const WuLaiSDKClient = require("../lib/client");
const expect = require("chai").expect;
const PUBKEY = process.env.WULAI_SDK_PUBKEY;
const SECRET = process.env.WULAI_SDK_SECRET;
let client = new WuLaiSDKClient({
    endpoint: "https://openapi.wul.ai",
    pubkey: PUBKEY,
    secret: SECRET,
    // debug: true,
    apiVersion: "v2"
});

describe("任务类 API Test", async () => {
    const createdSceneName = 'NodeSDKScene'
    let createdSceneId = ''
    it("createScene(创建场景) should ok", async () => {
        let res = await client.createScene({
            scene: {
                name: createdSceneName,
                intent_switch_mode: "INTENT_SWITCH_MODE_SWITCH",
                smart_slot_filling_threshold: 0.7,
                description: 'NodeSDKScene description: ' + Date.parse(new Date())
            }
        })
        createdSceneId = res.scene.id
        expect(res).to.have.keys(["scene"]);
    });
    it("updateScene(更新场景) should ok", async () => {
        let res = await client.updateScene({
            scene: {
                id: createdSceneId,
                name: createdSceneName + ':updated'
            }
        })
        expect(res).to.have.keys(["scene"]);
    });
    const CreatedIntentName = 'SDKCreateIntent'
    let CreatedIntentId = null
    it("createIntent(创建意图) should ok", async () => {
        let res = await client.createIntent({
            intent: {
                name: CreatedIntentName,
                scene_id: createdSceneId,
                lifespan_mins: 5
            }
        })
        CreatedIntentId = res.intent.id
        expect(res).to.have.keys(["intent"]);
    });
    it("updateIntent(更新意图) should ok", async () => {
        let res = await client.updateIntent({
            intent: {
                id: CreatedIntentId,
                name: CreatedIntentName + '-updated'
            }
        })
        CreatedIntentId = res.intent.id
        expect(res).to.have.keys(["intent"]);
    });
    it("listIntends(查询意图列表) should ok", async () => {
        let res = await client.listIntents({
            scene_id: createdSceneId
        })
        expect(res).to.have.keys(["intents"]);
    });
    let createdIntentTriggerId = null
    it("createIntentTrigger(创建触发器) should ok", async () => {
        let res = await client.createIntentTrigger({
            intent_trigger: {
                text: 'SDKTest',
                intent_id: CreatedIntentId,
                type: "TRIGGER_TYPE_EXACT_MATCH_KEYWORD"
            }
        })
        createdIntentTriggerId = res.intent_trigger.id
        expect(res).to.have.keys(["intent_trigger"]);
    });
    it("updateIntentTrigger(更新触发器) should ok", async () => {
        let res = await client.updateIntentTrigger({
            intent_trigger: {
                text: '123456',
                id: createdIntentTriggerId
            }
        })
        expect(res).to.have.keys(["intent_trigger"]);
    });
    it("listIntentTriggers(查询触发器列表) should ok", async () => {
        let res = await client.listIntentTriggers({
            intent_id: CreatedIntentId,
            page: 1,
            page_size: 10
        })
        expect(res).to.have.keys(["intent_triggers"]);
    });
    let createdSlotId = null
    it("createSlot(创建词槽) should ok", async () => {
        let res = await client.createSlot({
            slot: {
                scene_id: createdSceneId,
                name: 'SDKCreateSlot',
                query_slot_filling: true
            }
        })
        createdSlotId = res.slot.id
        expect(res).to.have.keys(["slot"]);
    });
    it("updateSlot(更新词槽) should ok", async () => {
        let res = await client.updateSlot({
            slot: {
                id: createdSlotId,
                name: 'SDKCreateSlot111'
            }
        })
        expect(res).to.have.keys(["slot"]);
    });
    it("getSlot(查询词槽) should ok", async () => {
        let res = await client.getSlot({
            id: createdSlotId
        })
        expect(res).to.have.keys(["slot"]);
    });
    it("listSlots(查询词槽列表) should ok", async () => {
        let res = await client.listSlots({
            scene_id: createdSceneId,
            page: 1,
            page_size: 10
        })
        expect(res).to.have.keys(["slots"]);
    });

    let createdRequestBlockId = null
    it("createRequestBlock(创建询问填槽单元) should ok", async () => {
        let res = await client.createRequestBlock({
            block: {
                name: 'SDK创建的填槽单元',
                slot_id: createdSlotId,
                mode: "RESPONSE_ALL",
                intent_id: CreatedIntentId
            }
        })
        createdRequestBlockId = res.block.id
        expect(res).to.have.keys(['block'])
    });
    it("updateRequestBlock(更新询问填槽单元) should ok", async () => {
        let res = await client.updateRequestBlock({
            block: {
                id: createdRequestBlockId,
                intent_id: CreatedIntentId,
                slot_id: createdSlotId,
                slot_filling_when_asked: true
            }
        })
        expect(res).to.have.keys(['block'])
    });
    it("createInformBlock(创建消息发送单元) should ok", async () => {
        let res = await client.getRequestBlock({
            id: createdRequestBlockId
        })
        expect(res).to.have.keys(["block"]);
    });
    let createdInformBlockId = null
    it("createInformBlock(创建消息发送单元) should ok", async () => {
        let res = await client.createInformBlock({
            block: {
                intent_id: CreatedIntentId,
                name: '第一条消息',
                mode: "RESPONSE_ALL"
            }
        })
        createdInformBlockId = res.block.id
        expect(res).to.have.keys(["block"]);
    });
    
    it("updateInformBlock(更新消息发送单元) should ok", async () => {
        let res = await client.updateInformBlock({
            block: {
                id: createdInformBlockId,
                name: '第一条消息:updated'
            }
        })
        expect(res).to.have.keys(["block"]);
    });
    it("getInformBlock(查询消息发送单元) should ok", async () => {
        let res = await client.getInformBlock({
            id: createdInformBlockId
        })
        expect(res).to.have.keys(["block"]);
    });
    it("listBlocks(查询单元列表) should ok", async () => {
        let res = await client.listBlocks({
            intent_id: CreatedIntentId,
            page: 1,
            page_size: 10
        })
        expect(res).to.have.keys(['blocks'])
    });
    // let createdRequestBlockResponseId = null
    it("createBlockResponse(创建询问单元内回复) should ok", async () => {
        let res = await client.createBlockResponse({
            response: {
                block_id: createdRequestBlockId,
                response: {
                    text: {
                        content: "询问单元"
                    }
                }
            }
        })
        // createdRequestBlockResponseId = res.response.id
        expect(res).to.have.keys(["response"]);
    });
    let createdInformBlockResponseId = null
    it("createBlockResponse(创建消息发送单元内回复) should ok", async () => {
        let res = await client.createBlockResponse({
            response: {
                block_id: createdInformBlockId,
                response: {
                    text: {
                        content: "SDK创建的第一条消息"
                    }
                }
            }
        })
        createdInformBlockResponseId = res.response.id
        expect(res).to.have.keys(["response"]);
    });
    let createdBlockRelationId = null
    it("createBlockRelation(创建单元关系) should ok", async () => {
        let res = await client.createBlockRelation({
            relation: {
                connection: {
                    from_block_id: createdRequestBlockId,
                    to_block_id: createdInformBlockId,
                    condition: {
                        default: {}
                    }
                },
                intent_id: CreatedIntentId
            }
        })
        createdBlockRelationId = res.relation.id
        expect(res).to.have.keys(["relation"]);
    });
    it("updateBlockResponse(更新单元内回复) should ok", async () => {
        let res = await client.updateBlockResponse({
            response: {
                id: createdInformBlockResponseId,
                response: {
                    text: {
                        content: "SDK创建的第一条消息: 更新后的消息"
                    }
                }
            }
        })
        expect(res).to.have.keys(["response"]);
    });
    it("updateIntentStatus(更新意图状态) should ok", async () => {
        let res = await client.updateIntentStatus({
            status: true,
            intent_id: CreatedIntentId,
            first_block_id: createdRequestBlockId
        })
        expect(res).to.have.keys(['status', 'intent_id', 'first_block_id', "update_time"])
    });
    let createdEndBlockId = null
    it("createEndBlock(创建意图结束单元) should ok", async () => {
        let res = await client.createEndBlock({
            block: {
                intent_id: CreatedIntentId,
                action: { end: {} },
                name: '结束单元'
            }
        })
        createdEndBlockId = res.block.id
        expect(res).to.have.keys(["block"]);
    });
    it("updateEndBlock(更新意图结束单元) should ok", async () => {
        let res = await client.updateEndBlock({
            block: {
                id: createdEndBlockId,
                action: { last: {} },
                name: '结束单元...'
            }
        })
        expect(res).to.have.keys(["block"]);
    });
    it("getEndBlock(查询意图结束单元) should ok", async () => {
        let res = await client.getEndBlock({
            id: createdEndBlockId
        })
        expect(res).to.have.keys(["block"]);
    });
    it("listIntentTriggerLearnings(查询任务待审核消息列表) should ok", async () => {
        let res = await client.listIntentTriggerLearnings({
            page: 1,
            page_size: 10
        })
        expect(res).to.have.keys(['query_items'])
    });
    it("deleteBlockResponse(删除单元内回复) should ok", async () => {
        let res = await client.deleteBlockResponse({
            id: createdInformBlockResponseId
        })
        expect(res).to.be.eql({});
    });
    it("deleteBlockRelation(删除单元关系) should ok", async () => {
        let res = await client.deleteBlockRelation({
            id: createdBlockRelationId
        })
        expect(res).to.be.eql({});
    });
    it("deleteOneBlock(删除单元) should ok", async () => {
        let res = await client.deleteOneBlock({
            id: createdRequestBlockId
        })
        expect(res).to.be.eql({});
    });
    it("deleteSlot(删除词槽) should ok", async () => {
        let res = await client.deleteSlot({
            id: createdSlotId
        })
        expect(res).to.be.eql({});
    });
    it("deleteIntentTrigger(删除触发器) should ok", async () => {
        let res = await client.deleteIntentTrigger({
            id: createdIntentTriggerId
        })
        expect(res).to.be.eql({});
    });
    it("deleteIntent(删除意图) should ok", async () => {
        let res = await client.deleteIntent({
            id: CreatedIntentId
        })
        expect(res).to.be.eql({});
    });
    it("deleteScene(删除场景) should ok", async () => {
        let res = await client.deleteScene({
            id: createdSceneId
        })
        expect(res).to.be.eql({});
    });
})
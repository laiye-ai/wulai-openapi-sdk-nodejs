"use strict";
const WuLaiSDKClient = require("../lib/client");
const expect = require("chai").expect;
const PUBKEY = process.env.WULAI_SDK_PUBKEY;
const SECRET = process.env.WULAI_SDK_SECRET;

describe("知识点类 API Test", async () => {
    let client = new WuLaiSDKClient({
        endpoint: "https://openapi.wul.ai",
        pubkey: PUBKEY,
        secret: SECRET,
        apiVersion: "v2"
    });
    let knowledgeTagId = "";
    let knowledgeId = "";
    let similarQuestionId = "";
    let attributeGroupId = "";
    let attributeGroupAnswerId = "";

    it("listKnowledgeTags（查询知识点分类列表） should ok", async () => {
        let response = await client.listKnowledgeTags({
            page: 1,
            page_size: 10,
        });
        knowledgeTagId = response.knowledge_tags[0].id;
        expect(response).to.have.keys(["knowledge_tags", "page_count"]);
    });
    it("createKnowledgeTagKnowledge（创建知识点） should ok", async () => {
        let response = await client.createKnowledgeTagKnowledge({
            knowledge_tag_knowledge: {
                knowledge_tag_id: knowledgeTagId,
                knowledge: {
                    status: true,
                    standard_question: "hello, sdk: " + Date.parse(new Date),
                    respond_all: true,
                    maintained_by_user_attribute_group: true,
                }
            }
        });
        expect(response).to.have.keys(["knowledge_tag_knowledge"]);
    });
    let createdKnowledgeTag = null;
    it("createKnowledgeTag（创建知识点分类） should ok", async () => {
        let response = await client.createKnowledgeTag({
            knowledge_tag: {
                name: "tag-1"
            }
        });
        createdKnowledgeTag = response.knowledge_tag;
        expect(response).to.have.keys(["knowledge_tag"]);
    });
    it("updateKnowledgeTag（更新知识点分类） should ok", async () => {
        let response = await client.updateKnowledgeTag({
            knowledge_tag: {
                id: createdKnowledgeTag.id,
                name: "tag-2"
            }
        });
        expect(response).to.have.keys(["knowledge_tag"]);
    });
    it("batchCreateKnowledgeItems（批量添加知识点列表） should ok", async () => {
        let response = await client.batchCreateKnowledgeItems({
            knowledge_items: [{
                knowledge_tag: {
                    id: createdKnowledgeTag.id
                },
                knowledge: {
                    status: true,
                    create_time: Date.parse(new Date()),
                    respond_all: true,
                    standard_question: "batch_create_knowledge: " + Date.parse(new Date())
                }
            }, {
                knowledge_tag: {
                    id: createdKnowledgeTag.id
                },
                knowledge: {
                    status: true,
                    create_time: Date.parse(new Date()),
                    respond_all: true,
                    standard_question: "batch_create_knowledge: " + Date.parse(new Date()) + 1
                }
            }]
        });
        expect(response).to.have.keys(["knowledge_related_items"]);
    });
    it("listKnowledgeItems（查询知识点列表） should ok", async () => {
        let response = await client.listKnowledgeItems({
            page_size: 10,
            page: 1
        });
        let knowledgeItems = response.knowledge_items;
        knowledgeId = knowledgeItems[knowledgeItems.length - 2].knowledge.id;
        expect(response).to.have.keys(["knowledge_items", "page_count"]);
    });
    it("createSimilarQuestion（创建相似问） should ok", async () => {
        let response = await client.createSimilarQuestion({
            similar_question: {
                knowledge_id: knowledgeId,
                question: "similar_question"
            }
        });
        expect(response).to.have.keys(["similar_question"]);
    });
    it("listSimilarQuestions（查询相似问列表） should ok", async () => {
        let response = await client.listSimilarQuestions({
            knowledge_id: knowledgeId,
            page: 1,
            page_size: 10
        });
        similarQuestionId = response.similar_questions[0].id;
        expect(response).to.have.keys(["similar_questions", "page_count"]);
    });
    it("updateSimilarQuestion（更新相似问） should ok", async () => {
        let response = await client.updateSimilarQuestion({
            similar_question: {
                knowledge_id: knowledgeId,
                id: similarQuestionId,
                question: "updated similar question"
            }
        });
        expect(response).to.have.keys(["similar_question"]);
    });
    it("deleteSimilarQuestion（删除相似问） should ok", async () => {
        let response = await client.deleteSimilarQuestion({
            id: similarQuestionId
        });
        expect(response).to.be.eql({});
    });
    it("updateKnowledge（更新知识点） should ok", async () => {
        let response = await client.updateKnowledge({
            knowledge: {
                status: false,
                standard_question: "updated knowledge：" + Date.parse(new Date),
                id: knowledgeId,
                respond_all: true,
                maintained_by_user_attribute_group: true
            }
        });
        expect(response).to.have.keys(["knowledge"]);
    });
    it("deleteKnowledgeTag（删除知识点分类） should ok", async () => {
        let response = await client.deleteKnowledgeTag({
            id: createdKnowledgeTag.id
        });
        expect(response).to.be.eql({});
    });
    it("createUserAttributeGroup（创建属性组） should ok", async () => {
        let response = await client.createUserAttributeGroup({
            user_attribute_group_item: {
                user_attribute_user_attribute_value: [{
                    user_attribute: {
                        id: "101520"
                    },
                    user_attribute_value: {
                        name: "sex：" + Date.parse(new Date)
                    }
                }],
                user_attribute_group: {
                    name: "随便玩:" + Date.parse(new Date)
                }
            }
        });
        expect(response).to.have.keys(["user_attribute_group_item"]);
    });
    it("listUserAttributeGroupItems（查询属性组及属性列表） should ok", async () => {
        let response = await client.listUserAttributeGroupItems({
            page: 1,
            page_size: 10
        });
        attributeGroupId = response.user_attribute_group_items[0].user_attribute_group.id;
        expect(response).to.have.keys(["user_attribute_group_items", "page_count"]);
    });
    it("updateUserAttributeGroup（更新属性组） should ok", async () => {
        let response = await client.updateUserAttributeGroup({
            user_attribute_group_item: {
                user_attribute_user_attribute_value: [{
                    user_attribute: {
                        id: "101520"
                    },
                    user_attribute_value: {
                        name: "sex: " + String(Date.parse(new Date))
                    }
                }],
                user_attribute_group: {
                    name: String(Date.parse(new Date)),
                    id: attributeGroupId
                }
            }
        });
        expect(response).to.have.keys(["user_attribute_group_item"]);
    });
    it("createUserAttributeGroupAnswer（创建属性组回复） should ok", async () => {
        let response = await client.createUserAttributeGroupAnswer({
            user_attribute_group_answer: {
                answer: {
                    knowledge_id: knowledgeId,
                    msg_body: {
                        text: {
                            content: "hello，man"
                        }
                    }
                },
                user_attribute_group_id: attributeGroupId
            }
        });
        attributeGroupAnswerId = response.user_attribute_group_answer.answer.id;
        expect(response).to.have.keys(["user_attribute_group_answer"]);
    });
    it("updateUserAttributeGroupAnswer（更新属性组回复） should ok", async () => {
        let response = await client.updateUserAttributeGroupAnswer({
            user_attribute_group_answer: {
                answer: {
                    knowledge_id: knowledgeId,
                    msg_body: {
                        text: {
                            content: "hello，man" + String(Date.parse(new Date))
                        }
                    },
                    id: attributeGroupAnswerId
                },
                user_attribute_group_id: attributeGroupId
            }
        });

        expect(response).to.have.keys(["user_attribute_group_answer"]);
    });
    it("listUserAttributeGroupAnswers（查询属性组回复列表） should ok", async () => {
        let response = await client.listUserAttributeGroupAnswers({
            page: 1,
            page_size: 10
        });
        expect(response).to.have.keys(["user_attribute_group_answers", "page_count"]);
    });
    it("deleteUserAttributeGroupAnswer（删除属性组回复） should ok", async () => {
        let response = await client.deleteUserAttributeGroupAnswer({
            id: attributeGroupAnswerId
        });
        expect(response).to.be.eql({});
    });
});
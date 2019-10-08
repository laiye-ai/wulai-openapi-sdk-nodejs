"use strict";
const WuLaiSDKClient = require("../lib/client");
const expect = require("chai").expect;
const PUBKEY = process.env.WULAI_SDK_PUBKEY;
const SECRET = process.env.WULAI_SDK_SECRET;

describe("Client Knowledge API", async () => {
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
    it("listSimilarQuestions should ok", async () => {
        let response = await client.listSimilarQuestions({
            page: 1,
            page_size: 10,
        });
        expect(response).to.have.keys(["similar_questions", "page_count"]);
    });
    it("listKnowledgeTags should ok", async () => {
        let response = await client.listKnowledgeTags({
            page: 1,
            page_size: 10,
        });
        knowledgeTagId = response.knowledge_tags[0].id;
        expect(response).to.have.keys(["knowledge_tags", "page_count"]);
    });
    it("createKnowledgeTagKnowledge should ok", async () => {
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
    it("listKnowledgeTags should ok", async () => {
        let response = await client.listKnowledgeTags({
            page: 1,
            page_size: 10
        });
        knowledgeTagId = response.knowledge_tags[0].id;
        expect(response).to.have.keys(["knowledge_tags", "page_count"]);
    });
    it("listKnowledgeItems should ok", async () => {
        let response = await client.listKnowledgeItems({
            page_size: 10,
            page: 1,

        });
        let knowledgeItems = response.knowledge_items;
        knowledgeId = knowledgeItems[knowledgeItems.length - 2].knowledge.id;
        expect(response).to.have.keys(["knowledge_items", "page_count"]);
    });
    it("createSimilarQuestion should ok", async () => {
        let response = await client.createSimilarQuestion({
            similar_question: {
                knowledge_id: knowledgeId,
                question: "这是一个相似问题"
            }
        });
        expect(response).to.have.keys(["similar_question"]);
    });
    it("listSimilarQuestions should ok", async () => {
        let response = await client.listSimilarQuestions({
            knowledge_id: knowledgeId,
            page: 1,
            page_size: 10
        });
        similarQuestionId = response.similar_questions[0].id;
        expect(response).to.have.keys(["similar_questions", "page_count"]);
    });
    it("updateSimilarQuestion should ok", async () => {
        let response = await client.updateSimilarQuestion({
            similar_question: {
                knowledge_id: knowledgeId,
                id: similarQuestionId,
                question: "这是更新后的相似问"
            }
        });
        expect(response).to.have.keys(["similar_question"]);
    });
    it("deleteSimilarQuestion should ok", async () => {
        let response = await client.deleteSimilarQuestion({
            id: similarQuestionId
        });
        expect(response).to.be.eql({});
    });
    it("updateKnowledge should ok", async () => {
        let response = await client.updateKnowledge({
            knowledge: {
                status: false,
                standard_question: "这是一个更新后的知识点：" + Date.parse(new Date),
                id: knowledgeId,
                respond_all: true,
                maintained_by_user_attribute_group: true
            }
        });
        expect(response).to.have.keys(["knowledge"]);
    });
    it("createUserAttributeGroup should ok", async () => {
        let response = await client.createUserAttributeGroup({
            user_attribute_group_item: {
                user_attribute_user_attribute_value: [{
                    user_attribute: {
                        id: "101520"
                    },
                    user_attribute_value: {
                        name: "sex" + Date.parse(new Date)
                    }
                }],
                user_attribute_group: {
                    name: "随便玩" + Date.parse(new Date)
                }
            }
        });
        expect(response).to.have.keys(["user_attribute_group_item"]);
    });
    it("listUserAttributeGroupItems should ok", async () => {
        let response = await client.listUserAttributeGroupItems({
            page: 1,
            page_size: 10
        });
        attributeGroupId = response.user_attribute_group_items[0].user_attribute_group.id;
        expect(response).to.have.keys(["user_attribute_group_items", "page_count"]);
    });
    it("updateUserAttributeGroup should ok", async () => {
        let response = await client.updateUserAttributeGroup({
            user_attribute_group_item: {
                user_attribute_user_attribute_value: [{
                    user_attribute: {
                        id: "101520"
                    },
                    user_attribute_value: {
                        name: String(Date.parse(new Date))
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
    it("createUserAttributeGroupAnswer should ok", async () => {
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
    it("updateUserAttributeGroupAnswer should ok", async () => {
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
    it("listUserAttributeGroupAnswers should ok", async () => {
        let response = await client.listUserAttributeGroupAnswers({
            page: 1,
            page_size: 10
        });
        expect(response).to.have.keys(["user_attribute_group_answers", "page_count"]);
    });
    it("deleteUserAttributeGroupAnswer should ok", async () => {
        let response = await client.deleteUserAttributeGroupAnswer({
            id: attributeGroupAnswerId
        });
        expect(response).to.be.eql({});
    });
});
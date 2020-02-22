"use strict";
const expect = require("chai").expect;
const WuLaiSDKClient = require("../lib/client");
const PUBKEY = process.env.WULAI_SDK_PUBKEY;
const SECRET = process.env.WULAI_SDK_SECRET;

describe("词库管理类 API Test", async () => {
    let client = new WuLaiSDKClient({
        endpoint: "https://openapi.wul.ai",
        pubkey: PUBKEY,
        secret: SECRET,
        apiVersion: "v2"
    });
    
    let createdTerm = null;
    it("createTerm（创建专有词汇） should ok", async () => {
        let response = await client.createTerm({
            term_item: {
                term: {
                    name: "term"
                }
            }
        });
        createdTerm = response;
        expect(response).to.have.keys(["term_item"]);
    });
    it("listTerm（查询专有词汇列表） should ok", async () => {
        let response = await client.listTerm({
            page: 1,
            page_size: 20
        });
        expect(response).to.have.keys(["term_item", "page_count"]);
    });
    it("updateTerm（更新专有词汇） should ok", async () => {
        createdTerm.term_item.term.name = "term_updated";
        createdTerm.term_item.synonyms = ["term1"];
        let response = await client.updateTerm(createdTerm);
        expect(response).to.have.keys(["term_item"]);
    });
    it("deleteTerm（删除专有词汇） should ok", async () => {
        let response = await client.deleteTerm({
            id: createdTerm.term_item.term.id
        });
        expect(response).to.be.eql({});
    });
    it("listEntities（查询全部实体概要） should ok", async () => {
        let response = await client.listEntities({
            page: 1,
            page_size: 100
        });
        expect(response).to.have.keys(["entities"]);
    });
    let createdEntity = null;
    const now = Date.parse(new Date);
    it("createIntentEntity（创建意图实体） should ok", async () => {
        let response = await client.createIntentEntity({
            intent_entity: {
                standard_value: "who are you",
                name: "custom intity:" + now
            }
        });
        createdEntity = response.intent_entity;
        expect(response).to.have.keys(["intent_entity"]);
    });
    it("createIntentEntityValue（创建意图实体值相似说法） should ok", async () => {
        let response = await client.createIntentEntityValue({
            entity_id: createdEntity.id,
            synonyms: ["添加相似说法"]
        });
        expect(response).to.have.keys(["intent_entity"]);
    });
    it("getEntity（查询一个实体详情） should ok", async () => {
        let response = await client.getEntity({
            id: createdEntity.id
        });
        expect(response).to.have.keys(["entity"]);
    });
    it("deleteIntentEntityValue（删除意图实体值相似说法）should ok", async () => {
        let response = await client.deleteIntentEntityValue({
            entity_id: createdEntity.id,
            synonyms: ["添加相似说法"]
        });
        expect(response).to.be.eql({});
    });
    it("deleteEntity（删除意图实体） should ok", async () => {
        let response = await client.deleteEntity({
            id: createdEntity.id,
        });
        expect(response).to.be.eql({});
    });
    
    let createdEnumEntity = null;
    it("createEnumerationEntity（创建枚举实体） should ok", async () => {
        let response = await client.createEnumerationEntity({
            enum_entity: {
                name: "enum_entity: " + Date.parse(new Date())
            }
        });
        createdEnumEntity = response.enum_entity;
        expect(response).to.have.keys(["enum_entity"]);
    });
    it("createEnumerationEntityValue（创建枚举实体值） should ok", async () => {
        let response = await client.createEnumerationEntityValue({
            entity_id: createdEnumEntity.id,
            value: {
                synonyms: ["111"],
                standard_value: "1111111"
            }
        });
        expect(response).to.have.keys(["enum_entity"]);
    });
    it("deleteEnumerationEntityValue（删除枚举实体值） should ok", async () => {
        let response = await client.deleteEnumerationEntityValue({
            entity_id: createdEnumEntity.id,
            value: {
                standard_value: "1111111"
            }
        });
        expect(response).to.be.eql({});
    });
    it("deleteEntity（删除枚举实体） should ok", async () => {
        let response = await client.deleteEntity({
            id: createdEnumEntity.id,
        });
        expect(response).to.be.eql({});
    });
    
});
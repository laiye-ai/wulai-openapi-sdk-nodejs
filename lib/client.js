"use strict";

const cmReq = require("./cmReq");
class Client {
  constructor(config) {
    this.endpoint = config.endpoint;
    this.pubkey = config.pubkey;
    this.secret = config.secret;
    this.apiVersion = config.apiVersion;
  }
  userCreate(data) {
    return cmReq({
      action: "userCreate",
      pubkey: this.pubkey,
      secret: this.secret,
      apiVersion: this.apiVersion,
      data: data
    });
  }
  userAttributeCreate(data) {
    return cmReq({
      action: "userAttributeCreate",
      endpoint: this.endpoint,
      pubkey: this.pubkey,
      secret: this.secret,
      apiVersion: this.apiVersion,
      data: data
    });
  }
  userAttributeList(data) {
    return cmReq({
      action: "userAttributeList",
      endpoint: this.endpoint,
      pubkey: this.pubkey,
      secret: this.secret,
      apiVersion: this.apiVersion,
      data: data
    });
  }
  getHistoryRecord(data) {
    return cmReq({
      action: "getHistoryRecord",
      endpoint: this.endpoint,
      pubkey: this.pubkey,
      secret: this.secret,
      apiVersion: this.apiVersion,
      data: data
    });
  }
  getBotResponse(data) {
    return cmReq({
      action: "getBotResponse",
      endpoint: this.endpoint,
      pubkey: this.pubkey,
      secret: this.secret,
      apiVersion: this.apiVersion,
      data: data
    });
  }
  getKeywordBotResponse(data) {
    return cmReq({
      action: "getKeywordBotResponse",
      endpoint: this.endpoint,
      pubkey: this.pubkey,
      secret: this.secret,
      apiVersion: this.apiVersion,
      data: data
    });
  }
  getTaskBotResponse(data) {
    return cmReq({
      action: "getTaskBotResponse",
      endpoint: this.endpoint,
      pubkey: this.pubkey,
      secret: this.secret,
      apiVersion: this.apiVersion,
      data: data
    });
  }
  getQABotResponse(data) {
    return cmReq({
      action: "getQABotResponse",
      endpoint: this.endpoint,
      pubkey: this.pubkey,
      secret: this.secret,
      apiVersion: this.apiVersion,
      data: data
    });
  }
}

module.exports = Client;

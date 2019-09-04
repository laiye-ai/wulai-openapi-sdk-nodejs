"use strict";

const actions_map = {
  userCreate: {
    method: "POST",
    url: "/user/create"
  },
  userAttributeCreate: {
    method: "POST",
    url: "/user/user-attribute/create"
  },
  userAttributeList: {
    method: "POST",
    url: "/user-attribute/list"
  },
  receiveUserMessage: {
    method: "POST",
    url: "/msg/receive"
  },
  syncUserMessage: {
    method: "POST",
    url: "/msg/sync"
  },
  getHistoryRecord: {
    method: "POST",
    url: "/msg/history"
  },
  getBotResponse: {
    method: "POST",
    url: "/msg/bot-response"
  },
  getKeywordBotResponse: {
    method: "POST",
    url: "/msg/bot-response/keyword"
  },
  getTaskBotResponse: {
    method: "POST",
    url: "/msg/bot-response/task"
  },
  getQABotResponse: {
    method: "POST",
    url: "/msg/bot-response/qa"
  }
};

module.exports = actions_map;

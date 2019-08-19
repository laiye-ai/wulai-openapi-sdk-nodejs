"use strict";

const actions_map = {
  // user: 创建用户
  userCreate: {
    method: "POST",
    url: "/user/create"
  },
  // user: 添加或修改用户属性
  userAttributeCreate: {
    method: "POST",
    url: "/user/user-attribute/create"
  },
  // user: 获取用户属性列表
  userAttributeList: {
    method: "POST",
    url: "/user-attribute/list"
  },
  // talk: 查询历史消息
  getHistoryRecord: {
    method: "POST",
    url: "/msg/history"
  },
  // talk: 获取机器人回复
  getBotResponse: {
    method: "POST",
    url: "/msg/bot-response"
  },
  // talk: 获取关键字机器人回复
  getKeywordBotResponse: {
    method: "POST",
    url: "/msg/bot-response/keyword"
  },
  // talk: 获取任务机器人回复
  getTaskBotResponse: {
    method: "POST",
    url: "/msg/bot-response/task"
  },
  // talk: 获取问答机器人回复
  getQABotResponse: {
    method: "POST",
    url: "/msg/bot-response/qa"
  }
};

module.exports = actions_map;

"use strict";
const assert = require("assert");
const CryptoJS = require("crypto-js");
const Http = require("./http");
const actionsMap = require("./actions_map");
const exception = require("./exception");

const apiVersions = ["v1", "v2"];

/**
 * 获取随机字符串
 */
function getRandomString(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
/**
 * 创建认证header对象
 */
function makeAuthHeaders(pubkey, secret) {
  let headers = {};
  const timestamp = Math.round(new Date().getTime() / 1000);
  const nonce = getRandomString(32);
  const sign = CryptoJS.SHA1(nonce + timestamp + secret, "").toString(
    CryptoJS.enc.Hex
  );
  headers = {
    "Api-Auth-pubkey": pubkey,
    "Api-Auth-nonce": nonce,
    "Api-Auth-timestamp": timestamp,
    "Api-Auth-sign": sign
  };
  return headers;
}
class Client {
  constructor(config) {
    this.endpoint = config.endpoint || "https://openapi.wul.ai";
    this.pubkey = config.pubkey;
    this.secret = config.secret;
    this.apiVersion = "v2" || config.apiVersion;
    assert(config.pubkey, exception.infoMap.SDK_INVALID_CREDENTIAL);
    assert(config.secret, exception.infoMap.SDK_INVALID_CREDENTIAL);
    if (
      config.endpoint &&
      !config.endpoint.startsWith("https://") &&
      !config.endpoint.startsWith("http://")
    ) {
      throw exception.clientException(
        exception.infoMap.SDK_ENDPOINT_RESOLVING_ERROR
      );
    }
    if (config.apiVersion && !apiVersions.includes(config.apiVersion)) {
      throw exception.clientException(
        exception.infoMap.SDK_INVALID_API_VERSION
      );
    }
    this.__http = new Http({
      endpoint: this.endpoint
    });
  }
  /**
   * 创建用户
   * @param {Object} data post body
   */
  userCreate(data) {
    return this.request("userCreate", data);
  }
  /**
   * 给用户添加属性值
   * @param {Object} data post body
   */
  userAttributeCreate(data) {
    return this.request("userAttributeCreate", data);
  }
  /**
   * 获取用户数户型列表
   * @param {Object} data post body
   */
  userAttributeList(data) {
    return this.request("userAttributeList", data);
  }
  /**
   * 查询历史消息
   * @param {Object} data post body
   */
  getHistoryRecord(data) {
    return this.request("getHistoryRecord", data);
  }
  /**
   * 获取机器人回复
   * @param {Object} data post body
   */
  getBotResponse(data) {
    return this.request("getBotResponse", data);
  }
  /**
   * 获取关键机器人回复
   * @param {Object} data post body
   */
  getKeywordBotResponse(data) {
    return this.request("getKeywordBotResponse", data);
  }
  /**
   * 获取任务机器人回复
   * @param {Object} data post body
   */
  getTaskBotResponse(data) {
    return this.request("getTaskBotResponse", data);
  }
  /**
   * 获取问答机器人回复
   * @param {Object} data post body
   */
  getQABotResponse(data) {
    return this.request("getQABotResponse", data);
  }
  /**
   * common request method
   * @param {String} action request action string
   * @param {Object} body request body
   * @param {Object} reqOpts request options
   */
  request(action, body, reqOpts) {
    assert(action, exception.infoMap.SDK_NOT_SUPPORT);
    assert(actionsMap[action], exception.infoMap.SDK_NOT_SUPPORT);

    const apiVersion = this.apiVersion;
    const actionData = actionsMap[action];
    const headers = makeAuthHeaders(this.pubkey, this.secret);
    const url = `/${apiVersion}${actionData.url}`;
    const postBody = JSON.stringify(body) || "";

    return this.__http.request(actionData.method, url, {}, postBody, headers);
  }
}

module.exports = Client;

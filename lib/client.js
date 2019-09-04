"use strict";
const assert = require("assert");
const CryptoJS = require("crypto-js");
const Http = require("./http");
const actionsMap = require("./actions_map");
const createLogger = require("./logger");
const exception = require("./exception");
const apiVersions = ["v1", "v2"];

const {
  clientException,
  serverException,
  errorMap,
  statusMap,
  throwException
} = exception;

function errorMsg(status, errCode, errMsg) {
  return `status: ${status}, code: ${errCode}, message: ${errMsg}`;
}

function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
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
function defaultHeaders() {
  const headers = {
    accept: "application/json",
    "content-type": "application/json"
  };
  return headers;
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
    assert(config, errorMap.SDK_INVALID_CREDENTIAL);
    assert(config.pubkey, errorMap.SDK_INVALID_CREDENTIAL);
    assert(config.secret, errorMap.SDK_INVALID_CREDENTIAL);

    this.endpoint = config.endpoint || "https://openapi.wul.ai";
    this.pubkey = config.pubkey;
    this.secret = config.secret;
    this.apiVersion = "v2" || config.apiVersion;
    if (
      config.endpoint &&
      !config.endpoint.startsWith("https://") &&
      !config.endpoint.startsWith("http://")
    ) {
      throw clientException("", errorMap.SDK_ENDPOINT_RESOLVING_ERROR);
    }
    if (config.apiVersion && !apiVersions.includes(config.apiVersion)) {
      throw clientException("", errorMap.SDK_INVALID_API_VERSION);
    }
    if (config.options && !isPlainObject(config.options)) {
      throw clientException("", errorMap.SDK_INVALID_HTTP_OPTIONS);
    }
    this.httpOptions = config.options || {};
    this.__logger = createLogger(config.logOpts);
    this.__http = new Http({
      endpoint: this.endpoint
    });
  }
  /**
   * 创建用户
   */
  userCreate(data, options) {
    return this.request("userCreate", data, null, options);
  }
  /**
   * 给用户添加属性值
   */
  userAttributeCreate(data, options) {
    return this.request("userAttributeCreate", data, null, options);
  }
  /**
   * 获取用户属性列表
   */
  userAttributeList(data, options) {
    return this.request("userAttributeList", data, null, options);
  }
  /**
   * 查询历史消息
   */
  getHistoryRecord(data, options) {
    return this.request("getHistoryRecord", data, null, options);
  }
  /**
   * 获取机器人回复
   */
  getBotResponse(data, options) {
    return this.request("getBotResponse", data, null, options);
  }
  /**
   * 获取关键字机器人回复
   */
  getKeywordBotResponse(data, options) {
    return this.request("getKeywordBotResponse", data, null, options);
  }
  /**
   * 获取任务机器人回复
   */
  getTaskBotResponse(data, options) {
    return this.request("getTaskBotResponse", data, null, options);
  }
  /**
   * 获取问答机器人回复
   */
  getQABotResponse(data, options) {
    return this.request("getQABotResponse", data, null, options);
  }
  /**
   * 接收用户发的消息
   */
  receiveUserMessage(data, options) {
    return this.request("receiveUserMessage", data, null, options);
  }
  /**
   * 同步发给用户的消息
   */
  syncUserMessage(data, options) {
    return this.request("syncUserMessage", data, null, options);
  }
  /**
   * common request method
   */
  async request(action, body, query, options = {}) {
    assert(action, errorMap.SDK_NOT_SUPPORT);
    assert(actionsMap[action], errorMap.SDK_NOT_SUPPORT);
    if (!isPlainObject(options)) {
      throw clientException("", errorMap.SDK_INVALID_HTTP_OPTIONS);
    }
    const apiVersion = this.apiVersion;
    action = actionsMap[action];
    const authHeaders = makeAuthHeaders(this.pubkey, this.secret);
    // headers
    const headers = Object.assign(
      defaultHeaders(),
      authHeaders,
      options.headers || {}
    );
    // method
    const method = action.method;
    // url
    let url = `${this.endpoint}/${apiVersion}${action.url}`;
    // body
    body = JSON.stringify(body) || "";
    const requestInfo = `Send Request-Action: ${action.url}, Request-Method: ${method}, Request-AuthHeaders: ${JSON.stringify(authHeaders)}, Request-Body: ${body}}`;
    this.__logger.info(requestInfo);
    if (body) {
      body = Buffer.from(body, "utf8");
      headers["content-length"] = body.length;
    }
    // options
    options = Object.assign(this.httpOptions, options);
    const response = await this.autoRetryRequest(method, url, query, body, headers, options, action);
    return response;
  }
  /**
   * 请求重试
   */
  async autoRetryRequest(method, url, query, body, headers, options, action) {
    const maxRetry = options.maxRetry || 3;
    let tryTimes = 0;
    const self = this;
    async function retry() {
      let resBody = "";
      let response = {};
      let resJson = {};
      try {
        tryTimes++;
        response = await self.__http.request(method, url, query, body, headers, options);
      } catch (error) {
        throw throwException(error.name, error.message);
      }
      // 处理JSON解析
      try {
        resJson = JSON.parse(response.body);
      } catch (error) {
        // 解析异常
        if (tryTimes === maxRetry) {
          self.__logger.error(`✘ Response Body Json Parse Error => Request-Action [${action.url}] Response-Body ${response.body}`);
          throw serverException(
            "Server Error",
            errorMap.SDK_RESPONSE_JSON_FORMAT_ERROR,
            {
              body: resBody,
              info: error.message
            }
          );
        }
        self.__logger.info(`Retry ${tryTimes} Time => Request-Action [${action.url}]`);
        // 解析异常，可能是服务器丢包，触发重试
        return await retry();
      }
      let status = response.status;
      let errCode = resJson.code;
      let errMsg = resJson.error;
      let errorInfo = errorMsg(status, errCode, errMsg);
      // 服务器错误
      if (status >= 500) {
        if (tryTimes === maxRetry) {
          const statusMsg = statusMap[status];
          self.__logger.error(`✘ Server Error With Request-Action [${action.url}] => ${statusMsg} [${errorInfo}]`);
          throw serverException(statusMsg, errorInfo);
        }
        // 服务器错误，触发重试
        self.__logger.info(`Retry Server Error ${tryTimes} Time => Request-Action [${action.url}]`);
        return await retry();
      }
      // 客户端错误
      if (status >= 400 && status < 500) {
        const statusMsg = statusMap[status];
        self.__logger.error(`✘ Client Error With Request-Action [${action.url}] => ${statusMsg} [${errorInfo}], Request-Headers: ${JSON.stringify(headers)}, Request-Body: ${body}`);
        throw clientException(statusMsg, errorInfo);
      }
      self.__logger.info(`✔ Request Succeed With Request-Action [${action.url}], Response-Body ${response.body}`);
      return resJson;
    }
    return await retry();
  }
}

module.exports = Client;

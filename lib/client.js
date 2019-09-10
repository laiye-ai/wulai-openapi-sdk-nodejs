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

let logger = null;

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
/**
 * 默认请求头
 */
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
  /**
   * Creates an instance of Client.
   * @param
   * {
   *  endpoint: string;
   *  apiVersion: "v2";
   *  pubkey: string;
   *  secret: string;
   *  options: HttpOpts;
   *  debug: boolean
   * } config
   * @memberof Client
   */
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
    if (config.debug !== undefined) {
      logger = createLogger(config.debug);
    }
    this.__http = new Http({
      endpoint: this.endpoint
    });
  }
  /**
   * 配置日志
   */
  static LoggerConfig(debug, config) {
    logger = createLogger(debug, config);
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
    // action
    action = actionsMap[action];
    const authHeaders = makeAuthHeaders(this.pubkey, this.secret);
    // headers
    const headers = Object.assign(
      defaultHeaders(),
      authHeaders,
      options.headers || {}
    );
    // body
    body = JSON.stringify(body) || "";
    logger.info(
      `Send Request-Action: ${action.url}, Request-Method: ${
        action.method
      }, Request-AuthHeaders: ${JSON.stringify(
        authHeaders
      )}, Request-Body: ${body}}`
    );
    if (body) {
      body = Buffer.from(body, "utf8");
      headers["content-length"] = body.length;
    }
    // options
    options = Object.assign(this.httpOptions, options);
    let reqOptions = {};
    options.headers && (reqOptions.headers = options.headers);
    options.timeout && (reqOptions.timeout = options.timeout);
    options.agent && (reqOptions.agent = options.agent);
    options.beforeRequest && (reqOptions.beforeRequest = options.beforeRequest);
    const response = await this.autoRetryRequest(
      action,
      query,
      body,
      headers,
      reqOptions,
      options.maxRetry
    );
    const { statusCode } = response;
    // 请求成功
    if (statusCode === 200) {
      logger.info(
        `✔ Request Succeed With Request-Action: ${
          action.url
        }, Response-Body ${JSON.stringify(response.body)}`
      );
      return response.body;
    }
    let errorInfo = errorMsg(
      statusCode,
      response.body.code,
      response.body.error
    );
    // 客户端异常
    if (statusCode >= 400 && statusCode < 500) {
      const statusMsg = statusMap[statusCode];
      logger.error(
        `✘ Client Error With Request-Action [${
          action.url
        }] => ${statusMsg} [${errorInfo}], Request-Headers: ${JSON.stringify(
          authHeaders
        )}, Request-Body: ${body}`
      );
      throw clientException(statusMsg, errorInfo);
    }
    // 服务端异常
    if (statusCode >= 500) {
      const statusMsg = statusMap[statusCode];
      logger.error(
        `✘ Server Error With Request-Action: ${action.url} => ${statusMsg} [${errorInfo}]`
      );
      throw serverException(statusMsg, errorInfo);
    }
  }
  /**
   * 请求重试
   */
  async autoRetryRequest(action, query, body, headers, options, maxRetry = 3) {
    let tryTimes = 0;
    let self = this;
    let url = `/${this.apiVersion}${action.url}`;
    let method = action.method;
    async function retry() {
      let resBody = "";
      let response = {};
      let resJson = {};
      try {
        tryTimes++;
        response = await self.__http.request(
          method,
          url,
          query,
          body,
          headers,
          options
        );
      } catch (error) {
        throw throwException(error.name, error.message);
      }
      // 处理JSON解析
      try {
        resJson = JSON.parse(response.body);
      } catch (error) {
        // JSON解析异常
        if (tryTimes <= maxRetry) {
          logger.info(
            `Retry Response JSON Format Error ${tryTimes} Time => Request-Action: ${
              action.url
            }, Request-Header: ${JSON.stringify(
              headers
            )}, Request-Body: ${body}`
          );
          // 解析异常，可能是服务器丢包，触发重试
          return await retry();
        }
        logger.error(
          `✘ Response JSON Format Error => Request-Action: ${action.url}, Response-Body: ${response.body}`
        );
        throw serverException(
          "Server Error",
          errorMap.SDK_RESPONSE_JSON_FORMAT_ERROR,
          {
            body: resBody,
            info: error.message
          }
        );
      }
      // 服务器错误，触发重试
      if (response.status >= 500 && tryTimes <= maxRetry) {
        logger.info(
          `Retry Server Error ${tryTimes} Time => Request-Action: ${
            action.url
          }, Request-Header: ${JSON.stringify(headers)}, Request-Body: ${body}`
        );
        return await retry();
      }
      return {
        statusCode: response.status,
        body: resJson
      };
    }
    return await retry();
  }
}

module.exports = Client;

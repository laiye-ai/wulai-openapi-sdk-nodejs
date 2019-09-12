"use strict";
const assert = require("assert");
const CryptoJS = require("crypto-js");
const qs = require("querystring");
const Http = require("./http");
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
// 默认超时时间
const DefaultTimeout = 6000;
// 默认请求重试次数
const DefaultRetryTimes = 3;

let logger = createLogger(false);

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

function logRetryInfo(name, tryTimes, json) {
    const headerStr = JSON.stringify(json.headers);
    logger.info(`Retry ${name} ${tryTimes} Time => Url: ${json.url}, Header: ${headerStr}, Data: ${json.data}`);
}
function logRequestError(name, json) {
    const headerStr = JSON.stringify(json.headers);
    logger.error(`${name} => Url: ${json.url}, Header: ${headerStr}, Data: ${json.data}, Response: ${json.response}`);
}

class Client {
    constructor(config) {
        assert(config, errorMap.SDK_INVALID_CREDENTIAL);
        assert(config.pubkey, errorMap.SDK_INVALID_CREDENTIAL);
        assert(config.secret, errorMap.SDK_INVALID_CREDENTIAL);

        this.endpoint = config.endpoint || "https://openapi.wul.ai";
        this.pubkey = config.pubkey;
        this.secret = config.secret;
        this.apiVersion = config.apiVersion || "v2";
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
        this.request = this.request.bind(this);
    }
    static LogConfig(debug, config) {
        logger = createLogger(debug, config);
    }
    /**
     * 创建用户
     */
    createUser(data, options) {
        const url = `/${this.apiVersion}/user/create`;
        return this.request("POST", url, null, data, options);
    }
    /**
     * 给用户添加属性值
     */
    createUserAttribute(data, options) {
        const url = `/${this.apiVersion}/user/user-attribute/create`;
        return this.request("POST", url, null, data, options);
    }
    /**
     * 获取用户属性列表
     */
    listUserAttribute(data, options) {
        const url = `/${this.apiVersion}/user-attribute/list`;
        return this.request("POST", url, null, data, options);
    }
    /**
     * 查询历史消息
     */
    getMsgHistory(data, options) {
        const url = `/${this.apiVersion}/msg/history`;
        return this.request("POST", url, null, data, options);
    }
    /**
     * 获取机器人回复
     */
    getBotResponse(data, options) {
        const url = `/${this.apiVersion}/msg/bot-response`;
        return this.request("POST", url, null, data, options);
    }
    /**
     * 获取关键字机器人回复
     */
    getKeywordResponse(data, options) {
        const url = `/${this.apiVersion}/msg/bot-response/keyword`;
        return this.request("POST", url, null, data, options);
    }
    /**
     * 获取任务机器人回复
     */
    getTaskResponse(data, options) {
        const url = `/${this.apiVersion}/msg/bot-response/task`;
        return this.request("POST", url, null, data, options);
    }
    /**
     * 获取问答机器人回复
     */
    getQaResponse(data, options) {
        const url = `/${this.apiVersion}/msg/bot-response/qa`;
        return this.request("POST", url, null, data, options);
    }
    /**
     * 接收用户发的消息
     */
    receiveMessage(data, options) {
        const url = `/${this.apiVersion}/msg/receive`;
        return this.request("POST", url, null, data, options);
    }
    /**
     * 同步发给用户的消息
     */
    syncMessage(data, options) {
        const url = `/${this.apiVersion}/msg/sync`;
        return this.request("POST", url, null, data, options);
    }
    /**
     * CommonRequest
     */
    async request(method, url, query, data, options = {}) {

        if (!isPlainObject(options)) {
            throw clientException("Options Type Error", errorMap.SDK_INVALID_HTTP_OPTIONS);
        }
        // 鉴权请求头
        const authHeaders = makeAuthHeaders(this.pubkey, this.secret);
        const headers = Object.assign(
            defaultHeaders(),
            authHeaders,
            options.headers || {}
        );
        if (query && Object.keys(query).length) {
            url += `?${qs.stringify(query)}`;
        }
        // 请求体
        data = data ? JSON.stringify(data) : "";
        logger.info(`Request received. Path: ${url}, Endpoint: ${this.endpoint}. Method: ${method}, Headers: ${JSON.stringify(authHeaders)}, Data: ${data}}`);
        data = Buffer.from(data, "utf8");
        headers["content-length"] = data.length;

        options = Object.assign(this.httpOptions, options);
        // 聚合有效请求配置项
        const httpOptions = {
            timeout: options.timeout || DefaultTimeout,
            agent: options.agent || this.__http.keepAliveAgent,
            headers: headers,
            compression: options.compression === undefined ? false : options.compression
        };
        options.beforeRequest && (httpOptions.beforeRequest = options.beforeRequest);
        // 默认重试次数
        const maxRetry = options.maxRetry || DefaultRetryTimes;
        return await this.autoRetryRequest(
            method,
            url,
            data,
            httpOptions,
            maxRetry
        );
    }
    /**
     * 请求重试，兼异常处理
     */
    async autoRetryRequest(
        method,
        url,
        data,
        options,
        maxRetry
    ) {
        let tryTimes = 0;
        let self = this;
        async function retry() {
            let response = {};
            let resJson = {};
            const headers = options.headers;
            try {
                tryTimes++;
                response = await self.__http.request(method, url, data, options);
            } catch (error) {
                // 网络请求异常，重试
                if (tryTimes <= maxRetry) {
                    logRetryInfo(error.name, tryTimes, { url, headers, data });
                    return await retry();
                }
                logRequestError(`Request Timeout Error`, { url, headers, data, response: "" });
                throw throwException(error.name, error.message);
            }
            const statusCode = response.status;

            if (statusCode === 200) { // 请求成功
                try {
                    resJson = JSON.parse(response.body);
                    return resJson;
                } catch (error) {
                    // JSON解析失败，重试
                    if (tryTimes <= maxRetry) {
                        logRetryInfo("Response JSON Format Error", tryTimes, { url, headers, data });
                        return await retry();
                    }
                    // 重试结束，抛出异常
                    logRequestError("✘ Response JSON Format Error", { url, headers, data, response: response.body });
                    throw serverException("Server Error", errorMap.SDK_RESPONSE_JSON_FORMAT_ERROR);
                }

            } else if (statusCode >= 400 && statusCode < 500) { // 客户端错误
                // 客户端错误，直接抛出异常
                const statusMsg = statusMap[statusCode];
                logRequestError(`✘ Client Error(${statusCode}) ${statusMsg}`, { url, headers, data, response: response.body });
                throw clientException(statusMsg, `status: ${statusCode}, body: ${response.body}`);

            } else if (statusCode >= 500) { // 服务端错误
                // 服务端错误，重试
                if (tryTimes <= maxRetry) {
                    logRetryInfo(`Server Error(${statusCode})`, tryTimes, { url, headers, data });
                    return await retry();
                }
                // 重试结束，抛出异常
                const statusMsg = statusMap[statusCode];
                logRequestError(`✘ Server Error(${statusCode}) ${statusMsg}`, { url, headers, data, response: response.body });
                throw serverException(statusMsg, `status: ${statusCode}, body: ${response.body}`);
            } else {
                logRequestError(`✘ Unknown Server Error(${statusCode})`, { url, headers, data, response: response.body });
                throw serverException("Unknown Server Error", `Status: ${statusCode}, Url: ${url}, Data: ${data}`);
            }
        }
        return await retry();
    }
}

module.exports = Client;

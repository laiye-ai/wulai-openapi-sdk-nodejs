"use strict";
const assert = require("assert");
const CryptoJS = require("crypto-js");
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

let logger = null;

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
     * @param {Object} config
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
        logger = createLogger(config.debug);
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
    userCreate(params, options) {
        const url = `/${this.apiVersion}/user/create`;
        return this.request("POST", url, null, params, options);
    }
    /**
     * 给用户添加属性值
     */
    userAttributeCreate(params, options) {
        const url = `/${this.apiVersion}/user/user-attribute/create`;
        return this.request("POST", url, null, params, options);
    }
    /**
     * 获取用户属性列表
     */
    userAttributeList(params, options) {
        const url = `/${this.apiVersion}/user-attribute/list`;
        return this.request("POST", url, null, params, options);
    }
    /**
     * 查询历史消息
     */
    getHistoryRecord(params, options) {
        const url = `/${this.apiVersion}/msg/history`;
        return this.request("POST", url, null, params, options);
    }
    /**
     * 获取机器人回复
     */
    getBotResponse(params, options) {
        const url = `/${this.apiVersion}/msg/bot-response`;
        return this.request("POST", url, null, params, options);
    }
    /**
     * 获取关键字机器人回复
     */
    getKeywordBotResponse(params, options) {
        const url = `/${this.apiVersion}/msg/bot-response/keyword`;
        return this.request("POST", url, null, params, options);
    }
    /**
     * 获取任务机器人回复
     */
    getTaskBotResponse(params, options) {
        const url = `/${this.apiVersion}/msg/bot-response/task`;
        return this.request("POST", url, null, params, options);
    }
    /**
     * 获取问答机器人回复
     */
    getQABotResponse(params, options) {
        const url = `/${this.apiVersion}/msg/bot-response/qa`;
        return this.request("POST", url, null, params, options);
    }
    /**
     * 接收用户发的消息
     */
    receiveUserMessage(params, options) {
        const url = `/${this.apiVersion}/msg/receive`;
        return this.request("POST", url, null, params, options);
    }
    /**
     * 同步发给用户的消息
     */
    syncUserMessage(params, options) {
        const url = `/${this.apiVersion}/msg/sync`;
        return this.request("POST", url, null, params, options);
    }
    /**
     * CommonRequest
     */
    async request(method, url, query, body, options = {}) {

        if (!isPlainObject(options)) {
            throw clientException("", errorMap.SDK_INVALID_HTTP_OPTIONS);
        }

        const authHeaders = makeAuthHeaders(this.pubkey, this.secret);
        const headers = Object.assign(
            defaultHeaders(),
            authHeaders,
            options.headers || {}
        );

        body = JSON.stringify(body) || "";
        logger.info(
            `Send Request-Action: ${url}, Request-Method: ${method}, Request-AuthHeaders: ${JSON.stringify(
                authHeaders
            )}, Request-Body: ${body}}`
        );
        if (body) {
            body = Buffer.from(body, "utf8");
            headers["content-length"] = body.length;
        }

        options = Object.assign(this.httpOptions, options);

        const httpOptions = {
            timeout: options.timeout || 6000,
            agent: options.agent || this.__http.keepAliveAgent,
            headers: headers,
            compression: options.compression === undefined ? false : options.compression
        };
        const maxRetry = options.maxRetry || 3;
        return await this.autoRetryRequest(
            method,
            url,
            query,
            body,
            httpOptions,
            maxRetry
        );
    }
    /**
     * 请求重试
     */
    async autoRetryRequest(
        method,
        url,
        query,
        body,
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
                response = await self.__http.request(
                    method,
                    url,
                    query,
                    body,
                    options
                );
            } catch (error) {
                // 网络请求异常，重试
                if (tryTimes <= maxRetry) {
                    logger.info(
                        `Retry ${error.name} ${tryTimes} Time => Request-Action: ${url}, Request-Header: ${JSON.stringify(
                            headers
                        )}, Request-Body: ${body}`
                    );

                    return await retry();
                }
                throw throwException(error.name, error.message);
            }
            const statusCode = response.status;
            // 请求成功
            if (statusCode === 200) {
                try {
                    resJson = JSON.parse(response.body);
                    return resJson;
                } catch (error) {
                    // JSON解析异常，重试
                    if (tryTimes <= maxRetry) {
                        logger.info(
                            `Retry Response JSON Format Error ${tryTimes} Time => Request-Action: ${url}, Request-Header: ${JSON.stringify(
                                headers
                            )}, Request-Body: ${body}`
                        );
                        // 解析异常，可能是服务器丢包，触发重试
                        return await retry();
                    }
                    // JSON解析重试结束，抛出异常
                    logger.error(
                        `✘ Response JSON Format Error => Request-Action: ${url}, Response-Body: ${response.body}`
                    );
                    throw serverException(
                        "Server Error",
                        errorMap.SDK_RESPONSE_JSON_FORMAT_ERROR
                    );
                }

            } else if (statusCode >= 400 && statusCode < 500) {// 客户端错误
                const statusMsg = statusMap[statusCode];
                logger.error(
                    `✘ Client Error(${statusCode}) With Request-Action [${url}] => ${statusMsg} Request-Headers: ${JSON.stringify(
                        headers
                    )}, Request-Body: ${body}, Response-body: ${response.body}`
                );
                throw clientException(statusMsg, `status: ${statusCode}, body: ${response.body}`);

            } else if (statusCode >= 500) {// 服务端错误

                if (tryTimes <= maxRetry) { // 重试
                    logger.info(
                        `Retry Server Error ${tryTimes} Time => Request-Action: ${url}, Request-Header: ${JSON.stringify(
                            headers
                        )}, Request-Body: ${body}`
                    );
                    return await retry();
                }

                const statusMsg = statusMap[statusCode];
                logger.error(
                    `✘ Server Error With Request-Action: ${url} => ${statusMsg} Request-Headers: ${JSON.stringify(
                        headers
                    )}, Request-Body: ${body}, Response-body: ${response.body}`
                );
                throw serverException(statusMsg, `status: ${statusCode}, body: ${response.body}`);
            }
        }
        return await retry();
    }
}

module.exports = Client;

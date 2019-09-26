"use strict";
const assert = require("assert");
const CryptoJS = require("crypto-js");
const qs = require("querystring");
const Http = require("./http");
const createLogger = require("./logger");
const exception = require("./exception");
const userMixin = require("./api/user");
const dialogueMixin = require("./api/dialogue");
const knowledge = require("./api/knowledge");
const apiVersions = ["v1", "v2"];
const {
    clientException,
    serverException,
    errorMap,
    // statusMap,
    throwException
} = exception;

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

function formatLog(format, data, isDebug) {
    if (!isDebug) {
        return "";
    }
    const logFormat = format || "{endpoint} {uri} {method} {req_header} {req_body} {res_body}";
    let keys = logFormat.match(/\{(\S*)\}/g).map(item => {
        return item.match(/\{(\S*)\}/)[1];
    });
    let info = "";
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        let str = data[key] || "null";

        info += (`${key}: ${str} ${index === keys.length - 1 ? "" : "|"} `);
    }
    return info;
}

class Client {
    constructor(config) {
        assert(config, errorMap.SDK_INVALID_CREDENTIAL);
        assert(config.pubkey, errorMap.SDK_INVALID_CREDENTIAL);
        assert(config.secret, errorMap.SDK_INVALID_CREDENTIAL);
        if (
            config.endpoint &&
            !config.endpoint.startsWith("https://") &&
            !config.endpoint.startsWith("http://")
        ) {
            throw clientException(errorMap.SDK_ENDPOINT_RESOLVING_ERROR);
        }
        if (config.apiVersion && !apiVersions.includes(config.apiVersion)) {
            throw clientException(errorMap.SDK_INVALID_API_VERSION);
        }
        if (config.options && !isPlainObject(config.options)) {
            throw clientException(errorMap.SDK_INVALID_HTTP_OPTIONS);
        }
        this.endpoint = config.endpoint || "https://openapi.wul.ai";
        this.pubkey = config.pubkey;
        this.secret = config.secret;
        this.apiVersion = config.apiVersion || "v2";
        this.httpOptions = config.options || {};
        this.debug = config.debug !== undefined ? config.debug : false;
        this.logger = createLogger(this.debug);
        this.defaultMaxRetry = 3;
        this.defaultTimout = 6000;
        this.__http = new Http({
            endpoint: this.endpoint
        });
        this.request = this.request.bind(this);
    }

    logConfig(config = {}) {
        this.logFormat = config.format;
        this.logger = createLogger(this.debug, config);
    }
    /**
     * CommonRequest
     */
    async request(method, url, query, data, options = {}) {

        if (!isPlainObject(options)) {
            throw clientException(errorMap.SDK_INVALID_HTTP_OPTIONS);
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
        this.logger.info(`Request received => ${formatLog(this.logFormat, {
            uri: url,
            endpoint: this.endpoint,
            method: method,
            headers: JSON.stringify(headers),
            "req_body": data
        }, this.debug)}`);
        data = Buffer.from(data, "utf8");
        headers["content-length"] = data.length;

        options = Object.assign(this.httpOptions, options);
        // 聚合有效请求配置项
        const httpOptions = {
            timeout: options.timeout || this.defaultTimout,
            agent: options.agent || this.__http.keepAliveAgent,
            headers: headers,
            compression: options.compression === undefined ? false : options.compression
        };
        options.beforeRequest && (httpOptions.beforeRequest = options.beforeRequest);
        // 默认重试次数
        const maxRetry = options.maxRetry || this.defaultMaxRetry;
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
            const isDebug = self.debug;
            const headers = options.headers;
            let logData = {
                endpoint: self.endpoint,
                uri: url,
                method: method,
                req_header: JSON.stringify(headers),
                req_body: data
            };
            try {
                tryTimes++;
                response = await self.__http.request(method, url, data, options);
            } catch (error) {
                // 网络请求异常，重试
                if (tryTimes <= maxRetry) {
                    const logTitle = `Retry <${error.name}> ${tryTimes} times`;
                    self.logger.info(`${logTitle} => ${formatLog(self.logFormat, logData, isDebug)}`);
                    return await retry();
                }
                self.logger.info(`Request Timeout Error => ${formatLog(self.logFormat, logData, isDebug)}`);
                throw throwException(error.name, error.message);
            }
            const statusCode = response.status;
            logData["status"] = statusCode;
            logData["res_body"] = response.body;
            // 网路请求相关日志输出信息
            const logInfo = formatLog(self.logFormat, logData, isDebug);

            if (statusCode === 200) { // 请求成功
                try {
                    resJson = JSON.parse(response.body);
                    // JSON解析成功，正常返回
                    return resJson;
                } catch (error) {
                    // JSON解析失败，重试
                    if (tryTimes <= maxRetry) {
                        const logTitle = `Retry <Response JSON Format Error> ${tryTimes} times`;
                        self.logger.info(`${logTitle} => ${logInfo}`);
                        return await retry();
                    }
                    // 重试结束，抛出异常
                    const logTitle = `Response JSON Format Error`;
                    self.logger.error(`${logTitle} => ${logInfo}`);
                    throw serverException(`${logTitle}: ${response.body}`);
                }

            } else if (statusCode >= 400 && statusCode < 500) { // 客户端错误
                // 客户端错误，直接抛出异常
                // const statusMsg = statusMap[statusCode];
                self.logger.error(`Client Error(${statusCode}) => ${logInfo}`);
                throw clientException(`${statusCode}: ${response.body}`);

            } else if (statusCode >= 500) { // 服务端错误
                // const statusMsg = statusMap[statusCode];
                // 服务端错误，重试
                if (tryTimes <= maxRetry) {
                    const logTitle = `Retry <Server Error> ${tryTimes} times`;
                    self.logger.info(`${logTitle} => ${logInfo}`);
                    return await retry();
                }
                // 重试结束，抛出异常
                self.logger.error(`Server Error(${statusCode}) => ${logInfo}`);
                throw serverException(`${statusCode}: ${response.body}`);
            } else {
                self.logger.error(`Unknown Error => ${logInfo}`);
                throw serverException(`${statusCode}: ${response.body}`);
            }
        }
        return await retry();
    }
}
// 聚合API
Object.assign(Client.prototype, userMixin, dialogueMixin, knowledge);

module.exports = Client;

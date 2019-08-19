"use strict";

const httpx = require("httpx");
const qs = require("querystring");
const debug = require("debug");
const exception = require("./exception");
/**
 * base http request class
 */
class Http {
  constructor(
    config = {
      endpoint: "https://openapi.wul.ai"
    }
  ) {
    this.endpoint = config.endpoint;
    debug(this.endpoint, "Client Error: must pass config.endpoint");
    const HttpModule = this.endpoint.startsWith("https://")
      ? require("https")
      : require("http");
    // open connection pool
    this.keepAliveAgent = new HttpModule.Agent({
      keepAlive: true,
      keepAliveMsecs: 3000
    });
  }
  /**
   * default headers
   *
   * @readonly
   * @memberof Http
   */
  get defaultHeaders() {
    const headers = {
      accept: "application/json",
      "content-type": "application/json"
    };
    return headers;
  }
  get(url, query, headers, options) {
    return this.request("GET", url, query, "", headers, options);
  }
  post(url, query, body, headers, options) {
    return this.request("POST", url, query, body, headers, options);
  }
  put(url, query, body, headers, options) {
    return this.request("PUT", url, query, body, headers, options);
  }
  delete(url, query, headers, options) {
    return this.request("DELETE", url, query, "", headers, options);
  }
  async request(
    method,
    url,
    query = {},
    body = "",
    headers = {},
    options = {}
  ) {
    let sendBody = null;
    let reqUrl = `${this.endpoint}${url}`;
    const mixHeaders = Object.assign(
      this.defaultHeaders,
      this.headersKeyLowerify(headers)
    );
    if (Object.keys(query).length) {
      reqUrl += `?${qs.stringify(query)}`;
    }
    if (body) {
      sendBody = Buffer.from(body, "utf8");
      mixHeaders["content-length"] = sendBody.length;
    }
    const reqOptions = Object.assign(
      {
        method,
        agent: this.keepAliveAgent,
        headers: mixHeaders,
        data: sendBody
      },
      options
    );
    const response = await httpx.request(reqUrl, reqOptions);
    const resBody = await httpx.read(response, "utf8");
    let resJson = null;
    const status = response.statusCode;
    try {
      resJson = JSON.parse(resBody);
    } catch (error) {
      throw exception.serverException(
        exception.infoMap.SDK_RESPONSE_JSON_FORMAT_ERROR,
        {
          body: resBody
        }
      );
    }
    if (status >= 400) {
      const errCode = resJson.code;
      const errMsg = resJson.error;
      throw exception.serverException(`code: ${errCode}, ${errMsg}`, {
        status: status,
        result: resJson,
        code: errCode
      });
    }
    return resJson;
  }
  /**
   * headers key to lower case
   */
  headersKeyLowerify(headers) {
    let newHeaders = {};
    let keys = Object.keys(headers);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      newHeaders[key.toLocaleLowerCase()] = headers[key];
    }
    return newHeaders;
  }
}

module.exports = Http;

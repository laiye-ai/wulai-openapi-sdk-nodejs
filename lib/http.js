"use strict";

const httpx = require("httpx");
const qs = require("querystring");
class Http {
  constructor(config) {
    this.endpoint = config.endpoint;
    this.apiVersion = config.apiVersion;
    const HttpModule = this.endpoint.startsWith("https://")
      ? require("https")
      : require("http");
    // 初始化 http 连接池
    this.keepAliveAgent = new HttpModule.Agent({
      keepAlive: true,
      keepAliveMsecs: 3000
    });
  }
  get(url, query, options) {
    return this.request("GET", url, query, "", options);
  }
  post(url, query, body, options) {
    return this.request("POST", url, query, body, options);
  }
  put(url, query, body, options) {
    return this.request("PUT", url, query, body, options);
  }
  delete(url, query, options) {
    return this.request("DELETE", url, query, "", options);
  }
  async request(
    method,
    url,
    query = {},
    body = "",
    options = {}
  ) {
    query = query || "";
    url = `${this.endpoint}${url}`;
    if (Object.keys(query).length) {
      url += `?${qs.stringify(query)}`;
    }
    let reqOptions = Object.assign(
      {
        method,
        agent: this.keepAliveAgent,
        data: body
      },
      options
	);
	console.log(url);
	console.log(reqOptions);
    const response = await httpx.request(url, reqOptions);
    const resBody = await httpx.read(response, "utf8");
    return {
      status: response.statusCode,
      body: resBody
    };
  }
}

module.exports = Http;

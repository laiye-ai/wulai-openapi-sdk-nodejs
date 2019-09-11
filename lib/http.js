"use strict";

const httpx = require("httpx");

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
  get(url, options) {
    return this.request("GET", url, "", options);
  }
  post(url, data, options) {
    return this.request("POST", url, data, options);
  }
  put(url, data, options) {
    return this.request("PUT", url, data, options);
  }
  delete(url, options) {
    return this.request("DELETE", url, "", options);
  }
  async request(
    method,
    url,
    data = "",
    options = {}
  ) {
	url = `${this.endpoint}${url}`;
	console.log(url);
    let reqOptions = Object.assign(
      {
        method,
        agent: this.keepAliveAgent,
        data: data
      },
      options
	);
    const response = await httpx.request(url, reqOptions);
    const resBody = await httpx.read(response, "utf8");
    return {
      status: response.statusCode,
      body: resBody
    };
  }
}

module.exports = Http;

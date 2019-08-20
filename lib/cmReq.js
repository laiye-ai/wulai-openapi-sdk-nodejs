"use strict";
const actionsMap = require("./actions_map");
const CryptoJS = require("crypto-js");
const exception = require("./exception");
const Http = require("./http");
const assert = require("assert");
const http = new Http({
  endpoint: "https://openapi.wul.ai"
});

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
/**
 * 主请求入口
 */
function commonRequest(config) {
  assert(config.action, exception.infoMap.SDK_NOT_SUPPORT);
  assert(actionsMap[config.action], exception.infoMap.SDK_NOT_SUPPORT);
  assert(config.pubkey, exception.infoMap.SDK_INVALID_CREDENTIAL);
  assert(config.secret, exception.infoMap.SDK_INVALID_CREDENTIAL);
  if (
    config.endpoint && !config.endpoint.startsWith("https://") &&
    !config.endpoint.startsWith("http://")
  ) {
    throw exception.clientException(
      exception.infoMap.SDK_ENDPOINT_RESOLVING_ERROR
    );
  }
  if (config.apiVersion && !apiVersions.includes(config.apiVersion)) {
    throw exception.clientException(exception.infoMap.SDK_INVALID_API_VERSION);
  }
  const apiVersion = config.apiVersion || "v2";
  const action = actionsMap[config.action];
  const headers = makeAuthHeaders(config.pubkey, config.secret);
  const url = `/${apiVersion}${action.url}`;
  const postBody = JSON.stringify(config.data) || "";
  const query = config.query || {};

  return http.request(action.method, url, query, postBody, headers);
}

module.exports = commonRequest;

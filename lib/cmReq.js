"use strict";
const actionsMap = require("./actions_map");
const CryptoJS = require("crypto-js");
const exception = require("./exception");
const Http = require("./http");
const assert = require("assert");
const http = new Http();

function getRandomString(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

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

function commonRequest(config) {
  assert(config.action, exception.infoMap.SDK_NOT_SUPPORT);
  assert(actionsMap[config.action], exception.infoMap.SDK_NOT_SUPPORT);
  assert(config.pubkey, exception.infoMap.SDK_MUST_PASS_SECRET_AND_PUBKEY);
  assert(config.secret, exception.infoMap.SDK_MUST_PASS_SECRET_AND_PUBKEY);

  let action = actionsMap[config.action];
  let headers = makeAuthHeaders(config.pubkey, config.secret);
  let apiVersion = config.apiVersion || "v2";
  return http.request(
    action.method,
    `/${apiVersion}${action.url}`,
    config.query || {},
    JSON.stringify(config.data) || "",
    headers
  );
}

module.exports = commonRequest;

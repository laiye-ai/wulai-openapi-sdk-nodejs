"use strict";

const infoMap = {
  SDK_ENDPOINT_RESOLVING_ERROR: "Endpoint parse error: endpoint must starts with 'https://' or 'http://'.",
  SDK_SERVER_UNREACHABLE: "Unable to connect to server",
  SDK_INVALID_REQUEST: "The request is not a valid CommonRequest.",
  SDK_INVALID_CREDENTIAL: "The pubkey or secret is incorrect. Please check it.",
  SDK_INVALID_PARAMS: "The param is incorrect. Please check it",
  SDK_NOT_SUPPORT: "Invalid action, please check it",
  SDK_HTTP_ERROR: "Http request error",
  SDK_METHOD_NOT_ALLOW: "Method not allow, please check it.",
  SDK_INVALID_API_VERSION: "Invalid api version, please check it.",
  SDK_RESPONSE_JSON_FORMAT_ERROR: "response json format error."
};
function throwException(name, text, opts = {}) {
  let error = new Error(text);
  error.name = name;
  Object.assign(error, opts);
  return error;
}

function serverException(text, errOpts) {
  return throwException("Server Error", text, errOpts);
}

function clientException(text, errOpts) {
  return throwException("Client Error", text, errOpts);
}

module.exports = {
  infoMap,
  serverException,
  clientException,
  throwException
};

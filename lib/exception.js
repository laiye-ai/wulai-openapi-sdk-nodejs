"use strict";

const errorMap = {
    SDK_ENDPOINT_RESOLVING_ERROR:
        "Endpoint parse error: endpoint must starts with 'https://' or 'http://'.",
    SDK_SERVER_UNREACHABLE: "Unable to connect to server",
    SDK_INVALID_REQUEST: "The request is not a valid CommonRequest.",
    SDK_INVALID_CREDENTIAL: "The pubkey or secret is incorrect. Please check it.",
    SDK_INVALID_PARAMS: "The param is incorrect. Please check it",
    SDK_NOT_SUPPORT: "Invalid action, please check it",
    SDK_HTTP_ERROR: "Http request error",
    SDK_METHOD_NOT_ALLOW: "Method not allow, please check it.",
    SDK_INVALID_API_VERSION: "Invalid api version, please check it.",
    SDK_RESPONSE_JSON_FORMAT_ERROR: "response json format error.",
    SDK_INVALID_HTTP_OPTIONS: "Invalid http options type, please check it."
};

const statusInfo = {
    SDK_INVALID_ARGUMENT:
        "客户端指定了无效参数。如需了解详情，请查看错误消息和错误详细信息。",
    SDK_FAILED_PRECONDITION: "请求无法在当前系统状态下执行，例如删除非空目录。",
    SDK_OUT_OF_RANGE: "客户端指定了无效范围",
    SDK_UNAUTHENTICATED: "请求未通过身份验证",
    SDK_PERMISSION_DENIED: "客户端权限不足",
    SDK_NOT_FOUND:
        "找不到指定的资源，或者请求由于未公开的原因（例如白名单）而被拒绝。",
    SDK_ABORTED: "并发冲突，例如读取/修改/写入冲突。",
    SDK_ALREADY_EXISTS: "客户端尝试创建的资源已存在。",
    SDK_RESOURCE_EXHAUSTED: "资源配额不足或达到速率限制。",
    SDK_CANCELLED: "请求被客户端取消。",
    SDK_DATA_LOSS: "出现不可恢复的数据丢失或数据损坏。客户端应该向用户报告错误。",
    SDK_UNKNOWN: "出现未知的服务器错误。通常是服务器错误。",
    SDK_INTERNAL: "出现内部服务器错误。通常是服务器错误。",
    SDK_NOT_IMPLEMENTED: "API 方法未通过服务器实现。",
    SDK_UNAVAILABLE: "服务不可用。通常是服务器已关闭。",
    SDK_DEADLINE_EXCEEDED: "超出请求时限。"
};

const statusMap = {
    400: statusInfo.SDK_INVALID_ARGUMENT,
    401: statusInfo.SDK_UNAUTHENTICATED,
    403: statusInfo.SDK_PERMISSION_DENIED,
    404: statusInfo.SDK_NOT_FOUND,
    409: statusInfo.SDK_ABORTED,
    429: statusInfo.SDK_RESOURCE_EXHAUSTED,
    499: statusInfo.SDK_CANCELLED,
    500: statusInfo.SDK_DATA_LOSS,
    501: statusInfo.SDK_NOT_IMPLEMENTED,
    503: statusInfo.SDK_UNAVAILABLE,
    504: statusInfo.SDK_DEADLINE_EXCEEDED
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
    errorMap,
    statusInfo,
    statusMap,
    serverException,
    clientException,
    throwException,
};

"use strict";

const httpx = require("httpx");
const qs = require("querystring");
// const assert = require("assert");
// const exception = require("./exception");
// const {
//   clientException,
//   serverException,
//   errorMap,
//   statusMap,
//   throwException
// } = exception;
// function errorMsg(status, errCode, errMsg) {
//   return `status: ${status}, code: ${errCode}, message: ${errMsg}`;
// }
// async function autoRetry(fn, maxRetry = 3, errHandler) {
//   return async function (...args) {
//     let tryTimes = 0;
//     async function inner() {
//       try {
//         tryTimes ++;
//         return await fn(...args);
//       } catch(err) {
//         if (errHandler) {
//           errHandler(err, tryTimes);
//         }
//         if (tryTimes === maxRetry) {
//           return inner();
//         }
        
//       }
//     }
//     return await inner();
//   };
// }

// async function autoRetryRequest(url, options, maxRetry = 3) {
//   assert(
//     typeof maxRetry === "number",
//     "The type of maxEntryTimes must be 'number'"
//   );
//   let tryTimes = 0;
//   async function inner() {
//     let response = null;
//     let resBody = "";
//     let resJson = {};
//     try {
//       tryTimes++;
//       response = await httpx.request(url, options);
//       resBody = await httpx.read(response, "utf8");
//     } catch (error) {
//       throw throwException(error.name, error.message);
//     }
//     try {
//       resJson = JSON.parse(resBody);
//     } catch (error) {
//       // 返回结果 JSON 格式解析错误
//       if (tryTimes === maxRetry) {
//         console.log(errorMap.SDK_RESPONSE_JSON_FORMAT_ERROR);
//         throw serverException(
//           "Server Error",
//           errorMap.SDK_RESPONSE_JSON_FORMAT_ERROR,
//           {
//             body: resBody,
//             info: error.message
//           }
//         );
//       }
//       return await inner();
//     }
//     let status = response.statusCode;
//     let errCode = resJson.code;
//     let errMsg = resJson.error;
//     let errorInfo = errorMsg(status, errCode, errMsg);
//     // 服务器错误
//     if (status >= 500) {
//       if (tryTimes === maxRetry) {
//         const statusMsg = statusMap[status];
//         throw serverException(statusMsg, errorInfo);
//       }
//       return await inner();
//     }
//     // 客户端错误
//     if (status >= 400 && status < 500) {
//       const statusMsg = statusMap[status];
//       throw clientException(statusMsg, errorInfo);
//     }
//     return resJson;
//   }
//   return await inner();
// }

class Http {
  constructor(config) {
    this.endpoint = config.endpoint;
    const HttpModule = this.endpoint.startsWith("https://")
      ? require("https")
      : require("http");
    // 初始化 http 连接池
    this.keepAliveAgent = new HttpModule.Agent({
      keepAlive: true,
      keepAliveMsecs: 3000
    });
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
    query = query || "";
    if (Object.keys(query).length) {
      url += `?${qs.stringify(query)}`;
    }
    let reqOptions = Object.assign(
      {
        method,
        agent: this.keepAliveAgent,
        headers,
        data: body
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

# @laiye-ai/sdk-core

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![codecov][cov-image]][cov-url]

[npm-image]: https://img.shields.io/npm/v/@laiye-ai/sdk-core.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@laiye-ai/sdk-core
[travis-image]: https://travis-ci.org/laiye-ai/wulai-openapi-sdk-nodejs.svg?branch=master
[travis-url]: https://travis-ci.org/laiye-ai/wulai-openapi-sdk-nodejs
[cov-image]: https://codecov.io/gh/laiye-ai/wulai-openapi-sdk-nodejs/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/laiye-ai/wulai-openapi-sdk-nodejs

## 安装

```js
npm install @laiye-ai/sdk-core --save
```

## 使用条件

Node.js >= 8.x

## 如何使用

```js
"use strict";
const WuLaiClient = require("@laiye-ai/sdk-core");
// 初始化 client，pubkey 和 secret 必传
const client = new WuLaiClient({
  pubkey: "your pubkey",
  secret: "your secret"
});

client
  .getBotResponse({
    msg_body: {
      text: {
        content: "谢谢"
      }
    },
    user_id: "created user_id",
    extra: "extra info"
  })
  .then(res => {
    console.log(res);
  });
```
### SDK初始化配置
`new WulaiClient([, options])`
```js
new WulaiClient({
    pubkey: "string", // 机器人 pubkey，required
    secret: "string", // 机器人 secret，required
    endpoint: "string", // base url，optional
    apiVersion: "v2", // 版本，optional
    options: { // optional
        timeout: 6000, // 超时时间，单位ms，默认 6000ms，optional
        agent: "<Http Agent>", // http or https 连接池，optional
        compression: "boolean", // 服务端返回数据是否压缩，optional
        maxRetry: "number", // 网络请求异常，重试次数，默认 3 次，设置 1 为取消，optional
        headers: "object" // 请求头，optional
    }
});
```

<a href="./docs/API.md">已实现 API</a>


## License

This SDK is distributed under the Apache License, Version 2.0, see LICENSE for more information.


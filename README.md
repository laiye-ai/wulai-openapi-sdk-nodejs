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
npm 安装

```js
npm install @laiye-ai/sdk-core -S
```
yarn 安装
```js
yarn add @laiye-ai/sdk-core -S
```

## 使用环境

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
    debug: "boolean", // 是否开启调试模式，开启后 sdk 将对所有请求进行日志输出，默认为 stdout 输出模式
    options: { // optional
        timeout: 6000, // 超时时间，单位ms，默认 6000ms，optional
        agent: "<Http Agent>", // http or https 连接池，optional
        compression: "boolean", // 服务端返回数据是否压缩，optional
        maxRetry: "number", // 网络请求异常，重试次数，默认 3 次，设置 1 为取消，optional
        headers: "object" // 请求头，optional
    }
});
```

### 常见场景及调用示例

<a href="./examples/scene1">一、基础对话</a>

<a href="./examples/scene2">二、个性化对话</a>

<a href="./examples/scene3">三、异步基础对话</a>

<a href="./examples/scene4">四、异步定制对话</a>


### SDK 相关说明文档

<a href="./docs/COMMON.md">SDK-CommonRequest</a>

<a href="./docs/LOG.md">SDK-日志配置</a>

<a href="./docs/TIMEOUT.md">SDK-设置请求超时时间</a>

<a href="./docs/API.md">SDK-已实现API</a>

<a href="./docs/TODO.md">SDK-待实现API</a>

## License

This SDK is distributed under the Apache License, Version 2.0, see LICENSE for more information.


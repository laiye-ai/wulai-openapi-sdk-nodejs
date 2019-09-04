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

## API

`client.userCreate` 创建用户

`client.userAttributeCreate` 添加用户属性值

`client.userAttributeList` 获取用户属性值列表

`client.getHistoryRecord` 查询历史消息

`client.getBotResponse` 获取机器人回复

`client.getKeywordBotResponse` 获取关键字机器人回复

`client.getTaskBotResponse` 获取任务机器人回复

`client.getQABotResponse` 获取问答机器人回复

`client.request` CommonRequest接口

## License

This SDK is distributed under the Apache License, Version 2.0, see LICENSE for more information.


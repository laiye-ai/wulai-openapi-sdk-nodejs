# @laiye-ai/sdk-core

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![codecov][cov-image]][cov-url]

[npm-image]: https://img.shields.io/npm/v/@laiye-ai/sdk-core.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@laiye-ai/sdk-core
[travis-image]: https://travis-ci.org/laiye-ai/wulai-openapi-sdk-nodejs.svg?branch=master?style=flat-square
[travis-url]: https://travis-ci.org/laiye-ai/wulai-openapi-sdk-nodejs
[cov-image]: https://codecov.io/gh/laiye-ai/wulai-openapi-sdk-nodejs/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/laiye-ai/wulai-openapi-sdk-nodejs

## 安装

```js
npm install @laiye-ai/sdk-core -S
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



## License

The MIT License


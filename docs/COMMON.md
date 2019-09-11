# CommonRequest 泛用型API

当您要使用的某个API接口，目前SDK没有提供时，可以采用泛用型的API调用方式（CommonRequest）。
使用 CommonRequest 调用方式可实现任意 Open API 接口的调用。

### 使用方式

```js
const WulaiClient = require("@laiye-ai/sdk-core")

const client = new WulaiClient({
    pubkey: "string",
    secret: "string",
});

const params = {
    msg_body: {
        text: {
            content: "你好"
        }
    },
    user_id: "user_id"
};
client.request("POST", "/v2/msg/bot-response", null, params, {
    timeout: 10000
});
```

### 参数说明

`client.request(method, url, query, params, options)`
* **method** String-POST、GET、DELETE、PUT（目前统一使用 POST）
* **url** String-请求路径，结合版本号使用，如: `/v2/msg/bot-response`
* **query** Object-路由参数
* **params** Object-请求体
* **options** Object-请求配置项
  * **timeout** Number-请求超时时间
  * **headers** Object-请求头
  * **agent** Object-http连接池配置
  * **beforeRequest** Function-钩子函数，可以在请求前做一些事情
  * **compression** Boolean-告诉服务器是否压缩响应数据
  * **maxRetry** Number-请求失败的最大重试次数
# 设置接口超时时间
sdk默认超时时间为: 6000 ms
### 1. sdk初始化设置超时时间
初始化配置超时时间，将对所有请求都有效，可以作为默认超时时间进行配置。
```js
new WulaiClient({
    pubkey: "",
    secret: "",
    options: {
        timeout: 3000 // 单位ms
    }
});
```

### 2. 单个API设置超时时间
单个API设置超时时间，只对被设置的API接口请求起作用，不影响其他请求。
```js
const params = {
    msg_body: {
        text: {
            content: "你好"
        }
    },
    user_id: "user_id"
};
client.getBotResponse(params, {
    timeout: 10000 // 单位ms
});
```

### 3. CommonRequest 设置超时时间
`CommonRequest` 设置超时时间，只对被设置接口请求起作用，不影响其他请求。
```js
const params = {
    msg_body: {
        text: {
            content: "你好"
        }
    },
    user_id: "user_id"
};
client.request("POST", "/v2/msg/bot-response", null, params, {
    timeout: 10000 // 单位ms
});
```

# SDK 日志输出
SDK 对请求日志进行输出，便于开发者对程序异常进行调试，更加快速的定位问题。

日志会在debug模式下自动开启，SDK默认关闭debug模式。

### 开启 debug 模式


```js
const WuLaiClient = require("@laiye-ai/sdk-core");

const client = new WuLaiClient({
  pubkey: "string",
  secret: "string",
  debug: true 
});
```

### 日志配置介绍

通过日志配置方法（`logConfig`）可对日志输出方式进行设置

`client.logConfig(options)`
* **options** Object - Optional
  * **format** String - 如 "{endpoint} {uri} {method} {headers}"
  * **stdout** Boolean - 是否开启 stdout 输出模式，默认开启
  * **fileout** Boolean - 是否开启日志文件输出模式，默认关闭
  * **filename** String - 日志文件存储路径， 默认路径 'logs/wulai-sdk.log'

### 格式变量

日志内容支持以下变量替换：

| 变量      |   描述       |
|----------|-------------|
| {endpoint}     | base url |
| {uri}          | 请求的URI |
| {req_header}      | 请求头 |
| {method}       | 请求方法 |
| {status}       | 响应的状态代码 |
| {req_body}     | 请求主体 |
| {res_body}     | 响应主体 |

### 如何使用

```js
const WuLaiClient = require("@laiye-ai/sdk-core");
const client = new WuLaiClient({
  pubkey: "string",
  secret: "string",
  debug: true // 开启 debug 模式
});
client.logConfig({
    stdout: true,  // 开启 stdout 输出
    fileout: true, // 开启日志文件输出
    filename: "logs/wulai-sdk.log" // 日志文件存储路径
})
```

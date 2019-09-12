# SDK 日志输出
SDK 对请求日志进行输出，便于开发者对程序异常进行调试，更加快速的定位问题。

日志会在debug模式下自动开启，SDK默认关闭debug模式。

### 如何开启 debug 模式

目前存在两种方式开启 debug 模式

**1.SDK初始化设置**

```js
const WuLaiClient = require("@laiye-ai/sdk-core");

const client = new WuLaiClient({
  pubkey: "string",
  secret: "string",
  debug: true 
});
```

**2.通过日志配置方法设置**

```js
const WuLaiClient = require("@laiye-ai/sdk-core");
WulaiClient.LogConfig(true)
```

### 日志配置介绍

通过日志配置静态方法（`LogConfig`）可对日志开关和日志输出进行设置

`WulaiClient.LogConfig(debug[, options])`
* **debug** Boolean - 是否开启debug模式，所有日志配置，只在开启 debug 模式下才有效。
* **options** Object - Optional
  * **stdout** Boolean - 是否开启 stdout 输出模式，默认开启
  * **fileout** Boolean - 是否开启日志文件输出模式，默认关闭
  * **filename** String - 日志文件存储路径， 默认路径 'logs/wulai-sdk.log'

### 如何使用

```js
const WuLaiClient = require("@laiye-ai/sdk-core");
// 开启 debug 模式
WulaiClient.LogConfig(true, {
    stdout: true,  // 开启 stdout 输出
    fileout: true, // 开启日志文件输出
    filename: "logs/wulai-sdk.log" // 日志文件存储路径
    
})
```

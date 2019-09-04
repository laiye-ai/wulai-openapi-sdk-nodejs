## 创建用户

创建用户后可以实现多轮对话机器人、从用户维度统计分析、吾来工作台人工收发消息、用户维护的消息记录查询与搜索等功能。在用户与机器人进行任何交互之前，都需要先创建用户。

`client.userCreate(params)`

**params** Object-required

```js
{
  // string, optional (用户昵称) <= 128 characters
  "nickname": "nickname_string",
  // string, optional (用户头像地址。用户头像会展示在吾来SaaS的用户列表、消息记录等任何展示用户信息的地方) <= 512 characters
  "avatar_url": "https://laiye-im-saas.oss-cn-beijing.aliyuncs.com/rc-upload-1521637604400-2-login_logo.png",
  // string, required (用户id作为用户的唯一识别。如果调用方客户端用户没有唯一标识，尽量通过其他标识来唯一区分用户，如设备号) [ 1 .. 128 ] characters
  "user_id": "0cf361e1-4b44-483d-a159-54dabdf7e814"
}
```

**response**

```
{}
```

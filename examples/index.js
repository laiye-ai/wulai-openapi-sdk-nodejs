"use strict";
const WuLaiClient = require("../index");
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
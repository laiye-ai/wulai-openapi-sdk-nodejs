"use strict";
const WuLaiClient = require("../index");
// 初始化 client，pubkey 和 secret 必传
const client = new WuLaiClient({
  pubkey: "eIKUn1ftuqREgJjHUWvEZpZntmlUPQB2007e4a782c3c44c410",
  secret: "8B2pRLvpYPM3txcuobRo"
});

client
  .getBotResponse({
    msg_body: {
      text: {
        content: "谢谢"
      }
    },
    user_id: "sdjkfhaksdfjkajsjfdkajsdkf",
    extra: "dfdsfdfsdfs"
  })
  .then(res => {
    console.log(res);
  });
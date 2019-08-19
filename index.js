"use strict";

const Client = require("./lib/client");

const client = new Client({
  pubkey: "eIKUn1ftuqREgJjHUWvEZpZntmlUPQB2007e4a782c3c44c410",
  secret: "8B2pRLvpYPM3txcuobRo"
});

function toUnicode(str) {
  var res = [];
  for (var i = 0; i < str.length; i++) {
    res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "\\u" + res.join("\\u");
}
console.log(toUnicode("测试卡片消息"));
client
  .getBotResponse({
    msg_body: {
      text: {
        content: "谢谢" //encodeURIComponent("测试文本消息")
      }
    },
    user_id: "sdjkfhaksdfjkajsjfdkajsdkf",
    extra: "dfdsfdfsdfs"
  });


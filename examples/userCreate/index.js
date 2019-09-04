"use strict";

const WulaiClient = require("@laiye-ai/sdk-core");
const client = new WulaiClient({
  pubkey: "your bot pubkey",
  secret: "your bot secret"
});
client
  .userCreate({
    user_id: "user_id_string",
    avatar_url: "avatar_url_string",
    nickname: "nickname_string"
  })
  .then(res => {
    console.log(res);
  });

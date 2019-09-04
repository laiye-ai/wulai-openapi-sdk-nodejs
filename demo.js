"use strict";
const WulaiClient = require("./index");

const client = new WulaiClient({
  pubkey: process.env.WULAI_SDK_PUBKEY,
  secret: process.env.WULAI_SDK_SECRET,
  logOpts: {
    debug: true
  }
});
client.userCreate({
  user_id: "hhhhhhhhhhh"
}).then(res => {
  console.log(res);
});
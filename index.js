"use strict";

const Http = require("./lib/http");

const request = new Http({
  endpoint: "https://tiandao-temp.wul.ai"
});

request
  .get("/tiandao-api/v1/openid", {
    code: "kdjfkjdkjk"
  })
  .then(res => {
    console.log(res);
  });

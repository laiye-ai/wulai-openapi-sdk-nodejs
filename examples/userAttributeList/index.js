"use strict";

const WulaiClient = require("@laiye-ai/sdk-core");
const client = new WulaiClient({
  pubkey: "your bot pubkey",
  secret: "your bot secret"
});
client
  .userAttributeList({
    filter: {
      use_in_user_attribute_group: true
    },
    page: 1,
    page_size: 1
  })
  .then(res => {
    console.log(res);
  });

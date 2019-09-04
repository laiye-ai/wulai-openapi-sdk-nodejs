"use strict";

const WulaiClient = require("@laiye-ai/sdk-core");
const client = new WulaiClient({
  pubkey: "your bot pubkey",
  secret: "your bot secret"
});
client
  .userAttributeCreate({
    user_attribute_user_attribute_value: [
      {
        user_attribute: {
          id: "string"
        },
        user_attribute_value: {
          name: "string"
        }
      }
    ],
    user_id: "string"
  })
  .then(res => {
    console.log(res);
  });

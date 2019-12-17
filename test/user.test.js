"use strict";
const WuLaiSDKClient = require("../lib/api/user");
const expect = require("chai").expect;
const USER_ID = "wulai_node_sdk_test";
const PUBKEY = process.env.WULAI_SDK_PUBKEY;
const SECRET = process.env.WULAI_SDK_SECRET;

describe("Client User API", async () => {
    let client = new WuLaiSDKClient({
        endpoint: "https://openapi.wul.ai",
        pubkey: PUBKEY,
        secret: SECRET,
        apiVersion: "v2"
    });
    it("createUser should ok", async () => {
        let response = await client.createUser({
            nickname: USER_ID,
            avatar_url:
                "https://laiye-im-saas.oss-cn-beijing.aliyuncs.com/rc-upload-1521637604400-2-login_logo.png",
            user_id: USER_ID
        });
        expect(response).to.eql({});
    });
    it("createUserAttribute should ok", async () => {
        let response = await client.createUserAttribute({
            user_attribute_user_attribute_value: [
                {
                    user_attribute: {
                        id: "100000"
                    },
                    user_attribute_value: {
                        name: "男"
                    }
                }
            ],
            user_id: USER_ID
        });

        expect(response).to.eql({});
    });
    it("userAttributeList should ok", async () => {
        let response = await client.listUserAttribute({
            filter: {
                use_in_user_attribute_group: true
            },
            page: 1,
            page_size: 1
        });
        expect(response).to.be.an("object");
    });
});
"use strict";
const WulaiClient = require("@laiye-ai/sdk-core");

// 初始化传入机器人的pubkey 和 secret
const client = new WulaiClient({
    pubkey: process.env.WULAI_SDK_PUBKEY,
    secret: process.env.WULAI_SDK_SECRET
});
// 自定义用户ID
const custom_userid = "custom_userid";

async function main() {
    // 1. 创建用户（如未创建过）
    await client.createUser({
        user_id: custom_userid,
        avatar_url: "https://laiye-im-saas.oss-cn-beijing.aliyuncs.com/rc-upload-1521637604400-2-login_logo.png",
        nickname: "laiye-ai"
    });
    // 2. 给用户添加属性
    await client.createUserAttribute({
        user_attribute_user_attribute_value: [{
            user_attribute: {
                id: "100000"
            },
            user_attribute_value: {
                name: "男"
            }
        }],
        user_id: custom_userid
    });
    // 3. 获取机器人回复
    const user_send_message = "你好";
    const msg_response = await client.getBotResponse({
        msg_body: {
            text: {
                content: user_send_message
            }
        },
        user_id: custom_userid
    });
    console.log(JSON.stringify(msg_response));
}
main();
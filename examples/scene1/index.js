"use strict";
const WulaiClient = require("@laiye-ai/sdk-core");

const client = new WulaiClient({
    pubkey: process.env.WULAI_SDK_PUBKEY,
    secret: process.env.WULAI_SDK_SECRET
});
const custom_userid = "custom_userid";

async function main() {
    // 1. 创建用户（如未创建过）
    await client.createUser({
        user_id: custom_userid,
        avatar_url: "https://laiye-im-saas.oss-cn-beijing.aliyuncs.com/rc-upload-1521637604400-2-login_logo.png",
        nickname: "laiye-ai"
    });
    // 2. 进行机器人对话
    const user_send_message = "你好";
    const msg_response = await client.getBotResponse({
        msg_body: {
            text: {
                content: user_send_message
            }
        },
        user_id: custom_userid
    });
    console.log(msg_response);
}
main();
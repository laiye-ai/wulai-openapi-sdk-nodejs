"use strict";
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const koaStatic = require("koa-static");
const path = require("path");
const WulaiClient = require("@laiye-ai/sdk-core");
const Router = require("koa-router");
const sockets = require("./sockets");

const app = new Koa();
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server, {
    path: "/sdk-chat"
});

const router = new Router();
const PORT = 8660;
const staticPath = "./public";
const wulaiClient = new WulaiClient({
    pubkey: process.env.SDK_SCENE_PUBKEY,
    secret: process.env.SDK_SCENE_SECRET
});

app.use(bodyParser());
// 静态资源
app.use(koaStatic(path.join(__dirname, staticPath)));

// 打印请求日志
app.use(async (ctx, next) => {
    console.log(ctx.request.url, JSON.stringify(ctx.request.body), "\n");
    return await next();
});
// 监听 websocket 连接
io.on("connection", async (socket) => {
    const uid = socket.request._query.uid;
    if (!sockets.get(uid)) {
        try {
            // 1.创建用户
            await wulaiClient.createUser({
                user_id: uid
            });
            // 2.如果需要个性化回复，在此处调用 createUserAttribute 添加用户属性
            await wulaiClient.createUserAttribute({
                user_attribute_user_attribute_value: [
                    {
                        user_attribute: {
                            id: "101520"
                        },
                        user_attribute_value: {
                            name: "girl"
                        }
                    }
                ],
                user_id: uid
            });
        } catch (error) {
            console.error(error);
        }

    } else {
        console.log(`${uid} 用户已存在`);
    }
    if (uid) {
        // 缓存 socket 
        sockets.add(uid, socket);
    }
    // socket 收到用户消息
    socket.on("sdk-message", (uid, word, fn) => {
        // 3.调用 receiveMessage 将用户的消息传给机器人
        wulaiClient.receiveMessage({
            msg_body: {
                text: {
                    content: word
                }
            },
            user_id: uid
        });
    });
    socket.on("disconnect", () => {
        sockets.remove(uid);
    });
});
/** 
 * 消息路由接口
 * 
 * 4.在消息路由接口中接受机器人返回的结果
 *   将消息路由的消息体处理完成之后，作为 Response 返回给吾来平台
*/
router.post("/api/msg-route", ctx => {
    const {
        suggested_response,
        is_dispatch,
    } = ctx.request.body;
    let custom_suggested_response = [];
    if (suggested_response.length > 0) {
        for (let i = 0; i < suggested_response.length; i++) {
            const sug_res = suggested_response[i];
            sug_res.is_send = true; // 标记所有候选回复可发送
            custom_suggested_response.push(sug_res);
        }
    }
    ctx.body = {
        suggested_response: custom_suggested_response,
        is_dispatch
    };
});
/** 
 * 消息投递接口
 * 5. 吾来来机器人会根据吾来平台上的配置回调消息投递接口，返回置信度最高的回复
 *    消息投递接口拿到消息后，发送给用户
*/
router.post("/api/msg-delivery", ctx => {
    const response = ctx.request.body;
    const socket = sockets.get(response.user_id);
    if (socket) {
        socket.emit("sdk-message", response);
    }
    ctx.body = "";
});
app.use(router.routes()).use(router.allowedMethods());

server.listen(PORT, () => {
    console.log(`server starting at http://localhost:${PORT}`);
});
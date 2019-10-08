

import { HttpOpts, MsgBody, BotResponseBody, BotSource } from './common';


interface QA {
    knowledge_id: number;
    standard_question: string;
    question: string;
}
interface Bot {
    qa: QA;
}
interface Response {
    msg_body: MsgBody;
    similar_response: SimilarResponse[];
    enable_evaluate: boolean;
    delay_ts: number;
}

interface SimilarResponse {
    url: string;
    source: BotSource;
    detail: Bot;
}

// 查询历史消息 interface
interface GetMsgHistoryBody {
    direction: string;
    msg_id: string;
    user_id: string;
    num: number;
}

interface GetMsgHistoryResponse {
    msg: Msg[];
    has_more: boolean;
}

interface Msg {
    direction: string;
    sender_info: SenderInfo;
    msg_type:
    | "TEXT" // 文本消息
    | "IMAGE" // 图文消息
    | "VOICE" // 音频消息
    | "NOTICE" // 通知消息
    | "FILE" // 文件消息
    | "SHARELINK" // 分享链接消息
    | "VIDEO" // 视频消息
    | "CUSTOM" // 用户自定义消息
    | "PUBLIC_EVENT" // 微信公众号的事件消息
    | "NONSUPPORT" // 不支持的消息类型
    | "EVENT" // 事件孝
    | "CALLBACK_NOTICE";
    extra: string;
    msg_id: string;
    msg_ts: string;
    user_info: UserInfo;
    msg_body: MsgBody;
}

interface SenderInfo {
    avatar_url: string;
    nickname: string;
    real_name: string;
}

interface UserInfo {
    avatar_url: string;
    nickname: string;
}

// 获取机器人回复 interface
interface BotResponseResponse {
    is_dispatch: boolean;
    suggested_response: SuggestedResponse[];
    msg_id: string;
}

interface SuggestedResponse {
    is_send: boolean;
    bot: Bot;
    source: BotSource;
    score: number;
    response: Response[];
    quick_reply: string[];
}

// 获取关键字机器人回复 interface
interface KeywordBotResponse {
    is_dispatch: boolean;
    msg_id: string;
    keyword_suggested_response: KeywordSuggestedResponse[];
}

interface KeywordSuggestedResponse {
    is_send: boolean;
    score: number;
    response: Response[];
    keyword: Keyword;
    quick_reply: string[];
}

interface Keyword {
    keyword_id: number;
    keyword: string;
}

// 获取任务机器人回复 interface

interface TaskBotResponse {
    is_dispatch: boolean;
    msg_id: string;
    task_suggested_response: TaskSuggestedResponse[];
}

interface TaskSuggestedResponse {
    score: number;
    is_send: boolean;
    task: Task;
    response: Response[];
    quick_reply: string[];
}


interface Task {
    block_type:
    | "BLOCK_TYPE_DEFAULT"
    | "BLOCK_TYPE_MESSAGE" // 消息单元
    | "BLOCK_TYPE_ASK" // 询问单元
    | "BLOCK_TYPE_HIDE" // 隐藏单元
    | "BLOCK_TYPE_LINK" // 跳转单元
    | "BLOCK_TYPE_ADVANCE_INTERFACE" // 高级接口
    | "BLOCK_TYPE_INTERFACE" // 接口单元
    | "BLOCK_TYPE_CALCULATE" // 运算单元
    | "BLOCK_TYPE_COLLECT"; // 收集单元
    block_id: number;
    task_id: number;
    block_name: string;
    entities: Entity[];
    task_name: string;
    robot_id: number;
}

interface Entity {
    idx_end: number;
    name: string;
    idx_start: number;
    value: string;
    seg_value: string;
    type: string;
    desc: string;
}

// 获取问答机器人回复 interface
interface QABotResponse {
    is_dispatch: boolean;
    msg_id: string;
    qa_suggested_response: QASuggestedResponse[];
}

interface QASuggestedResponse {
    qa: QA;
    is_send: boolean;
    score: number;
    response: Response[];
    quick_reply: string[];
}

// 接收用户发的消息 interface
interface ReceiveUserMessageBody {
    msg_body: MsgBody;
    third_msg_id: string;
    user_id: string;
    extra: string;
}

interface ReceiveUserMessageResponse {
    msg_id: string;
}

// 同步发给用户的消息 interface
interface SyncMessageBody {
    msg_body: MsgBody;
    extra: string;
    user_id: string;
    msg_ts: string;
}
interface SyncMessageResponse {
    msg_id: string;
}
export declare namespace Dialogue {
    /**
	 * 查询历史消息
	 * @param {GetMsgHistoryBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type GetMsgHistory = (body: GetMsgHistoryBody, options: HttpOpts) => Promise<GetMsgHistoryResponse>;
    /**
	 * 获取机器人回复
	 * @param {BotResponseBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type GetBotResponse = (body: BotResponseBody, options: HttpOpts) => Promise<BotResponseResponse>;
    /**
	 * 获取关键机器人回复
	 * @param {BotResponseBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type GetKeywordResponse = (body: BotResponseBody, options: HttpOpts) => Promise<KeywordBotResponse>;
    /**
	 * 获取任务机器人回复
	 * @param {BotResponseBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type GetTaskResponse = (body: BotResponseBody, options: HttpOpts) => Promise<TaskBotResponse>;
    /**
	 * 获取问答机器人回复
	 * @param {BotResponseBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type GetQaResponse = (body: BotResponseBody, options: HttpOpts) => Promise<QABotResponse>;
    /**
	 * 接收用户发的消息
	 * @param {ReceiveUserMessageBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type ReceiveMessage = (body: ReceiveUserMessageBody, options: HttpOpts) => Promise<ReceiveUserMessageResponse>;
    /**
	 * 同步发给用户的消息
	 * @param {SyncMessageBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type SyncMessage = (body: SyncMessageBody, options: HttpOpts) => Promise<SyncMessageResponse>;
}
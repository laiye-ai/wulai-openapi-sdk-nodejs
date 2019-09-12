import { Agent } from "http";
import { CreateUserParams } from "./types/createUser";
import { CreateUserAttributeParams } from "./types/userAttributeCreate";
import {
	ListUserAttributeParams,
	ListUserAttributeResult
} from "./types/userAttributeList";
import { BotResponseResult } from "./types/getBotResponse";
import { KeywordBotResponseResult } from "./types/getKeywordBotResponse";
import { QABotResponseResult } from "./types/getQAResponse";
import { BotResponseParams } from "./types/botResponseParams";
import {
	GetMsgHistoryParams,
	GetMsgHistoryResult
} from "./types/getHistoryRecord";
import { MsgBody, BotSource } from "./types/common";
import { TaskBotResponseResult } from "./types/getTaskBotResponse";
import {
	SyncUserMessageParams,
	SyncUserMessageResult
} from "./types/syncUserMessage";
import {
	ReceiveUserMessageParams,
	ReceiveUserMessageResult
} from "./types/receiveUserMessage";
import { Configuration } from "log4js";

type Action =
	| "userCreate"
	| "userAttributeCreate"
	| "userAttributeList"
	| "getHistoryRecord"
	| "getBotResponse"
	| "getKeywordBotResponse"
	| "getTaskBotResponse"
	| "getQABotResponse"
	| "receiveUserMessage"
	| "syncUserMessage";

type HttpOpts = {
	headers: object;
	timeout: number;
	agent: Agent;
	beforeRequest: Function;
	compression: boolean;
	maxRetry: number;
};
type LogConfig = {
	stdout: boolean,
	fileout: boolean,
	filename: string
}
type Method = "POST" | "GET" | "DELETE" | "PUT"
export = Client;

declare class Client {
	constructor(config: Client.Config);
	/**
	 * 日志配置
	 *
	 * @static
	 * @memberof Client
	 */
	logConfig: (config: LogConfig) => void;
	/**
	 * 创建用户
	 * @param {CreateUserParams} params post body
	 * @param {HttpOpts} options http options
	 */
	createUser: (params: CreateUserParams, options: HttpOpts) => Promise<{}>;
	/**
	 * 给用户添加属性值
	 * @param {CreateUserAttributeParams} params post body
	 * @param {HttpOpts} options http options
	 */
	createUserAttribute: (
		params: CreateUserAttributeParams,
		options: HttpOpts
	) => Promise<{}>;
	/**
	 * 获取用户属性列表
	 * @param {ListUserAttributeParams} params post body
	 * @param {HttpOpts} options http options
	 */
	listUserAttribute: (
		params: ListUserAttributeParams,
		options: HttpOpts
	) => Promise<ListUserAttributeResult>;
	/**
	 * 查询历史消息
	 * @param {GetMsgHistoryParams} params post body
	 * @param {HttpOpts} options http options
	 */
	getMsgHistory: (
		params: GetMsgHistoryParams,
		options: HttpOpts
	) => Promise<GetMsgHistoryResult>;
	/**
	 * 获取机器人回复
	 * @param {BotResponseParams} params post body
	 * @param {HttpOpts} options http options
	 */
	getBotResponse: (params: BotResponseParams, options: HttpOpts) => Promise<BotResponseResult>;
	/**
	 * 获取关键机器人回复
	 * @param {BotResponseParams} params post body
	 * @param {HttpOpts} options http options
	 */
	getKeywordResponse: (
		params: BotResponseParams,
		options: HttpOpts
	) => Promise<KeywordBotResponseResult>;
	/**
	 * 获取任务机器人回复
	 * @param {BotResponseParams} params post body
	 * @param {HttpOpts} options http options
	 */
	getTaskResponse: (
		params: BotResponseParams,
		options: HttpOpts
	) => Promise<TaskBotResponseResult>;
	/**
	 * 获取问答机器人回复
	 * @param {BotResponseParams} params post body
	 * @param {HttpOpts} options http options
	 */
	getQaResponse: (
		params: BotResponseParams,
		options: HttpOpts
	) => Promise<QABotResponseResult>;
	/**
	 * 接收用户发的消息
	 * @param {ReceiveUserMessageParams} params post body
	 * @param {HttpOpts} options http options
	 */
	receiveMessage: (
		params: ReceiveUserMessageParams,
		options: HttpOpts
	) => Promise<ReceiveUserMessageResult>;
	/**
	 * 同步发给用户的消息
	 * @param {SyncUserMessageParams} params post body
	 * @param {HttpOpts} options http options
	 */
	syncMessage: (
		params: SyncUserMessageParams,
		options: HttpOpts
	) => Promise<SyncUserMessageResult>;
	/**
	 * CommonRequest
	 *
	 * @memberof Client
	 */
	request: (method: Method, url: string, query: object, body: object, options: HttpOpts) => Promise<any>;
}
declare namespace Client {
	export interface Config {
		endpoint: string;
		apiVersion: "v2";
		pubkey: string;
		secret: string;
		options: HttpOpts;
		debug: boolean;
	}
}
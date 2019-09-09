import { Agent } from "http";
import { UserCreateParams } from "./types/userCreate";
import { UserAttributeCreateParams } from "./types/userAttributeCreate";
import {
  UserAttributeListParams,
  UserAttributeValueResult
} from "./types/userAttributeList";
import { BotResponseResult } from "./types/getBotResponse";
import { KeywordBotResponseResult } from "./types/getKeywordBotResponse";
import { QABotResponseResult } from "./types/getQAResponse";
import { BotResponseParams } from "./types/botResponseParams";
import {
  GetHistoryRecordParams,
  GetHistoryRecordResult
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

export = Client;

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
  method: "POST";
  data: string | Buffer;
  headers: object;
  timeout: number;
  agent: Agent;
  beforeRequest: Function;
  compression: boolean;
  maxRetry: number;
};
type LogOptions = {
  dir: string,
  configure: {
    appenders: Object,
    categories: {
      default: Object,
    }
  }
}
declare class Client {
  constructor(config: {
    endpoint: string;
    apiVersion: "v2";
    pubkey: string;
    secret: string;
    options: HttpOpts;
    debug: boolean;
  });
  /**
   * 日志配置
   *
   * @static
   * @memberof Client
   */
  static LoggerConfig: (debug: boolean, options: LogOptions) => void;
  /**
   * 创建用户
   * @param {UserCreateParams} params post body
   * @param {HttpOpts} options http options
   */
  userCreate: (params: UserCreateParams, options: HttpOpts) => Promise<{}>;
  /**
   * 给用户添加属性值
   * @param {UserAttributeCreateParams} params post body
   * @param {HttpOpts} options http options
   */
  userAttributeCreate: (
    params: UserAttributeCreateParams,
    options: HttpOpts
  ) => Promise<{}>;
  /**
   * 获取用户数户型列表
   * @param {UserAttributeListParams} params post body
   * @param {HttpOpts} options http options
   */
  userAttributeList: (
    params: UserAttributeListParams,
    options: HttpOpts
  ) => Promise<UserAttributeValueResult>;
  /**
   * 查询历史消息
   * @param {GetHistoryRecordParams} params post body
   * @param {HttpOpts} options http options
   */
  getHistoryRecord: (
    params: GetHistoryRecordParams,
    options: HttpOpts
  ) => Promise<GetHistoryRecordResult>;
  /**
   * 获取机器人回复
   * @param {BotResponseParams} params post body
   * @param {HttpOpts} options http options
   */
  getBotResponse: (params: BotResponseParams) => Promise<BotResponseResult>;
  /**
   * 获取关键机器人回复
   * @param {BotResponseParams} params post body
   * @param {HttpOpts} options http options
   */
  getKeywordBotResponse: (
    params: BotResponseParams,
    options: HttpOpts
  ) => Promise<KeywordBotResponseResult>;
  /**
   * 获取任务机器人回复
   * @param {BotResponseParams} params post body
   * @param {HttpOpts} options http options
   */
  getTaskBotResponse: (
    params: BotResponseParams,
    options: HttpOpts
  ) => Promise<TaskBotResponseResult>;
  /**
   * 获取问答机器人回复
   * @param {BotResponseParams} params post body
   * @param {HttpOpts} options http options
   */
  getQABotResponse: (
    params: BotResponseParams,
    options: HttpOpts
  ) => Promise<QABotResponseResult>;
  /**
   * 接收用户发的消息
   * @param {ReceiveUserMessageParams} params post body
   * @param {HttpOpts} options http options
   */
  receiveUserMessage: (
    params: ReceiveUserMessageParams,
    options: HttpOpts
  ) => Promise<ReceiveUserMessageResult>;
  /**
   * 同步发给用户的消息
   * @param {SyncUserMessageParams} params post body
   * @param {HttpOpts} options http options
   */
  syncUserMessage: (
    params: SyncUserMessageParams,
    options: HttpOpts
  ) => Promise<SyncUserMessageResult>;
  /**
   * common request method
   * @param {Action} action request action string
   * @param {Object} params request body
   * @param {HttpOpts} options http options
   */
  request: (action: Action, params: Object, options: HttpOpts) => Promise<any>;
}

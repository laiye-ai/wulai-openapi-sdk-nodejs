export = Client;

type Action =
  | "userCreate"
  | "userAttributeCreate"
  | "userAttributeList"
  | "getHistoryRecord"
  | "getBotResponse"
  | "getKeywordBotResponse"
  | "getTaskBotResponse"
  | "getQABotResponse";

declare class Client {
  constructor(config: Client.Config);
  /**
   * 创建用户
   * @param {UserCreateParams} params post body
   */
  userCreate: (params: UserCreateParams) => Promise<{}>;
  /**
   * 给用户添加属性值
   * @param {UserAttributeCreateParams} params post body
   */
  userAttributeCreate: (params: UserAttributeCreateParams) => Promise<{}>;
  /**
   * 获取用户数户型列表
   * @param {UserAttributeListParams} params post body
   */
  userAttributeList: (
    params: UserAttributeListParams
  ) => Promise<UserAttributeValueResult>;
  /**
   * 查询历史消息
   * @param {GetHistoryRecordParams} params post body
   */
  getHistoryRecord: (
    params: GetHistoryRecordParams
  ) => Promise<GetHistoryRecordResult>;
  /**
   * 获取机器人回复
   * @param {BotResponseParams} params post body
   */
  getBotResponse: (params: BotResponseParams) => Promise<BotResponseResult>;
  /**
   * 获取关键机器人回复
   * @param {BotResponseParams} params post body
   */
  getKeywordBotResponse: (
    params: BotResponseParams
  ) => Promise<KeywordBotResponseResult>;
  /**
   * 获取任务机器人回复
   * @param {BotResponseParams} params post body
   */
  getTaskBotResponse: (
    params: BotResponseParams
  ) => Promise<TaskBotResponseResult>;
  /**
   * 获取问答机器人回复
   * @param {BotResponseParams} params post body
   */
  getQABotResponse: (params: BotResponseParams) => Promise<QABotResponseResult>;
  /**
   * common request method
   * @param {Action} action request action string
   * @param {Object} params request body
   */
  request: (action: Action, params: Object) => Promise<any>;
}
declare namespace Client {
  export interface Config {
    endpoint: string;
    apiVersion: "v2";
    pubkey: string;
    secret: string;
  }
}

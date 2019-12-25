import { Agent } from "http";
import { MsgBody, BotResponseBody, BotSource } from './core/common';
import SdkBase from './core/sdkBase'

export = Client
declare class Client {
  constructor(config: Client.Config);
  /**
	 * 日志配置
	 */
  logConfig(config: Client.LogConfig): void;
  /**
   * CommonRequest
   */
  request(
    method: Client.Method,
    url: string,
    query: object,
    body: object,
    options: Client.HttpOpts): Promise<any>;
  // 对话类API
  /**
   * 查询历史消息
   */
  getMsgHistory(body: Dialogue.Types.GetMsgHistoryRequest, options: Client.HttpOpts): Promise<Dialogue.Types.GetMsgHistoryResponse>;
  /**
   * 获取机器人回复
   */
  getBotResponse(body: BotResponseBody, options: Client.HttpOpts): Promise<Dialogue.Types.BotResponseResponse>;
  /**
   * 获取关键机器人回复
   * @param {BotResponseBody} body post body
   * @param {HttpOpts} options http options
   */
  getKeywordResponse(body: BotResponseBody, options: Client.HttpOpts): Promise<Dialogue.Types.KeywordBotResponse>;
  /**
   * 获取任务机器人回复
   */
  getTaskResponse(body: BotResponseBody, options: Client.HttpOpts): Promise<Dialogue.Types.TaskBotResponse>;
  /**
   * 获取问答机器人回复
   */
  getQaResponse(body: BotResponseBody, options: Client.HttpOpts): Promise<Dialogue.Types.QABotResponse>;
  /**
   * 接收用户发的消息
   */
  receiveMessage(body: Dialogue.Types.ReceiveUserMessageRequest, options: Client.HttpOpts): Promise<Dialogue.Types.ReceiveUserMessageResponse>;
  /**
   * 同步发给用户的消息
   */
  syncMessage(body: Dialogue.Types.SyncMessageRequest, options: Client.HttpOpts): Promise<Dialogue.Types.SyncMessageResponse>;

  // 知识点类API
  /**
	 * 获取相似问列表
	 */
  listSimilarQuestions(body: Knowledge.Types.ListSimilarQuestionsRequest, options: Client.HttpOpts): Promise<Knowledge.Types.ListSimilarQuestionsResponse>;
  /**
   * 删除相似问
   */
  deleteSimilarQuestion(body: Knowledge.Types.DeleteSimilarQuestionRequest, options: Client.HttpOpts): Promise<{}>;
  /**
   * 更新属性组
   */
  updateUserAttributeGroup(body: Knowledge.Types.UpdateUserAttributeGroupRequest, options: Client.HttpOpts): Promise<Knowledge.Types.UpdateUserAttributeGroupResponse>;
  /**
   * 创建相似问
   */
  createSimilarQuestion(body: Knowledge.Types.CreateSimilarQuestionRequest, options: HttpOpts): Promise<Knowledge.Types.CreateSimilarQuestionRequest>;
  /**
   * 更新相似问
   */
  updateSimilarQuestion(body: Knowledge.Types.UpdateSimilarQuestionRequest, options: Client.HttpOpts): Promise<Knowledge.Types.UpdateSimilarQuestionRequest>;
  /**
   * 查询知识点列表
   */
  listKnowledgeItems(body: Knowledge.Types.ListKnowledgeItemsRequest, options: Client.HttpOpts): Promise<Knowledge.Types.ListKnowledgeItemsResponse>;
  /**
   * 创建知识点
  */
  createKnowledgeTagKnowledge(body: Knowledge.Types.CreateKnowledgeTagKnowledgeRequest, options: Client.HttpOpts): Promise<Knowledge.Types.CreateKnowledgeTagKnowledgeResponse>;
  /**
   * 更新知识点
   */
  updateKnowledge(body: Knowledge.Types.UpdateKnowledgeRequest, options: Client.HttpOpts): Promise<Knowledge.Types.UpdateKnowledgeResponse>
  /**
   * 查询知识点分类列表
   */
  listKnowledgeTags(body: Knowledge.Types.ListKnowledgeTagsRequest, options: Client.HttpOpts): Promise<Knowledge.Types.ListKnowledgeTagsResponse>;
  /**
   * 删除属性组回复
   */
  deleteUserAttributeGroupAnswer(body: Knowledge.Types.DeleteUserAttributeGroupAnswerRequest, options: Client.HttpOpts): Promise<{}>;
  /**
   * 创建属性组回复
   */
  createUserAttributeGroupAnswer(body: Knowledge.Types.CreateUserAttributeGroupAnswerRequest, options: Client.HttpOpts): Promise<Knowledge.Types.CreateUserAttributeGroupAnswerResponse>;
  /**
   * 更新属性组回复
   */
  updateUserAttributeGroupAnswer(body: Knowledge.Types.UpdateUserAttributeGroupAnswerRequest, options: Client.HttpOpts): Promise<Knowledge.Types.UpdateUserAttributeGroupAnswerResponse>;
  /**
   * 查询属性组及属性列表
  */
  listUserAttributeGroupItems(body: Knowledge.Types.ListUserAttributeGroupItemsRequest, options: Client.HttpOpts): Promise<Knowledge.Types.ListUserAttributeGroupItemsResponse>;
  /**
   * 查询属性组回复列表
  */
  listUserAttributeGroupAnswers(body: Knowledge.Types.ListUserAttributeGroupAnswersRequest, options: Client.HttpOpts): Promise<LKnowledge.Types.istUserAttributeGroupAnswersResponse>;
  /**
   * 创建属性组
  */
  createUserAttributeGroup(body: Knowledge.Types.CreateUserAttributeGroupRequest, options: Client.HttpOpts): Promise<Knowledge.Types.CreateUserAttributeGroupResponse>

  // 统计类API
  /**
	 * 查询问答召回数统计列表（日报）
	*/
  listQARecallDailyStats(body: Statistics.Types.ListQARecallDailyStatsRequest, options: Client.HttpOpts): Promise<Statistics.Types.ListQARecallDailyStatsResponse>
  /**
   * 添加用户满意度评价
  */
  createQASatisfaction(body: Statistics.Types.CreateQASatisfactionRequest, options: Client.HttpOpts): Promise<{}>
  /** 
   * 查询问答召回数统计列表（知识点粒度，日报）
  */
  listQARecallDailyKnowledgeStats(body: Statistics.Types.ListQARecallDailyKnowledgeStatsRequest, options: Client.HttpOpts): Promise<Statistics.Types.ListQARecallDailyKnowledgeStatsResponse>
  /** 
   * 查询问答满意度评价统计列表（知识点粒度，日报）
  */
  listQASatisfactionDailyKnowledgeStats(body: Statistics.Types.ListQASatisfactionDailyKnowledgeStatsRequest, options: Client.HttpOpts): Promise<Statistics.Types.ListQASatisfactionDailyKnowledgeStatsResponse>
    
  // 用户类API
  /**
   * 创建用户
   */
  createUser(body: User.Types.CreateUserRequest, options: Client.HttpOpts): Promise<{}>;
  /**
   * 给用户添加属性值
   */
  createUserAttribute(body: User.Types.CreateUserAttributeRequest, options: Client.HttpOpts): Promise<{}>;
  /**
   * 获取用户属性列表
   */
  listUserAttribute(body: User.Types.ListUserAttributeRequest, options: Client.HttpOpts): Promise<User.Types.ListUserAttributeResponse>;

  // 词库管理类API
  /**
   * 查询全部试题概要
   */
  listEntities(body: Dictionary.Types.ListEntitiesRequest, options: Client.HttpOpts): Promise<Dictionary.Types.ListEntitiesResponse>
  /** 
   * 删除专有词汇
  */
  deleteTerm(body: Dictionary.Types.DeleteTermRequest, options: Client.HttpOpts): Promise<{}>
  /**
   * 创建专有词汇
   */
  createTerm(body: Dictionary.Types.CreateTermRequest, options: Client.HttpOpts): Promise<Dictionary.Types.CreateTermResponse>
  /**
   * 更新专有词汇
   */
  updateTerm(body: Dictionary.Types.UpdateTermRequest, options: Client.HttpOpts): Promise<Dictionary.Types.UpdateTermResponse>
  /** 
   * 查询专有词汇列表
  */
  listTerm(body: Dictionary.Types.ListTermRequest, options: Client.HttpOpts): Promise<Dictionary.Types.ListTermResponse>
  /** 
   * 创建意图实体值相似说法
  */
  createIntentEntityValue(body: Dictionary.Types.CreateIntentEntityValueRequest, options: Client.HttpOpts): Promise<Dictionary.Types.CreateIntentEntityValueResponse>
  /** 
   * 创建意图实体
  */
  createIntentEntity(body: Dictionary.Types.CreateIntentEntityRequest, options: Client.HttpOpts): Promise<Dictionary.Types.CreateIntentEntityResponse>
  /** 
   * 删除枚举实体值
  */
  deleteEnumerationEntityValue(body: Dictionary.Types.DeleteEnumerationEntityValueRequest, options: Client.HttpOpts): Promise<{}>
  /** 
   * 查询一个实体详情
  */
  getEntity(body: Dictionary.Types.GetEntityRequest, options: Client.HttpOpts): Promise<Dictionary.Types.GetEntityResponse>
  /** 
   * 创建枚举实体值
  */
  createEnumerationEntityValue(body: Dictionary.Types.CreateEnumerationEntityValueRequest, options: Client.HttpOpts): Promise<Dictionary.Types.CreateEnumerationEntityValueResponse>
  /** 
   * 删除实体
  */
  deleteEntity(body: Dictionary.Types.DeleteEntityRequest, options: Client.HttpOpts): Promise<{}>
  /** 
   * 创建枚举实体
  */
  createEnumerationEntity(body: Dictionary.Types.CreateEnumerationEntityRequest, options: Client.HttpOpts): Promise<Dictionary.Types.CreateEnumerationEntityResponse>
  /** 
   * 删除意图实体值相似问说法
  */
  deleteIntentEntityValue(body: Dictionary.Types.DeleteIntentEntityValueRequest, options: Client.HttpOpts): Promise<{}>
}


declare namespace Client {
  export type LogConfig = {
    format: string,
    stdout: boolean,
    fileout: boolean,
    filename: string
  }
  export type Method = "POST" | "GET" | "DELETE" | "PUT";

  export type HttpOpts = {
    headers: object;
    timeout: number;
    agent: Agent;
    beforeRequest: Function;
    compression: boolean;
    maxRetry: number;
  };

  export interface Config {
    endpoint: string;
    apiVersion: "v2";
    pubkey: string;
    secret: string;
    options: HttpOpts;
    debug: boolean;
  }
}
// 对话类API-类型声明
declare namespace Dialogue {
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
    extra: string;
    answer_id: number | string
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
  interface Keyword {
    keyword_id: number;
    keyword: string;
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
  export interface SimilarResponse {
    url: string;
    source: BotSource;
    detail: Bot;
  }
  export interface GetMsgHistoryRequest {
    direction: string;
    msg_id: string;
    user_id: string;
    num: number;
  }
  export interface GetMsgHistoryResponse {
    msg: Msg[];
    has_more: boolean;
  }
  export interface BotResponseResponse {
    is_dispatch: boolean;
    suggested_response: SuggestedResponse[];
    msg_id: string;
  }
  export interface SuggestedResponse {
    is_send: boolean;
    bot: Bot;
    source: BotSource;
    score: number;
    response: Response[];
    quick_reply: string[];
  }
  export interface KeywordBotResponse {
    is_dispatch: boolean;
    msg_id: string;
    keyword_suggested_response: KeywordSuggestedResponse[];
  }
  export interface KeywordSuggestedResponse {
    is_send: boolean;
    score: number;
    response: Response[];
    keyword: Keyword;
    quick_reply: string[];
  }
  export interface TaskBotResponse {
    is_dispatch: boolean;
    msg_id: string;
    task_suggested_response: TaskSuggestedResponse[];
  }
  export interface TaskSuggestedResponse {
    score: number;
    is_send: boolean;
    task: Task;
    response: Response[];
    quick_reply: string[];
  }
  export interface QABotResponse {
    is_dispatch: boolean;
    msg_id: string;
    qa_suggested_response: QASuggestedResponse[];
  }
  export interface QASuggestedResponse {
    qa: QA;
    is_send: boolean;
    score: number;
    response: Response[];
    quick_reply: string[];
  }
  export interface ReceiveUserMessageRequest {
    msg_body: MsgBody;
    third_msg_id: string;
    user_id: string;
    extra: string;
  }
  export interface ReceiveUserMessageResponse {
    msg_id: string;
  }
  export interface SyncMessageRequest {
    msg_body: MsgBody;
    extra: string;
    user_id: string;
    msg_ts: string;
    bot: Bot;
    answer_id: number;
  }
  export interface SyncMessageResponse {
    msg_id: string;
  }
  export import Types = Dialogue;
}

// 知识点类API-类型声明
declare namespace Knowledge {
  interface Filter {
    knowledge_id: string;
    user_attribute_group_id: string;
  }
  interface SimilarQuestion {
    knowledge_id: string;
    question: string;
    id: string;
  }
  interface KnowledgeCreate {
    status: boolean;
    standard_question: string;
    respond_all: boolean;
    id: string;
    maintained_by_user_attribute_group: boolean;
  }
  interface UserAttributeGroupBodyItem {
    user_attribute_user_attribute_value: UserAttributeUserAttributeValue[];
    user_attribute_group: UserAttributeGroup;
  }
  interface UserAttributeGroup {
    id: string;
    name: string;
  }
  interface UserAttributeUserAttributeValue {
    user_attribute: UserAttribute;
    user_attribute_value: UserAttributeValue;
  }
  interface UserAttribute {
    id: string;
  }
  interface UserAttributeValue {
    name: string;
  }
  interface KnowledgeTagKnowledgeRes {
    knowledge: KnowledgeClass;
    knowledge_tag_id: string;
  }
  interface UserAttributeGroupResponseItem {
    user_attribute_user_attribute_values: UserAttributeUserAttributeResValue[];
    user_attribute_group: UserAttributeRes;
  }
  interface UserAttributeRes {
    id: string;
    name: string;
  }
  interface UserAttributeUserAttributeResValue {
    user_attribute: UserAttributeClass;
    user_attribute_value: UserAttributeRes;
  }
  interface UserAttributeClass {
    value_type: string;
    use_in_user_attribute_group: boolean;
    type: string;
    id: string;
    name: string;
  }
  interface KnowledgeItem {
    knowledge_tag: KnowledgeTag;
    similar_questions: SimilarQuestion[];
    knowledge: KnowledgeClass;
  }
  interface KnowledgeClass {
    status: boolean;
    update_time: string;
    maintained_by_user_attribute_group: boolean;
    standard_question: string;
    create_time: string;
    respond_all: boolean;
    id: string;
  }

  interface KnowledgeTag {
    parent_knowledge_tag_id: string;
    id: string;
    name: string;
  }
  interface UserAttributeGroupAnswer {
    answer: Answer;
    user_attribute_group_id: string;
  }
  interface Answer {
    knowledge_id: string;
    msg_body: MsgBody;
    id: string;
  }
  interface UserAttributeGroupItem {
    user_attribute_user_attribute_values: UserAttributeUserAttributeValueRes[];
    user_attribute_group: UserAttributeGroup;
  }
  export interface CreateSimilarQuestionRequest {
    similar_question: SimilarQuestion;
  }
  export interface UpdateSimilarQuestionRequest {
    similar_question: SimilarQuestion;
  }
  export interface ListKnowledgeItemsRequest {
    page: number;
    page_size: number;
  }
  export interface ListKnowledgeItemsResponse {
    page_count: number;
    knowledge_items: KnowledgeItem[];
  }
  export interface CreateKnowledgeTagKnowledgeRequest {
    knowledge_tag_knowledge: KnowledgeTagKnowledgeBody;
  }
  export interface KnowledgeTagKnowledgeBody {
    knowledge: KnowledgeCreate;
    knowledge_tag_id: string;
  }
  export interface UpdateUserAttributeGroupResponse {
    user_attribute_group_item: UserAttributeGroupResponseItem;
  }
  export interface CreateUserAttributeGroupResponse {
    user_attribute_group_item: UserAttributeGroupResponseItem;
  }
  export interface CreateKnowledgeTagKnowledgeResponse {
    knowledge_tag_knowledge: KnowledgeTagKnowledgeRes;
  }
  export interface ListKnowledgeTagsRequest {
    page: number;
    page_size: number;
    parent_k_tag_id: string;
  }
  export interface ListKnowledgeTagsResponse {
    knowledge_tags: KnowledgeTag[];
    page_count: number;
  }
  export interface UpdateKnowledgeRequest {
    knowledge: KnowledgeCreate;
  }
  export interface UpdateKnowledgeResponse {
    knowledge: KnowledgeClass;
  }
  export interface DeleteUserAttributeGroupAnswerRequest {
    id: string;
  }
  export interface CreateUserAttributeGroupAnswerRequest {
    user_attribute_group_answer: UserAttributeGroupAnswer;
  }
  export interface UpdateUserAttributeGroupAnswerRequest {
    user_attribute_group_answer: UserAttributeGroupAnswer;
  }
  export interface CreateUserAttributeGroupAnswerResponse extends CreateUserAttributeGroupAnswerRequest { }
  export interface UpdateUserAttributeGroupAnswerResponse extends UpdateUserAttributeGroupAnswerRequest { }
  export interface ListUserAttributeGroupItemsRequest {
    page: number;
    page_size: number;
  }
  export interface ListUserAttributeGroupItemsResponse {
    page_count: number;
    user_attribute_group_items: UserAttributeGroupItem[];
  }
  export interface ListSimilarQuestionsRequest {
    knowledge_id: string;
    page: number;
    page_size: number;
    similar_question_id: string;
  }
  export interface ListSimilarQuestionsResponse {
    similar_questions: SimilarQuestion[];
    page_count: number;
  }
  export interface DeleteSimilarQuestionRequest {
    id: string;
  }
  export interface UpdateUserAttributeGroupRequest {
    user_attribute_group_item: UserAttributeGroupBodyItem;
  }
  export interface CreateUserAttributeGroupRequest {
    user_attribute_group_item: UserAttributeGroupBodyItem;
  }
  export interface UserAttributeUserAttributeValueRes {
    user_attribute: UserAttributeClass;
    user_attribute_value: UserAttributeGroup;
  }
  export interface ListUserAttributeGroupAnswersRequest {
    filter: Filter;
    page: number;
    page_size: number;
  }
  export interface ListUserAttributeGroupAnswersResponse {
    user_attribute_group_answers: UserAttributeGroupAnswer[];
    page_count: number;
  }
  export interface UserAttributeGroupAnswer {
    answer: Answer;
    user_attribute_group_id: string;
  }
  export interface Answer {
    knowledge_id: string;
    msg_body: MsgBody;
    id: string;
  }
  export import Types = Knowledge
}

// 统计类API-类型声明
declare namespace Statistics {
  export interface ListQARecallDailyStatsRequest {
    start_date: string;
    end_date: string;
  }
  export interface ListQARecallDailyStatsResponse {
    qa_recall_daily_stats: QARecallDailyStat[];
  }
  export interface QARecallDailyStat {
    date: string;
    message_stats: MessageStats;
    qa_recall_stats: QARecallStats;
  }
  export interface MessageStats {
    receive_count: number;
  }
  export interface QARecallStats {
    recall_count: number;
  }
  export interface CreateQASatisfactionRequest {
    satisfaction: "DEFAULT_SATISFACTION" | "DEFAULT_SATISFACTION" | "THUMB_UP" | "BAD_ANSWER" | "WRONG_ANSWER" | "REPORT";
    msg_id: string;
    user_id: string;
    bot_id: BotID;
  }
  export interface BotID {
    knowledge_id: string;
  }
  export interface ListQARecallDailyKnowledgeStatsRequest {
    end_date: string;
    page: number;
    page_size: number;
    start_date: string;
  }
  export interface ListQARecallDailyKnowledgeStatsResponse {
    qa_recall_knowledge_stats: QARecallKnowledgeStat[];
    page_count: number;
  }
  export interface QARecallKnowledgeStat {
    knowledge_id: number;
    standard_question: string;
    qa_recall_stats: QARecallStats;
  }
  export interface QARecallStats {
    recall_count: number;
  }
  export interface ListQASatisfactionDailyKnowledgeStatsRequest {
    end_date: string;
    page: number;
    page_size: number;
    start_date: string;
  }
  export interface ListQASatisfactionDailyKnowledgeStatsResponse {
    page_count: number;
    qa_satisfaction_knowledge_stats: QASatisfactionKnowledgeStat[];
  }
  export interface QASatisfactionKnowledgeStat {
    knowledge_id: number;
    satisfaction_stats: SatisfactionStats;
    standard_question: string;
  }
  export interface SatisfactionStats {
    thumb_up_count: number;
    wrong_answer_count: number;
    bad_answer_count: number;
  }
  export import Types = Statistics
}

// 用户类API-类型声明
declare namespace User {
  interface UserAttribute {
    value_type: string;
    use_in_user_attribute_group: boolean;
    type: string;
    id: string;
    name: string;
  }
  interface UserAttributeValue {
    id: string;
    name: string;
  }
  interface UserAttributeUserAttributeValue {
    user_attribute: UserAttribute;
    user_attribute_value: UserAttributeValue;
  }
  interface UserAttribute {
    id: string;
  }
  interface Filter {
    use_in_user_attribute_group: boolean;
  }
  export interface CreateUserRequest {
    nickname: string;
    avatar_url: string;
    user_id: string;
  }
  export interface CreateUserAttributeRequest {
    user_attribute_user_attribute_value: UserAttributeUserAttributeValue[];
    user_id: string;
  }
  export interface ListUserAttributeRequest {
    filter: Filter;
    page: number;
    page_size: number;
  }
  export interface ListUserAttributeResponse {
    page_count: number;
    user_attribute_user_attribute_values: UserAttributeUserAttributeValueRes[];
  }
  export interface UserAttributeUserAttributeValueRes {
    user_attribute: UserAttribute;
    user_attribute_value: UserAttributeValue[];
  }

  export import Types = User
}

// 词库管理类-类型声明
declare namespace Dictionary {
  interface Entity {
    type: 'LIST_ENTITY_TYPE_ERROR' | 'LIST_ENTITY_TYPE_SYSTEM' | 'LIST_ENTITY_TYPE_ENUMERATION' | 'LIST_ENTITY_TYPE_REGEX' | 'LIST_ENTITY_TYPE_INTENT'
    id: number
    name: string
  }
  interface EntityQuery extends Entity {
    value: {
      intent_entity_value: EntityValue
    }
  }
  interface Term {
    name: string
    id?: string
  }
  interface PageList {
    page: number,
    page_size: number
  }
  interface TermItem {
    term: Term
    synonyms?: string[]
  }
  interface EntityValue {
    synonyms: string[]
    standard_value: string
  }
  interface IntentEntity {
    id: number
    value: EntityValue
    name: string
  }
  interface IntentEntityNew {
    standard_value: string
    name: string
  }
  // 查询全部实体概要 请求数据
  export interface ListEntitiesRequest extends PageList {}
  // 查询全部实体概要 响应数据
  export interface ListEntitiesResponse {
    entities: Entity[]
  }
  // 删除专有词汇 请求数据
  export interface DeleteTermRequest {
    id: string
  }
  // 创建专有词汇 请求数据
  export interface CreateTermRequest {
    term_item: TermItem
  }
  // 创建专有词汇 响应数据
  export interface CreateTermResponse extends CreateTermRequest {}

  // 更新专有词汇 请求数据
  export interface UpdateTermRequest  {
    term_item: TermItem
  }
  // 更新专有词汇 响应数据
  export interface UpdateTermResponse extends UpdateTermRequest {}

  // 查询专有词汇列表 请求数据
  export interface ListTermRequest extends PageList {}
  // 查询专有词汇列表 响应数据
  export interface ListTermResponse extends CreateTermRequest {
    page_count: number
  }

  // 创建意图实体 请求数据
  export interface CreateIntentEntityRequest {
    intent_entity: IntentEntityNew
  }
  // 创建意图实体 响应数据
  export interface CreateIntentEntityResponse {
    intent_entity: IntentEntity
  }

  // 创建意图实体值相似说法 请求数据
  export interface CreateIntentEntityValueRequest {
    entity_id: number
    synonyms: string[]
  }
  // 创建意图实体值相似说法 响应数据
  export interface CreateIntentEntityValueResponse {
    intent_entity: IntentEntity
  }

  // 删除枚举实体值 请求数据
  export interface DeleteEnumerationEntityValueRequest {
    entity_id: string
    value: EntityValue
  }

  // 查询一个实体详情 请求数据
  export interface GetEntityRequest {
    id: number
  }
  // 查询一个实体详情 响应数据
  export interface GetEntityResponse {
    entity: EntityQuery
  }

  // 创建枚举实体值 请求数据
  export interface CreateEnumerationEntityValueRequest {
    entity_id: number
    value: EntityValue
  }
  // 创建枚举实体值 响应数据
  export interface CreateEnumerationEntityValueResponse {
    id: number
    name: string
    values: EntityValue[]
  }

  // 删除实体 请求数据
  export interface DeleteEntityRequest {
    id: number
  }

  // 创建枚举实体 请求数据
  export interface CreateEnumerationEntityRequest {
    enum_entity: {
      name: string
    }
  }
  // 创建枚举实体 响应数据
  export interface CreateEnumerationEntityResponse {
    enum_entity: {
      id: number
      name: string
      values: EntityValue[]
    }
  }
  // 删除意图实体值相似问说法
  export interface DeleteIntentEntityValueRequest {
    entity_id: number
    synonyms: string[]
  }
  export import Types = Dictionary
}
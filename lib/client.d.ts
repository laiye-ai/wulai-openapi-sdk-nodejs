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
  /** 
   * 给用户发消息
  */
  sendMessage(body: Dialogue.Types.SendMessageRequest, options: Client.HttpOpts): Promise<Dialogue.Types.SendMessageResponse>;
  /** 
   * 获取用户输入联想
  */
  getUserInputSug(body: Dialogue.Types.GetUserInputSugRequest, options: Client.HttpOpts): Promise<Dialogue.Types.GetUserInputSugResponse>;

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
   * 批量添加知识点列表
  */
  batchCreateKnowledgeItems(body: Knowledge.Types.BatchCreateKnowledgeItemsRequest, options: Client.HttpOpts): Promise<Knowledge.Types.BatchCreateKnowledgeItemsResponse>
  /**
   * 查询知识点分类列表
   */
  listKnowledgeTags(body: Knowledge.Types.ListKnowledgeTagsRequest, options: Client.HttpOpts): Promise<Knowledge.Types.ListKnowledgeTagsResponse>;
  /** 
   * 创建知识点分类
  */
  createKnowledgeTag(body: Knowledge.Types.CreateKnowledgeTagRequest, options: Client.HttpOpts): Promise<Knowledge.Types.CreateKnowledgeTagResponse>;
  /** 
   * 更新知识点分类
  */
  updateKnowledgeTag(body: Knowledge.Types.UpdateKnowledgeTagRequest, options: Client.HttpOpts): Promise<Knowledge.Types.UpdateKnowledgeTagResponse>;
  /** 
   * 删除知识点分类
  */
  deleteKnowledgeTag(body: Knowledge.Types.DeleteKnowledgeTagRequest, options: Client.HttpOpts): Promise<{}>
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

  // 任务类API
  /** 
   * 创建场景
  */
  createScene(body: Scene.Types.CreateSceneBody, options: Client.HttpOpts): Promise<Scene.Types.SceneBody>
  /** 
   * 更新场景
  */
  updateScene(body: Scene.Types.SceneBody, options: Client.HttpOpts): Promise<Scene.Types.SceneBody>
  /** 
   * 删除场景
  */
  deleteScene(body: Scene.Types.DeleteSceneBody, options: Client.HttpOpts): Promise<{}>
  /** 
   * 创建意图
  */
  createIntent(body: Scene.Types.CreateIntentRequest, options: Client.HttpOpts): Promise<Scene.Types.IntentResponse>
  /** 
   * 更新意图
  */
  updateIntent(body: Scene.Types.UpdateIntentRequest, options: Client.HttpOpts): Promise<Scene.Types.IntentResponse>
  /** 
   * 删除意图
  */
  deleteIntent(body: Scene.Types.DeleteRequest, options: Client.HttpOpts): Promise<{}>
  /** 
   * 查询意图列表
  */
  listIntents(body: { scene_id: string }, options: Client.HttpOpts): Promise<{ intents: Scene.Types.IntentResponse[] }>
  /** 
   * 更新意图状态
  */
  updateIntentStatus(body: Scene.Types.UpdateIntentStatusRequest, options: Client.HttpOpts): Promise<Scene.Types.UpdateIntentStatusResponse>
  /** 
   * 创建触发器
  */
  createIntentTrigger(body: Scene.Types.CreateIntentTriggerRequest, options: Client.HttpOpts): Promise<Scene.Types.CreateIntentTriggerResponse>
  /** 
   * 查询触发器列表
  */
  listIntentTriggers(body: Scene.Types.ListIntentTriggersRequest, options: Client.HttpOpts): Promise<Scene.Types.ListIntentTriggersResponse>
  /** 
   * 更新触发器
  */
  updateIntentTrigger(body: Scene.Types.UpdateIntentTriggerRequest, options: Client.HttpOpts): Promise<Scene.Types.UpdateIntentTriggerResponse>
  /** 
   * 删除触发器
  */
  deleteIntentTrigger(body: Scene.Types.DeleteRequest, options: Client.HttpOpts): Promise<{}>
  /** 
   * 创建词槽
  */
  createSlot(body: Scene.Types.CreateSlotRequest, options: Client.HttpOpts): Promise<Scene.Types.CreateSlotResponse>
  /** 
   * 更新词槽
  */
  updateSlot(body: Scene.Types.UpdateSlotRequest, options: Client.HttpOpts): Promise<Scene.Types.UpdateSlotResponse>
  /** 
   * 删除词槽
  */
  deleteSlot(body: Scene.Types.DeleteRequest, options: Client.HttpOpts): Promise<{}>
  /** 
   * 查询词槽
  */
  getSlot(body: Scene.Types.GetSlotRequest, options: Client.HttpOpts): Promise<Scene.Types.GetSlotResponse>
  /** 
   * 查询词槽列表
  */
  listSlots(body: Scene.Types.ListSlotsRequest, options: Client.HttpOpts): Promise<Scene.Types.ListSlotsResponse>
  /** 
   * 创建消息发送单元
  */
  createInformBlock(body: Scene.Types.CreateInformBlockRequest, options: Client.HttpOpts): Promise<Scene.Types.CreateInformBlockResponse>
  /** 
   * 更新消息发送单元
  */
  updateInformBlock(body: Scene.Types.UpdateInformBlockRequest, options: Client.HttpOpts): Promise<Scene.Types.UpdateInformBlockResponse>
  /** 
   * 查询消息发送单元
  */
  getInformBlock(body: Scene.Types.GetInformBlockRequest, options: Client.HttpOpts): Promise<Scene.Types.GetInformBlockResponse>
  /** 
   * 创建单元内容回复
  */
  createBlockResponse(body: Scene.Types.CreateBlockResponseRequest, options: Client.HttpOpts): Promise<Scene.Types.CreateBlockResponseResponse>
  /** 
   * 更新单元内容回复
  */
  updateBlockResponse(body: Scene.Types.UpdateBlockResponseRequest, options: Client.HttpOpts): Promise<Scene.Types.UpdateBlockResponseResponse>
  /** 
   * 更新单元内容回复
  */
  deleteBlockResponse(body: Scene.Types.DeleteRequest, options: Client.HttpOpts): Promise<{}>
  /** 
   * 查询任务待审核消息列表
  */
  listIntentTriggerLearnings(body: Scene.Types.ListIntentTriggerLearningsRequest, options: Client.HttpOpts): Promise<Scene.Types.ListIntentTriggerLearningsResponse>
  /** 
   * 删除任务待审核消息
  */
  deleteIntentTriggerLearning(body: Scene.Types.DeleteRequest, options: Client.HttpOpts): Promise<{}>
  /** 
   * 创建询问填槽单元
  */
  createRequestBlock(body: Scene.Types.CreateRequestBlockRequest, options: Client.HttpOpts): Promise<Scene.Types.CreateRequestBlockResponse>
  /** 
   * 更新询问填槽单元
  */
  updateRequestBlock(body: Scene.Types.UpdateRequestBlockRequest, options: Client.HttpOpts): Promise<Scene.Types.UpdateRequestBlockResponse>
  /** 
   * 查询单元列表
  */
  listBlocks(body: Scene.Types.ListBlocksRequest, options: Client.HttpOpts): Promise<Scene.Types.ListBlocksResponse>
  /** 
   * 创建单元关系
  */
  createBlockRelation(body: Scene.Types.CreateBlockRelationRequest, options: Client.HttpOpts): Promise<Scene.Types.CreateBlockRelationResponse>
  /** 
   * 查询询问填槽单元
  */
  getRequestBlock(body: Scene.Types.GetRequestBlockRequest, options: Client.HttpOpts): Promise<Scene.Types.GetRequestBlockResponse>
  /** 
   * 删除单元
  */
  deleteOneBlock(body: Scene.Types.DeleteRequest, options: Client.HttpOpts): Promise<{}>
  /** 
   * 删除单元关系
  */
  deleteBlockRelation(body: Scene.Types.DeleteRequest, options: Client.HttpOpts): Promise<{}>
  /** 
   * 创建意图终点单元
  */
  createEndBlock(body: Scene.Types.CreateEndBlockRequest, options: Client.HttpOpts): Promise<Scene.Types.CreateEndBlockResponse>
  /** 
   * 更新意图终点单元
  */
  updateEndBlock(body: Scene.Types.UpdateEndBlockRequest, options: Client.HttpOpts): Promise<Scene.Types.UpdateEndBlockResponse>
  /** 
   * 查询意图终点单元
  */
  getEndBlock(body: Scene.Types.GetEndBlockRequest, options: Client.HttpOpts): Promise<Scene.Types.GetEndBlockResponse>
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
    is_none_intention?: boolean
  }
  interface Chitchat {
    corpus: "CHITCHAT_CORPUS_DEFAULT" | "CHITCHAT_CORPUS_OPEN_DOMAIN" | "CHITCHAT_CORPUS_CUSTOM"
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
  interface SendMessageSimilarResponse {
    source: BotSource
    detail: { qa: QA } | { chitchat: Chitchat } | { task: Task } | { keyword: Keyword }
  }

  // 给用户发消息 请求数据
  export interface SendMessageRequest {
    similar_response?: SendMessageSimilarResponse[]
    msg_body: MsgBody
    quick_reply?: string[]
    user_id: string
    extra?: string
  }
  // 给用户发消息 响应数据
  export interface SendMessageResponse {
    msg_id: string
  }

  // 获取用户输入联想 请求数据
  export interface GetUserInputSugRequest {
    query: string
    user_id: string
  }
  // 获取用户输入联想 响应数据
  export interface GetUserInputSugResponse {
    user_suggestions: Array<{ suggestion: string }>
  }
  export import Types = Dialogue;
}

// 知识点类API-类型声明
declare namespace Knowledge {
  interface AttributeGroupFilter {
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
  interface KnowledgeFilter {
    knowledge_id?: string
    knowledge_tag_id?: string
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
  // 查询知识点列表 请求数据
  export interface ListKnowledgeItemsRequest {
    page: number;
    page_size: number;
    filter?: KnowledgeFilter
  }
  // 查询知识点列表 响应数据
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
  // 创建属性组回复 响应数据
  export interface CreateUserAttributeGroupAnswerResponse extends CreateUserAttributeGroupAnswerRequest { }
  // 更新属性组回复 响应数据
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
    filter: AttributeGroupFilter;
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
  interface KnowledgeTag {
    parent_knowledge_tag_id: string
    id: string
    name: string
  }
  // 创建知识点分类 请求数据
  export interface CreateKnowledgeTagRequest {
    knowledge_tag: KnowledgeTag
  }
  // 创建知识点分类 响应数据
  export interface CreateKnowledgeTagResponse {
    knowledge_tag: KnowledgeTag
  }

  // 删除知识点分类 请求数据
  export interface DeleteKnowledgeTagRequest {
    id: number
  }
  // 更新知识点分类 请求数据
  export interface UpdateKnowledgeTagRequest {
    knowledge_tag: {
      id: string
      name: string
    }
  }
  // 更新知识点分类 响应数据
  export interface UpdateKnowledgeTagResponse extends CreateKnowledgeTagResponse { }

  interface BatchKnowledgeItem extends KnowledgeItem {
    user_attribute_group_answers: UserAttributeGroupAnswer
  }
  // 批量添加知识点列表 请求数据
  export interface BatchCreateKnowledgeItemsRequest {
    knowledge_items: BatchKnowledgeItem[]
  }
  // 批量添加知识点列表 响应数据
  export interface BatchCreateKnowledgeItemsResponse {
    knowledge_related_items: BatchKnowledgeItem[]
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
  export interface ListEntitiesRequest extends PageList { }
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
  export interface CreateTermResponse extends CreateTermRequest { }

  // 更新专有词汇 请求数据
  export interface UpdateTermRequest {
    term_item: TermItem
  }
  // 更新专有词汇 响应数据
  export interface UpdateTermResponse extends UpdateTermRequest { }

  // 查询专有词汇列表 请求数据
  export interface ListTermRequest extends PageList { }
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

// 任务类-类型生命
declare namespace Scene {
  type intent_switch_mode = "INTENT_SWITCH_MODE_NOTSET" | "INTENT_SWITCH_MODE_SWITCH" | "INTENT_SWITCH_MODE_STAY"
  export interface DeleteRequest {
    id: number
  }
  export interface CreateSceneData {
    intent_switch_mode: intent_switch_mode,
    name: string,
    smart_slot_filling_threshold?: number,
    description?: string
  }
  export interface CreateSceneBody {
    scene: CreateSceneBody
  }
  export interface SceneData {
    description: string,
    intent_switch_mode: intent_switch_mode,
    id: number,
    smart_slot_filling_threshold: number,
    name: string
  }
  export interface SceneBody {
    scene: SceneData
  }
  export interface DeleteSceneBody {
    id: number
  }
  export interface CreateIntentRequest {
    intent: CreateIntentData;
  }
  export interface IntentResponse {
    intent: Intent
  }

  export interface UpdateIntentRequest {
    intent: {
      lifespan_mins: number;
      id: number;
      name: string;
    }
  }
  export interface CreateIntentData {
    scene_id: number;
    name: string;
    lifespan_mins: number;
  }
  export interface Intent {
    scene_id: number;
    status: boolean;
    lifespan_mins: number;
    id: number;
    name: string;
  }
  export interface UpdateIntentStatusRequest {
    status: boolean;
    first_block_id: number;
    intent_id: number;
  }
  export interface UpdateIntentStatusResponse extends UpdateIntentStatusRequest {
    update_time: string
  }
  export interface CreateIntentTriggerRequest {
    intent_trigger: PostIntentTrigger
  }
  export interface CreateIntentTriggerResponse {
    intent_trigger: IntentTriggerData
  }
  type IntentTriggerType = "TRIGGER_TYPE_ERROR" | "TRIGGER_TYPE_EXACT_MATCH_KEYWORD" | "TRIGGER_TYPE_INCLUDE_KEYWORD" | "TRIGGER_TYPE_SENTENCE"
  export interface PostIntentTrigger {
    text: string;
    intent_id: number;
    type: IntentTriggerType;
  }
  export interface IntentTriggerData extends PostIntentTrigger {
    id: number
  }
  export interface UpdateIntentTriggerRequest {
    intent_trigger: {
      text: string;
      id: number
    }
  }
  export interface UpdateIntentTriggerResponse extends CreateIntentTriggerResponse { }
  export interface ListIntentTriggersRequest {
    intent_id: number;
    page: number;
    page_size: number;
  }
  export interface ListIntentTriggersResponse {
    intent_triggers: IntentTriggerData[]
  }
  export interface CreateSlotRequest {
    slot: {
      scene_id: number
      name: string
      query_slot_filling?: boolean
    }
  }
  export interface CreateSlotResponse {
    slot: {
      scene_id: number
      name: string
      query_slot_filling: boolean
      id: number
    }
  }
  export interface UpdateSlotRequest {
    slot: {
      query_slot_filling?: boolean;
      id: number;
      name?: string;
    }
  }
  export interface UpdateSlotResponse extends CreateSlotResponse { }
  export interface GetSlotRequest {
    id: number
  }
  export interface GetSlotResponse extends CreateSlotResponse { }
  export interface ListSlotsRequest {
    scene_id: number;
    page: number;
    page_size: number;
  }
  export interface ListSlotsResponse {
    slots: {
      id: number;
      name: string;
    }[]
  }
  type BlockMode = "RESPONSE_ERROR" | "RESPONSE_RANDOM" | "RESPONSE_ALL" | "RESPONSE_LOOP"
  export interface CreateInformBlockRequest {
    block: {
      intent_id: number;
      name: string;
      mode: BlockMode;
    }
  }
  export interface CreateInformBlockResponse {
    block: Block
  }
  export interface Block {
    responses: MsgBody[];
    connection: Connection;
    mode: string;
    intent_id: number;
    id: number;
    name: string;
  }

  export interface Connection {
    from_block_id: number;
    to_block_id: number;
    condition: Condition;
  }

  export interface Condition {
    in_entity: InEntity;
  }

  export interface InEntity {
    id: number;
  }
  export interface UpdateInformBlockRequest {
    block: {
      mode: BlockMode;
      id: number;
      name: string;
    }
  }
  export interface UpdateInformBlockResponse extends CreateInformBlockResponse { }
  export interface GetInformBlockRequest {
    id: number
  }
  export interface GetInformBlockResponse extends CreateInformBlockResponse { }

  export interface CreateBlockResponseRequest {
    response: {
      block_id: number
      response: MsgBody
    }
  }
  export interface CreateBlockResponseResponse {
    response: {
      id: number
      block_id: number
      response: MsgBody
    }
  }
  export interface UpdateBlockResponseRequest {
    response: {
      id: number
      response: MsgBody
    }
  }
  export interface UpdateBlockResponseResponse extends CreateBlockResponseResponse { }
  export interface ListIntentTriggerLearningsRequest {
    page: number;
    page_size: number
  }
  export interface ListIntentTriggerLearningsResponse {
    query_items: IntentTriggerLearningQueryItem[]
  }
  export interface IntentTriggerLearningQueryItem {
    content: string;
    id: number;
    recommend_intent: RecommendIntent;
  }

  export interface RecommendIntent {
    intent_id: number;
    score: number;
    intent_name: string;
  }
  export interface CreateRequestBlockRequestBlock {
    name: string;
    default_slot_value?: string;
    slot_filling_when_asked?: boolean;
    slot_id: number;
    mode: BlockMode;
    request_count?: number;
    intent_id: number;
  }
  export interface CreateRequestBlockRequest {
    block: CreateRequestBlockRequestBlock
  }
  export interface UpdateRequestBlockRequestBlock extends CreateRequestBlockRequestBlock {
    id: number
  }
  export interface CreateRequestBlockResponse {
    block: {
      name: string;
      default_slot_value: string;
      slot_filling_when_asked: boolean;
      connections: Connection[];
      slot_id: number;
      mode: BlockMode;
      request_count: number;
      intent_id: number;
      id: number;
      responses: MsgBody[];
    }
  }
  export interface UpdateRequestBlockRequest {
    block: UpdateRequestBlockRequestBlock
  }
  export interface UpdateRequestBlockResponse extends CreateRequestBlockResponse {
  }
  export interface ListBlocksRequest {
    intent_id: number;
    page: number;
    page_size: number;
  }
  export interface ListBlocksResponse {
    blocks: ListBlockItem[]
  }
  export type BlockType = "SCENE_BLOCK_TYPE_DEFAULT" | "SCENE_BLOCK_TYPE_INFORM" | "SCENE_BLOCK_TYPE_REQUEST" | "SCENE_BLOCK_TYPE_END"
  export interface ListBlockItem {
    type: BlockType;
    id: number;
    name: string;
  }
  export interface CreateBlockRelationRequest {
    relation: BlockRelation
  }
  export interface CreateBlockRelationResponse {
    relation: BlockRelationData
  }
  export interface BlockRelation {
    connection: BlockConnection;
    intent_id: number;
  }
  export interface BlockRelationData extends BlockRelation {
    id: number
  }

  export interface BlockConnection {
    from_block_id: number;
    to_block_id: number;
    condition: ConditionInEntity
    | ConditionNotInEntity
    | ConditionEqualTo
    | ConditionNotEqualTo
    | ConditionDefault
    | ConditionLessThanOrEqualTo
    | ConditionLessThan
    | ConditionGreaterThanOrEqualTo
    | ConditionGreaterThan
    | ConditionDismatchRegex
    | ConditionMatchRegex
    | ConditionExclude
    | ConditionInclude
  }

  export interface ConditionInEntity {
    in_entity: {
      id: number;
    }
  }
  export interface ConditionNotInEntity {
    not_in_entity: {
      id: number;
    }
  }
  export interface ConditionEqualTo {
    equal_to: {
      value: string
    }
  }
  export interface ConditionNotEqualTo {
    not_equal_to: {
      value: string
    }
  }
  export interface ConditionDefault {
    default: object
  }
  export interface ConditionLessThanOrEqualTo {
    less_than_or_equal_to: {
      value: string
    }
  }
  export interface ConditionLessThan {
    less_than: {
      value: string
    }
  }
  export interface ConditionGreaterThanOrEqualTo {
    greater_than_or_equal_to: {
      value: string
    }
  }
  export interface ConditionGreaterThan {
    greater_than: {
      value: string
    }
  }
  export interface ConditionDismatchRegex {
    dismatch_regex: {
      regex: string
    }
  }
  export interface ConditionMatchRegex {
    match_regex: {
      regex: string
    }
  }
  export interface ConditionExclude {
    exclude: {
      value: string
    }
  }
  export interface ConditionInclude {
    include: {
      value: string
    }
  }
  export interface GetRequestBlockRequest {
    id: number
  }
  export interface GetRequestBlockResponse extends CreateRequestBlockResponse { }

  export type BlockAction = { specified: object } | { last: object } | { end: object }
  export interface EndBlock {
    action: BlockAction;
    intent_id: number;
    name: string;
    slot_memorizing: boolean;
  }
  export interface CreateEndBlockRequest {
    block: EndBlock
  }
  export interface EndBlockAll extends EndBlock {
    id: number
  }
  export interface CreateEndBlockResponse {
    block: EndBlockAll
  }

  export interface UpdateEndBlockRequest {
    block: {
      action:          BlockAction;
      slot_memorizing: boolean;
      id:              number;
      name:            string;
    }
  }
  export interface UpdateEndBlockResponse extends CreateEndBlockResponse { }

  export interface GetEndBlockRequest { id: number }
  export interface GetEndBlockResponse extends CreateEndBlockResponse {  }
  export import Types = Scene
}
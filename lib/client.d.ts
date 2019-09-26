import { Agent } from "http";
import { HttpOpts } from "./types/common"
import { Configuration } from "log4js";
import { Knowledge, UpdateKnowledge } from './types/Knowledge';
import { User } from "./types/User";
import { Dialogue } from "./types/Dialogue";

type LogConfig = {
    format: string,
    stdout: boolean,
    fileout: boolean,
    filename: string
}
type Method = "POST" | "GET" | "DELETE" | "PUT";

interface ClientConfig {
    endpoint: string;
    apiVersion: "v2";
    pubkey: string;
    secret: string;
    options: HttpOpts;
    debug: boolean;
}
export = Client;
declare class Client {
    constructor(config: ClientConfig);
	/**
	 * 日志配置
	 *
	 * @static
	 * @memberof Client
	 */
    logConfig: (config: LogConfig) => void;
	/**
     * 创建用户
     *
     * @type {User.CreateUser}
     * @memberof Client
     */
    createUser: User.CreateUser;
	/**
     * 给用户添加属性值
     *
     * @type {User.CreateUserAttribute}
     * @memberof Client
     */
    createUserAttribute: User.CreateUserAttribute;
	/**
     * 获取用户属性列表
     *
     * @type {User.ListUserAttribute}
     * @memberof Client
     */
    listUserAttribute: User.ListUserAttribute;
	/**
     * 查询历史消息
     *
     * @type {Dialogue.GetMsgHistory}
     * @memberof Client
     */
    getMsgHistory: Dialogue.GetMsgHistory;
	/**
     * 获取机器人回复
     *
     * @type {Dialogue.GetBotResponse}
     * @memberof Client
     */
    getBotResponse: Dialogue.GetBotResponse;
	/**
     * 获取关键机器人回复
     *
     * @type {Dialogue.GetKeywordResponse}
     * @memberof Client
     */
    getKeywordResponse: Dialogue.GetKeywordResponse;
	/**
     * 获取任务机器人回复
     *
     * @type {Dialogue.GetTaskResponse}
     * @memberof Client
     */
    getTaskResponse: Dialogue.GetTaskResponse;
	/**
     * 获取问答机器人回复
     *
     * @type {Dialogue.GetQaResponse}
     * @memberof Client
     */
    getQaResponse: Dialogue.GetQaResponse;
	/**
     * 接收用户发的消息
     *
     * @type {Dialogue.ReceiveMessage}
     * @memberof Client
     */
    receiveMessage: Dialogue.ReceiveMessage;
	/**
     * 同步发给用户的消息
     *
     * @type {Dialogue.SyncMessage}
     * @memberof Client
     */
    syncMessage: Dialogue.SyncMessage;
    /**
     * 获取相似问列表
     *
     * @type {Knowledge.ListSimilarQuestions}
     * @memberof Client
     */
    listSimilarQuestions: Knowledge.ListSimilarQuestions;
    /**
     * 删除相似问
     *
     * @type {Knowledge.DeleteSimilarQuestion}
     * @memberof Client
     */
    deleteSimilarQuestion: Knowledge.DeleteSimilarQuestion;
    /**
     * 更新属性组
     *
     * @type {Knowledge.UpdateUserAttributeGroup}
     * @memberof Client
     */
    updateUserAttributeGroup: Knowledge.UpdateUserAttributeGroup;
    /**
     * 创建相似问
     *
     * @type {Knowledge.CreateSimilarQuestion}
     * @memberof Client
     */
    createSimilarQuestion: Knowledge.CreateSimilarQuestion;
    /**
     * 查询知识点列表
     *
     * @type {Knowledge.ListKnowledgeItems}
     * @memberof Client
     */
    listKnowledgeItems: Knowledge.ListKnowledgeItems;
    /**
     * 创建知识点
     *
     * @type {Knowledge.CreateKnowledgeTagKnowledge}
     * @memberof Client
     */
    createKnowledgeTagKnowledge: Knowledge.CreateKnowledgeTagKnowledge;
    /**
     * 查询知识点分类列表
     *
     * @type {Knowledge.ListKnowledgeTags}
     * @memberof Client
     */
    listKnowledgeTags: Knowledge.ListKnowledgeTags;
    /**
     * 更新知识点
     *
     * @type {Knowledge.UpdateKnowledge}
     * @memberof Client
     */
    updateKnowledge: Knowledge.UpdateKnowledge;
    /**
     * CommonRequest
     *
     * @memberof Client
     */
    request: (method: Method, url: string, query: object, body: object, options: HttpOpts) => Promise<any>;
}
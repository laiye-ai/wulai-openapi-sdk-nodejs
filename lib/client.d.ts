import { Agent } from "http";
import { HttpOpts } from "./types/common"
import { Configuration } from "log4js";
import { Knowledge, UpdateKnowledge, UpdateUserAttributeGroupAnswer } from './types/Knowledge';
import { User } from "./types/User";
import { Dialogue } from "./types/Dialogue";
import { Statistics, ListQARecallDailyKnowledgeStats } from './types/Statistics';

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
     * 更新相似问
     *
     * @type {Knowledge.UpdateSimilarQuestion}
     * @memberof Client
     */
    updateSimilarQuestion: Knowledge.UpdateSimilarQuestion;
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
     * 删除属性组回复
     *
     * @type {Knowledge.DeleteUserAttributeGroupAnswer}
     * @memberof Client
     */
    deleteUserAttributeGroupAnswer: Knowledge.DeleteUserAttributeGroupAnswer;
    /**
     * 创建属性组回复
     *
     * @type {Knowledge.CreateUserAttributeGroupAnswer}
     * @memberof Client
     */
    createUserAttributeGroupAnswer: Knowledge.CreateUserAttributeGroupAnswer;
    /**
     * 更新属性组回复
     *
     * @type {Knowledge.UpdateUserAttributeGroupAnswer}
     * @memberof Client
     */
    updateUserAttributeGroupAnswer: Knowledge.UpdateUserAttributeGroupAnswer;
    /**
     * 查询属性组及属性列表
     *
     * @type {Knowledge.ListUserAttributeGroupItems}
     * @memberof Client
     */
    listUserAttributeGroupItems: Knowledge.ListUserAttributeGroupItems;
    /**
     * 查询属性组回复列表
     *
     * @type {Knowledge.ListUserAttributeGroupAnswers}
     * @memberof Client
     */
    listUserAttributeGroupAnswers: Knowledge.ListUserAttributeGroupAnswers;
    /**
     * 创建属性组
     *
     * @type {Knowledge.CreateUserAttributeGroup}
     * @memberof Client
     */
    createUserAttributeGroup: Knowledge.CreateUserAttributeGroup;
    /**
     * 查询问答召回数统计列表（日报）
     *
     * @type {Statistics.ListQARecallDailyStats}
     * @memberof Client
     */
    listQARecallDailyStats: Statistics.ListQARecallDailyStats;
    /**
     * 添加用户满意度评价
     *
     * @type {Statistics.CreateQASatisfaction}
     * @memberof Client
     */
    createQASatisfaction: Statistics.CreateQASatisfaction;
    /**
     * 查询问答召回数统计列表（知识点粒度，日报）
     *
     * @type {Statistics.ListQARecallDailyKnowledgeStats}
     * @memberof Client
     */
    listQARecallDailyKnowledgeStats: Statistics.ListQARecallDailyKnowledgeStats;
    /**
     * 查询问答满意度评价统计列表（知识点粒度，日报）
     *
     * @type {Statistics.ListQASatisfactionDailyKnowledgeStats}
     * @memberof Client
     */
    listQASatisfactionDailyKnowledgeStats: Statistics.ListQASatisfactionDailyKnowledgeStats;
    /**
     * CommonRequest
     *
     * @memberof Client
     */
    request: (method: Method, url: string, query: object, body: object, options: HttpOpts) => Promise<any>;
}
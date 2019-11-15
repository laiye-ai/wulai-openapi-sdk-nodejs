
import { HttpOpts, MsgBody } from './common';

// 问答召回数统计
export interface ListQARecallDailyStatsBody {
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

// 添加用户满意度评价
export interface CreateQASatisfactionBody {
    satisfaction: "DEFAULT_SATISFACTION" | "DEFAULT_SATISFACTION" | "THUMB_UP" | "BAD_ANSWER" | "WRONG_ANSWER" | "REPORT";
    msg_id: string;
    user_id: string;
    bot_id: BotID;
}

export interface BotID {
    knowledge_id: string;
}

// 查询问答召回数统计列表（知识点粒度，日报）
export interface ListQARecallDailyKnowledgeStatsBody {
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

// 查询问答满意度评价统计列表（知识点粒度，日报）
export interface ListQASatisfactionDailyKnowledgeStatsBody {
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

export declare namespace Statistics {
    /**
	 * 查询问答召回数统计列表（日报）
	 * @param {ListQARecallDailyStatsBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type ListQARecallDailyStats = (body: ListQARecallDailyStatsBody, options: HttpOpts) => Promise<ListQARecallDailyStatsResponse>
    /**
	 * 添加用户满意度评价
	 * @param {CreateQASatisfactionBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type CreateQASatisfaction = (body: CreateQASatisfactionBody, options: HttpOpts) => Promise<{}>
    /** 
     * 查询问答召回数统计列表（知识点粒度，日报）
     * @param {ListQARecallDailyKnowledgeStatsBody} body post body
	 * @param {HttpOpts} options http options
    */
    export type ListQARecallDailyKnowledgeStats = (body: ListQARecallDailyKnowledgeStatsBody, options: HttpOpts) => Promise<ListQARecallDailyKnowledgeStatsResponse>
    /** 
     * 查询问答满意度评价统计列表（知识点粒度，日报）
     * @param {ListQASatisfactionDailyKnowledgeStatsBody} body post body
	 * @param {HttpOpts} options http options
    */
    export type ListQASatisfactionDailyKnowledgeStats = (body: ListQASatisfactionDailyKnowledgeStatsBody, options: HttpOpts) => Promise<ListQASatisfactionDailyKnowledgeStatsResponse>
}
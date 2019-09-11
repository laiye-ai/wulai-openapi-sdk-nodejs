import { MsgBody, BotSource} from "./common";
export interface TaskBotResponseResult {
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

interface Response {
	msg_body: MsgBody;
	similar_response: SimilarResponse[];
	enable_evaluate: boolean;
	delay_ts: number;
}

interface SimilarResponse {
	url: string;
	source: BotSource;
	detail: Detail;
}

interface Detail {
	qa: QA;
}

interface QA {
	knowledge_id: number;
	standard_question: string;
	question: string;
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

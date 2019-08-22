declare interface TaskBotResponseResult {
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
  source: string;
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
  block_type: string;
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

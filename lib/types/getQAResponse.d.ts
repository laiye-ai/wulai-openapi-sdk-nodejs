import { MsgBody } from "./common";
export interface QABotResponseResult {
  is_dispatch: boolean;
  msg_id: string;
  qa_suggested_response: QASuggestedResponse[];
}

interface QASuggestedResponse {
  qa: QA;
  is_send: boolean;
  score: number;
  response: Response[];
  quick_reply: string[];
}

interface QA {
  knowledge_id: number;
  standard_question: string;
  question: string;
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

import { MsgBody } from "./common";
export interface KeywordBotResponseResult {
  is_dispatch: boolean;
  msg_id: string;
  keyword_suggested_response: KeywordSuggestedResponse[];
}

interface KeywordSuggestedResponse {
  is_send: boolean;
  score: number;
  response: Response[];
  keyword: Keyword;
  quick_reply: string[];
}

interface Keyword {
  keyword_id: number;
  keyword: string;
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
